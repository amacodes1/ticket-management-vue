import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Toast from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { MotionPlugin } from '@vueuse/motion'

const initTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

initTheme()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, { toastDefaults: { position: 'top-right', duration: 3000 } })
app.use(MotionPlugin)

app.mount('#app')
