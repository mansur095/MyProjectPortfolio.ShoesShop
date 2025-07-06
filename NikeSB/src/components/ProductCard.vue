<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image" :alt="product.name">
      <button 
        class="favorite-btn" 
        @click="toggleFavorite"
        :class="{ 'is-favorite': isFavorite }"
      >
        <span class="heart-icon">❤</span>
      </button>
    </div>
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p class="category">{{ product.category }}</p>
      <p class="price">${{ product.price }}</p>
      <button class="add-to-cart" @click="addToCart">В корзину</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useCartStore } from '../stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const isFavorite = ref(false)
const cartStore = useCartStore()

// Проверка статуса избранного
const checkFavoriteStatus = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return

    // Получаем избранные товары
    const response = await axios.get('/api/favorites', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    // Проверяем, есть ли товар в избранном
    const favorites = response.data
    isFavorite.value = favorites.some(fav => fav.id === props.product.id || fav.productId === props.product.id)
  } catch (error) {
    console.error('Ошибка при проверке статуса избранного:', error)
  }
}

// Переключение избранного
const toggleFavorite = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth')
      return
    }

    // Проверяем, есть ли товар в избранном
    if (isFavorite.value) {
      // Удаляем из избранного
      const response = await axios.delete(`/api/favorites/${props.product.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      // Проверяем статус ответа
      if (response.status === 200) {
        isFavorite.value = false
      }
    } else {
      // Добавляем в избранное
      const response = await axios.post('/api/favorites', {
        productId: props.product.id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 201) {
        isFavorite.value = true
      }
    }
  } catch (error) {
    console.error('Ошибка при работе с избранным:', error) // Обработка ошибки
  }
}
// Добавление в корзину
const addToCart = () => {
  cartStore.addItem(props.product)
}

onMounted(checkFavoriteStatus)
</script>

<style scoped>
.product-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  transition: transform 0.2s;
  color: #fff;
}
.product-card:hover {
  transform: translateY(-4px);
}
.product-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: #222;
}
.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #222;
}
.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.12);
}
.favorite-btn.is-favorite .heart-icon {
  color: #e74c3c;
}
.heart-icon {
  font-size: 1.3rem;
  color: #bbb;
  transition: color 0.2s;
}
.product-info {
  padding: 1.2rem 1rem 1rem 1rem;
}
h3 {
  margin: 0 0 0.3rem;
  font-size: 1.1rem;
  color: #000000;
}
.category {
  color: #575757;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}
.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #000000;
  margin: 0.5rem 0 1rem 0;
}
.add-to-cart {
  font-family: Museo,Segoe UI,sans-serif;
  text-transform: uppercase;
  font-size: 0.9rem;
  width: 100%;
  padding: 0.7rem;
  background: #e74d3c1e;
  color: #18191c;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s, color 0.2s;
}
.add-to-cart:hover {
  background: #e74c3c;
  color: #fff;
}
</style> 