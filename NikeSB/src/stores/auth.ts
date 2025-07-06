import { defineStore } from 'pinia'
import axios from 'axios'

interface User {
  id: string
  email: string
  name: string
  role: string
  createdAt?: string
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

// Проверка токена при загрузке приложения
export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null
  }),

  // Геттеры
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin'
  },

  // Методы
  actions: {
    async login(email: string, password: string) {
      try {
        this.loading = true
        this.error = null

        // Проверяем наличие токена в localStorage
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email,
          password
        })

        // Проверяем наличие токена в ответе
        const { token, user } = response.data
        this.token = token
        this.user = user
        localStorage.setItem('token', token)

        // Устанавливаем токен для всех последующих запросов
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Ошибка при входе'
        throw error
      } finally {
        this.loading = false
      }
    },

    // Регистрация
    async register(name: string, email: string, password: string) {
      try {
        this.loading = true
        this.error = null

        // Проверяем наличие токена в localStorage
        const response = await axios.post('http://localhost:3000/api/auth/register', {
          name,
          email,
          password
        })

        // Проверяем наличие токена в ответе
        const { token, user } = response.data
        this.token = token
        this.user = user
        localStorage.setItem('token', token)

        // Устанавливаем токен для всех последующих запросов
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Ошибка при регистрации'
        throw error
      } finally {
        this.loading = false
      }
    },

    // Получение данных пользователя
    async fetchUser() {
      if (!this.token) return

      // Проверяем наличие токена в localStorage
      try {
        this.loading = true
        this.error = null

        const response = await axios.get('http://localhost:3000/api/auth/me', {
          headers: { Authorization: `Bearer ${this.token}` }
        })

        this.user = response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Ошибка при получении данных пользователя'
        this.logout()
      } finally {
        this.loading = false
      }
    },

    // Выход
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  }
}) 