<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Chat with Resume</h2>
          <button @click="close" class="close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="chat-container">
          <div class="messages" ref="messagesRef">
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="['message', message.role]"
            >
              <div class="message-content">
                <div class="message-text" v-html="formatMessage(message.content)"></div>
                <div class="message-time">{{ formatTime(message.timestamp) }}</div>
              </div>
            </div>
            <div v-if="isLoading" class="message assistant">
              <div class="message-content">
                <div class="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          <form @submit.prevent="sendMessage" class="chat-input-form">
            <input
              v-model="inputMessage"
              type="text"
              placeholder="Ask me anything about my experience, skills, or background..."
              class="chat-input"
              :disabled="isLoading"
            />
            <button type="submit" class="send-btn" :disabled="isLoading || !inputMessage.trim()">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { resumeData } from '@/data/resume'
import { model } from '@/config/firebase'
import type { ResumeData } from '@/types/resume'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

const messages = ref<Message[]>([
  {
    role: 'assistant',
    content: `Hi! I'm ${resumeData.name}'s AI assistant. I can answer questions about ${resumeData.name}'s experience, skills, education, and projects. What would you like to know?`,
    timestamp: new Date()
  }
])

const inputMessage = ref('')
const isLoading = ref(false)
const messagesRef = ref<HTMLElement>()

function close() {
  emit('update:isOpen', false)
}

function formatMessage(text: string): string {
  // Simple markdown-like formatting
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

/**
 * Formats resume data into a context string for the AI
 */
function formatResumeContext(resume: ResumeData): string {
  let context = `Resume for ${resume.name}\n\n`
  context += `Email: ${resume.contact.email}\n\n`
  context += `LinkedIn: ${resume.contact.linkedin}\n\n`
  context += `GitHub: ${resume.contact.github}\n\n`
  context += `Title: ${resume.title}\n\n`
  context += `Summary: ${resume.summary}\n\n`
  
  // Experience
  context += `Experience:\n`
  resume.experience.forEach(exp => {
    context += `- ${exp.title} at ${exp.company}`
    if (exp.startDate) {
      context += ` (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate || ''})`
    }
    context += `\n`
    if (exp.description && exp.description.length > 0) {
      exp.description.forEach(desc => {
        context += `  • ${desc}\n`
      })
    }
    if (exp.technologies && exp.technologies.length > 0) {
      context += `  Technologies: ${exp.technologies.join(', ')}\n`
    }
    context += `\n`
  })
  
  // Skills
  context += `Skills:\n`
  const skillsByCategory = resume.skills.reduce((acc, skill) => {
    const category = skill.category || 'Other'
    if (!acc[category]) acc[category] = []
    acc[category].push(`${skill.name}${skill.level ? ` (${skill.level.toFixed(1)}/5)` : ''}`)
    return acc
  }, {} as Record<string, string[]>)
  
  Object.entries(skillsByCategory).forEach(([category, skills]) => {
    context += `${category}: ${skills.join(', ')}\n`
  })
  context += `\n`
  
  // Education
  if (resume.education && resume.education.length > 0) {
    context += `Education:\n`
    resume.education.forEach(edu => {
      context += `- ${edu.degree} from ${edu.institution}`
      if (edu.location) context += `, ${edu.location}`
      if (edu.graduationDate) context += ` (${edu.graduationDate})`
      context += `\n`
    })
    context += `\n`
  }
  
  // Certifications
  if (resume.certifications && resume.certifications.length > 0) {
    context += `Certifications: ${resume.certifications.join(', ')}\n\n`
  }
  
  return context
}

async function sendMessage() {
  if (!inputMessage.value.trim() || isLoading.value) return

  const userMessage: Message = {
    role: 'user',
    content: inputMessage.value,
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  inputMessage.value = ''
  isLoading.value = true

  await scrollToBottom()

  try {
    // Create system instruction with resume context
    const resumeContext = formatResumeContext(resumeData)
    const systemInstruction = `You are an AI assistant helping people learn about ${resumeData.name}'s professional background. Use the following resume information to answer questions accurately and helpfully. Be concise but informative.

${resumeContext}

Answer questions based on this resume information. You are really trying to help the recruiters and potential employers to understand ${resumeData.name}'s professional background and make them curious. If asked about something not in the resume, politely indicate that information is not available.`

    // Build the prompt with conversation history
    // Only include recent messages to avoid token limits (excluding the current user message we just added)
    const recentMessages = messages.value.slice(0, -1).slice(-10) // Keep last 10 messages for context (excluding current)
    
    // Build conversation context
    let conversationContext = systemInstruction
    if (recentMessages.length > 0) {
      conversationContext += '\n\nConversation history:\n'
      recentMessages.forEach(msg => {
        const roleLabel = msg.role === 'user' ? 'User' : 'Assistant'
        conversationContext += `${roleLabel}: ${msg.content}\n\n`
      })
    }
    
    // Add the current user question
    conversationContext += `User: ${userMessage.content}\n\nAssistant:`

    // Generate response using Firebase AI Logic with streaming
    const result = await model.generateContentStream(conversationContext)

    // Create assistant message for streaming response
    const assistantMessage: Message = {
      role: 'assistant',
      content: '',
      timestamp: new Date()
    }
    messages.value.push(assistantMessage)

    // Stream the response
    let fullResponse = ''
    for await (const chunk of result.stream) {
      const chunkText = chunk.text()
      if (chunkText) {
        fullResponse += chunkText
        assistantMessage.content = fullResponse
        await scrollToBottom()
      }
    }

    // If no response was generated, add a fallback message
    if (!fullResponse.trim()) {
      assistantMessage.content = "I apologize, but I couldn't generate a response. Please try again."
    }
  } catch (error) {
    console.error('Error generating AI response:', error)
    const errorMessage: Message = {
      role: 'assistant',
      content: `I apologize, but I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
      timestamp: new Date()
    }
    messages.value.push(errorMessage)
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}

async function scrollToBottom() {
  await nextTick()
  if (messagesRef.value) {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight
  }
}

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => scrollToBottom())
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: var(--color-background-secondary);
  border-radius: 20px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  transition: border-color 0.3s ease;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--color-text);
  transition: color 0.3s ease;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--color-text-secondary);
  transition: color 0.2s;
}

.close-btn:hover {
  color: var(--color-text);
}

.chat-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  display: flex;
  max-width: 80%;
}

.message.user {
  align-self: flex-end;
}

.message.assistant {
  align-self: flex-start;
}

.message-content {
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.message.user .message-content {
  background: var(--gradient-primary);
  color: white;
}

.message.assistant .message-content {
  background: var(--color-background-card);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.message-text {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
}

.typing-indicator {
  display: flex;
  gap: 0.25rem;
  padding: 0.5rem 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent);
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

.chat-input-form {
  display: flex;
  gap: 0.5rem;
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
  transition: border-color 0.3s ease;
}

.chat-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  font-size: 1rem;
  background: var(--color-background-card);
  color: var(--color-text);
  transition: all 0.2s ease;
}

.chat-input:focus {
  outline: none;
  border-color: var(--color-accent);
}

.chat-input::placeholder {
  color: var(--color-text-secondary);
}

.send-btn {
  padding: 0.75rem 1.5rem;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.05);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

