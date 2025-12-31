export interface Contact {
  email: string
  phone?: string
  location?: string
  linkedin?: string
  github?: string
  website?: string
}

export interface Skill {
  name: string
  level?: number // 1-5
  category?: string
}

export interface Experience {
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  current?: boolean
  description: string[]
  technologies?: string[]
  logo?: string
}

export interface Education {
  degree: string
  institution: string
  location?: string
  graduationDate?: string
  gpa?: string
  honors?: string[]
}

export interface Project {
  name: string
  description: string
  technologies: string[]
  link?: string
  github?: string
}

export interface ResumeData {
  name: string
  title: string
  summary: string
  headshot?: string
  contact: Contact
  skills: Skill[]
  experience: Experience[]
  education: Education[]
  projects?: Project[]
  certifications?: string[]
}


