import { resumeData } from '@/data/resume'
import type { ResumeData } from '@/types/resume'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

/**
 * Formats resume data into a context string for the AI
 */
function formatResumeContext(resume: ResumeData): string {
  let context = `Resume for ${resume.name}\n\n`
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

/**
 * Calls the Genkit chat endpoint
 * This assumes you have a Genkit backend running at the specified URL
 */
export async function chatWithGenkit(
  messages: ChatMessage[],
  apiUrl?: string
): Promise<string> {
  const genkitApiUrl = apiUrl || import.meta.env.VITE_GENKIT_API_URL || 'http://localhost:4000/api/chat'
  
  const resumeContext = formatResumeContext(resumeData)
  
  // Format messages for the API
  const formattedMessages = messages.map(msg => ({
    role: msg.role,
    content: msg.content
  }))
  
  try {
    const response = await fetch(genkitApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: formattedMessages,
        context: resumeContext,
        resumeData: {
          name: resumeData.name,
          title: resumeData.title,
          summary: resumeData.summary
        }
      }),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data.response || data.message || 'I apologize, but I encountered an error processing your request.'
  } catch (error) {
    console.error('Error calling Genkit API:', error)
    throw error
  }
}

/**
 * Fallback function that uses a simple AI-like response
 * This can be used if Genkit backend is not available
 */
export function generateFallbackResponse(question: string): string {
  const lowerQuestion = question.toLowerCase()
  const resume = resumeData
  
  if (lowerQuestion.includes('experience') || lowerQuestion.includes('work') || lowerQuestion.includes('job')) {
    return `**Experience Summary:**\n\n${resume.experience.map(exp => 
      `**${exp.title}** at ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate || ''})\n${exp.description.join('\n')}`
    ).join('\n\n')}`
  }
  
  if (lowerQuestion.includes('skill') || lowerQuestion.includes('technology') || lowerQuestion.includes('tech')) {
    const skillsByCategory = resume.skills.reduce((acc, skill) => {
      const category = skill.category || 'Other'
      if (!acc[category]) acc[category] = []
      acc[category].push(skill.name)
      return acc
    }, {} as Record<string, string[]>)
    
    let response = `**Skills by Category:**\n\n`
    Object.entries(skillsByCategory).forEach(([category, skills]) => {
      response += `**${category}:** ${skills.join(', ')}\n\n`
    })
    return response
  }
  
  if (lowerQuestion.includes('education') || lowerQuestion.includes('degree') || lowerQuestion.includes('university')) {
    return `**Education:**\n\n${resume.education.map(edu => 
      `${edu.degree} from ${edu.institution}${edu.location ? `, ${edu.location}` : ''}${edu.graduationDate ? ` (${edu.graduationDate})` : ''}`
    ).join('\n')}`
  }
  
  if (lowerQuestion.includes('project')) {
    return `**Projects:**\n\n${resume.projects?.map(proj => 
      `**${proj.name}:** ${proj.description}\nTechnologies: ${proj.technologies.join(', ')}`
    ).join('\n\n') || 'No projects listed.'}`
  }
  
  if (lowerQuestion.includes('certification') || lowerQuestion.includes('certificate')) {
    return `**Certifications:**\n\n${resume.certifications?.join('\n') || 'No certifications listed.'}`
  }
  
  return `I'm ${resume.name}'s AI assistant. I can help you learn about ${resume.name}'s experience, skills, education, projects, and certifications. What would you like to know more about?`
}

