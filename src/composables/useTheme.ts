import { ref } from 'vue'

type Theme = 'light' | 'dark'

const theme = ref<Theme>('dark')

// Initialize theme on module load
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme') as Theme | null
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (savedTheme) {
    theme.value = savedTheme
  } else {
    theme.value = systemPrefersDark ? 'dark' : 'light'
  }
  
  document.documentElement.setAttribute('data-theme', theme.value)
}

export function useTheme() {
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme)
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', newTheme)
    }
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return {
    theme,
    setTheme,
    toggleTheme
  }
}

