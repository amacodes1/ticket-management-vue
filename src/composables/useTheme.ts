import { ref, onMounted, watch } from 'vue'

const isDark = ref(false)

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  onMounted(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = saved ? saved === 'dark' : prefersDark
    document.documentElement.classList.toggle('dark', isDark.value)
  })

  watch(isDark, (v) => {
    document.documentElement.classList.toggle('dark', v)
  })

  return { isDark, toggleTheme }
}
