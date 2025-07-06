<template>
  <div class="favorites-page">
    <h1>Избранное</h1>
    
    <div v-if="loading" class="loading">
      Загрузка...
    </div>
    
    <!-- Если произошла ошибка -->
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <!-- Если товаров нет -->
    <div v-else-if="favoriteProducts.length === 0" class="empty-state">
      <p>В избранном пока ничего нет</p>
      <router-link to="/shop" class="shop-link">Перейти в магазин</router-link>
    </div>
    
    <!-- Если товары есть -->
    <div v-else class="products-grid">
      <ProductCard
        v-for="product in favoriteProducts"
        :key="product.id"
        :product="product"
        @favorite-changed="handleFavoriteChanged"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import axios from 'axios'

const router = useRouter()
const loading = ref(true)
const error = ref('')
const favoriteProducts = ref([])

// Получаем избранные товары
const fetchFavorites = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth')
      return
    }

    // Получаем список избранных товаров
    const response = await axios.get('/api/favorites', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    // Проверяем, есть ли избранные товары
    favoriteProducts.value = response.data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Обработчик изменения избранного
const handleFavoriteChanged = (productId) => {
  // Удаляем товар из списка при удалении из избранного
  favoriteProducts.value = favoriteProducts.value.filter(p => p.id !== productId)
}

onMounted(fetchFavorites)
</script>

<style scoped>
.favorites-page {
  padding: 2rem;
  min-height: 100vh;
  background: #f5f5f5;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.loading {
  text-align: center;
  color: #666;
  padding: 2rem;
}

.error {
  color: #e74c3c;
  text-align: center;
  padding: 1rem;
  background: #fde8e8;
  border-radius: 4px;
  margin: 1rem 0;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.empty-state p {
  color: #666;
  margin-bottom: 1rem;
}

.shop-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #000;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.shop-link:hover {
  background: #333;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
}
</style> 