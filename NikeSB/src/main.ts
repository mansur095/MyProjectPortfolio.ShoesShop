import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Import global styles
import './assets/main.css'

// Настройка axios
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.timeout = 5000 // 5 секунд таймаут

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Добавляем перехватчик для обработки ошибок
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    })

    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - проверьте, запущен ли бэкенд сервер')
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/auth'
    }
    return Promise.reject(error)
  }
)

// Create app instance
const app = createApp(App)
const pinia = createPinia()

// Use plugins
app.use(pinia)
app.use(router)

// Добавляем отладочную информацию
console.log('App initialized')
console.log('Current route:', router.currentRoute.value.path)

// Mount app
app.mount('#app') 
