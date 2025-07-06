<template>
  <div class="cart-container">
    <h1>Корзина</h1>
    
    <!-- Корзина пуста -->
    <div v-if="cartStore.items.length === 0" class="empty-cart">
      Ваша корзина пуста. Добавьте товар из каталога.
    </div>

    <!-- Корзина не пуста -->
    <div v-else class="cart-items">
      <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" class="item-image">
        <div class="item-details">
          <h3>{{ item.name }}</h3>
          <p class="price">${{ item.price }}</p>
        </div>
        <div class="quantity-controls">
          <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
        </div>
        <button @click="removeItem(item.id)" class="remove-btn">Удалить</button>
      </div>
      
      <!-- Общая стоимость -->
      <div class="cart-summary">
        <h3>Итого: ${{ cartStore.totalPrice.toFixed(2) }}</h3>
        <button class="checkout-btn">Оформить заказ</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import type { Store } from 'pinia'

interface CartStore {
  items: Array<{
    id: number
    name: string
    price: number
    image: string
    quantity: number
  }>
  totalPrice: number
  updateQuantity: (productId: number, quantity: number) => void
  removeItem: (productId: number) => void
}

// Подписываемся на изменения в хранилище
const cartStore = useCartStore() as Store<'cart', CartStore>

// Методы для работы с корзиной
const updateQuantity = (productId: number, quantity: number) => {
  cartStore.updateQuantity(productId, quantity)
}

// Метод для удаления товара
const removeItem = (productId: number) => {
  cartStore.removeItem(productId)
}
</script>

<style scoped>
.cart-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.empty-cart {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 2rem;
}

.cart-items {
  margin-top: 2rem;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  gap: 1rem;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.item-details {
  flex: 1;
}

.price {
  font-weight: bold;
  color: #333;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-controls button {
  padding: 0.25rem 0.5rem;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.remove-btn {
  padding: 0.5rem 1rem;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cart-summary {
  margin-top: 2rem;
  padding: 1rem;
  background: #333;
  border-radius: 4px;
  text-align: right;
}

.checkout-btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
}

.checkout-btn:hover {
  background: #3aa876;
}
</style> 