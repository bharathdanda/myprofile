import { ref } from 'vue'
import { chatWithGenkit, generateFallbackResponse, type ChatMessage } from '@/services/genkitService'

export function useChat() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const sendMessage = async (
    messages: ChatMessage[],
    useGenkit: boolean = true
  ): Promise<string> => {
    isLoading.value = true
    error.value = null

    try {
      if (useGenkit) {
        const response = await chatWithGenkit(messages)
        return response
      } else {
        // Fallback to simple response
        const lastUserMessage = messages.filter(m => m.role === 'user').pop()
        if (lastUserMessage) {
          return generateFallbackResponse(lastUserMessage.content)
        }
        return 'I apologize, but I need a question to respond to.'
      }
    } catch (err) {
      console.error('Chat error:', err)
      error.value = err instanceof Error ? err.message : 'An error occurred'
      
      // Fallback to simple response on error
      const lastUserMessage = messages.filter(m => m.role === 'user').pop()
      if (lastUserMessage) {
        return generateFallbackResponse(lastUserMessage.content)
      }
      
      return 'I apologize, but I encountered an error. Please try again.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    sendMessage
  }
}

