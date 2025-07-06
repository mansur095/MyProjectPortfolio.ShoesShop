<template>
  <div class="auth-page">
    <div class="auth-container">
      <h1>Авторизация</h1>
      <div class="tabs">
        <button @click="activeTab = 'login'">Вход</button>
        <button @click="activeTab = 'register'">Регистрация</button>
      </div>
      <div v-if="activeTab === 'login'">
        <LoginForm />
      </div>
      <div v-else>
        <RegisterForm />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginForm from '../components/LoginForm.vue'
import RegisterForm from '../components/RegisterForm.vue'

const activeTab = ref('login')
</script>

<style>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 2rem;
}

.auth-container {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tabs button {
  flex: 1;
  padding: 0.75rem;
  border: none;
  background: #f5f5f5;
  cursor: pointer;
  border-radius: 4px;
}

.tabs button:hover {
  background: #e0e0e0;
}
</style> 