<template>
  <div class="profile">
    <h1>Профиль</h1>
    <div class="profile-content" v-if="authStore.user">
      <ul class="user-info">
        <li><strong>Имя:</strong> {{ authStore.user.name }}</li>
        <li><strong>Email:</strong> {{ authStore.user.email }}</li>
        <li><strong>Дата регистрации:</strong> {{ formatDate(authStore.user.createdAt) }}</li>
      </ul>
    </div>
    <div v-else class="profile-content">
      <p>Нет данных о пользователе. Пожалуйста, войдите в систему.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

// Функция для форматирования даты
function formatDate(dateStr?: string) {
  if (!dateStr) return '-';
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Проверка авторизации
onMounted(() => {
  if (!authStore.user && authStore.token) {
    authStore.fetchUser()
  }
})
</script>

<style scoped>
.profile {
  padding: 2rem;
}

.profile-content {
  max-width: 800px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 2rem;
}

.profile-content {
  color: #333;
  font-size: 1.4rem;
}

.user-info {
  list-style: none;
  padding: 0;
  font-size: 1.1rem;
}

.user-info li {
  margin-bottom: 1rem;
}

.user-info strong {
  color: #333;
}
</style> 