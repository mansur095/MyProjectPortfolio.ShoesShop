<template>
  <div class="register-form">
    <h2>Регистрация</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Имя</label>
        <!-- Обновление ошибки при вводе имени -->
        <input
          type="text"
          id="name"
          v-model="form.name"
          required
          placeholder="Введите ваше имя"
          :class="{ 'error-input': errors.name }"
        >
        <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <!-- Обновление ошибки при вводе email -->
        <input
          type="email"
          id="email"
          v-model="form.email"
          required
          placeholder="Введите ваш email"
          :class="{ 'error-input': errors.email }"
        >
        <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <!-- Обновление ошибки при вводе пароля -->
        <input
          type="password"
          id="password"
          v-model="form.password"
          required
          placeholder="Введите пароль"
          minlength="6"
          :class="{ 'error-input': errors.password }"
        >
        <!-- Отображение ошибки пароля -->
        <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
      </div>
      <button type="submit" :disabled="authStore.loading">
        {{ authStore.loading ? 'Регистрация...' : 'Зарегистрироваться' }}
      </button>
      <p v-if="authStore.error" class="error">{{ authStore.error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  name: '',
  email: '',
  password: ''
})

const errors = reactive({
  name: '',
  email: '',
  password: ''
})

// Обновление ошибок при вводе данных
const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.password = ''
// Проверка на минимальную длину имени
  if (form.value.name.length < 2) {
    errors.name = 'Имя должно содержать минимум 2 символа'
    isValid = false
  }
// Проверка на корректность email
  if (!form.value.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = 'Введите корректный email'
    isValid = false
  }
// Проверка на минимальную длину пароля
  if (form.value.password.length < 6) {
    errors.password = 'Пароль должен содержать минимум 6 символов'
    isValid = false
  }
// Проверка на наличие ошибок
  return isValid
}
// Обновление ошибок при вводе данных
const handleSubmit = async () => {
  if (!validateForm()) return
// Очистка ошибок
  try {
    await authStore.register(form.value.name, form.value.email, form.value.password)
    router.push('/')
  } catch (error: any) {// Обработка ошибок регистрации
    if (error.response?.data?.message) {
      authStore.error = error.response.data.message
    } else {
      authStore.error = 'Произошла ошибка при регистрации'
    }
  }
}
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #000;
}

input.error-input {
  border-color: #e74c3c;
}

.error-text {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background: #333;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error {
  color: #e74c3c;
  text-align: center;
  margin-top: 1rem;
}
</style> 