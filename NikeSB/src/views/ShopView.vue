<template>
  <div class="shop">
    <div class="shop-header">
      <img 
        :src="nikeSbHome" 
        alt="Nike SB Logo" 
        class="nike-sb-home"
      />
      <h1>Коллекция Nike SB</h1>
      <h6>Обувь на любой случай жизни</h6>
      <div class="search-bar">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Поиск..."
          @input="filterProducts"
        >
      </div>
    </div>

    <!-- Фильтры -->
    <div class="shop-content">
      <aside class="filters">
        <div class="filter-section">
          <h4>Категории</h4>
          <label v-for="category in categories" :key="category">
            <input 
              type="checkbox" 
              v-model="selectedCategories" 
              :value="category"
              @change="filterProducts"
            >
            {{ category }}
          </label>
        </div>
        <div class="filter-section">
          <h4>Цена</h4>
          <div class="price-range">
            <input 
              type="range" 
              v-model="priceRange" 
              min="0" 
              max="1000" 
              step="10"
              @input="filterProducts"
            >
            <span>${{ priceRange }}</span>
          </div>
        </div>
      </aside>

      <!-- Продукты -->
    <div class="products-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import nikeSbHome from '../assets/nike-home-logo.svg';

// Mock data - replace with actual data from your backend
const products = ref([
  {
    id: 1,
    name: 'Nike SB Dunk Low Pro',
    category: 'Dunk Low',
    price: 99.99,
    image: '/src/assets/Nike-SB-Dunk-Low-Pro.jpg',
    description: 'Classic skateboarding shoe with enhanced cushioning'
  },
  {
    id: 2,
    name: 'Nike SB Dunk High Pro',
    category: 'Dunk High',
    price: 109.99,
    image: '/src/assets/Nike-SB-Dunk-High-Pro.jpg',
    description: 'High-top version of the iconic skate shoe'
  },
  {
    id: 3,
    name: 'Nike SB Dunk Mid Pro',
    category: 'Dunk Mid',
    price: 104.99,
    image: '/src/assets/Nike-SB-Dunk-Mid-Pro.jpg',
    description: 'Mid-top design for ankle support'
  },
  {
    id: 4,
    name: 'Nike SB Blazer Mid Pro',
    category: 'Blazer',
    price: 89.99,
    image: '/src/assets/Nike-SB-Blazer-Mid.jpg',
    description: 'Vintage basketball-inspired skate shoe'
  },
  {
    id: 5,
    name: 'Nike SB Janoski',
    category: 'Janoski',
    price: 79.99,
    image: '/src/assets/Nike-SB-Janoski.jpg',
    description: 'Minimalist design by Paul Rodriguez'
  }
])

// State
const categories = ['Dunk Low', 'Dunk High', 'Dunk Mid', 'Blazer', 'Janoski']
const selectedCategories = ref<string[]>([])
const searchQuery = ref('')
const priceRange = ref(1000)

const favorites = ref<number[]>([])

function toggleFavorite(productId: number) {
  if (favorites.value.includes(productId)) {
    favorites.value = favorites.value.filter(id => id !== productId)
  } else {
    favorites.value.push(productId)
  }
}

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategories.value.length === 0 || selectedCategories.value.includes(product.category)
    const matchesPrice = product.price <= priceRange.value
    return matchesSearch && matchesCategory && matchesPrice
  })
})

const filterProducts = () => {
  // This function is called when filters change
  // The computed property will automatically update
}
</script>

<style scoped>
* {
  font-family: Museo,Segoe UI,sans-serif;
}

.nike-sb-home {
  position: absolute;
  left: 5%;
  top: 25%;
  transform: translateY(-40%);
  height: auto;
  width: 170px;
}

.shop {
  padding: 2rem;
  background: #fff;
  max-width: 1400px;
  margin: 0 auto;
}

.shop-header {
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  padding-left: 70px; /* Отступ для лого */
}

.shop-header h1 {
  font-size: 3rem;
  margin-bottom: 0rem;
  color: #111;
  font-weight: 900;
}

.shop-header h6 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #666;
}

.search-bar {
  max-width: 500px;
  margin: 0 auto;
}

.search-bar input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.search-bar input:focus {
  outline: none;
  border-color: #111;
}

.shop-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
}

.filters {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  height: fit-content;
  position: sticky;
  top: 100px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.filter-section {
  margin-bottom: 2rem;
}

.filter-section h4 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #111;
  font-weight: 600;
}

.filter-section label {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  cursor: pointer;
  color: #333;
  transition: color 0.2s ease;
}

.filter-section label:hover {
  color: #111;
}

.filter-section input[type="checkbox"] {
  margin-right: 0.75rem;
  width: 18px;
  height: 18px;
}

.price-range {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.price-range input {
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  background: #ddd;
  border-radius: 2px;
  outline: none;
}

.price-range input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #111;
  border-radius: 50%;
  cursor: pointer;
}

.price-range span { 
  color: #444;
  padding: 0.2em 0.7em;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1.1em;
  margin-left: 0.5em;
  display: inline-block;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.product-image {
  position: relative;
  padding-top: 100%;
  background: #f8f8f8;
}

.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.favorite-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.favorite-btn i {
  color: #222;
  transition: color 0.2s;
}

.favorite-btn.active i {
  color: #e74c3c;
}

.product-info {
  padding: 1.5rem;
}

.product-info h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #111;
}

.product-category {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.3rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 1rem;
}

.add-to-cart-btn {
  width: 100%;
  padding: 0.75rem;
  background: #111;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-to-cart-btn:hover {
  background: #333;
}

@media (max-width: 768px) {
  .nike-sb-home {
    width: 100px;
  }

  .shop-content {
    grid-template-columns: 1fr;
  }
  
  .filters {
    position: sticky;
    top: 1rem;
  }
}

@media (max-width: 630px) {
  .nike-sb-home {
    width: 60px;
  }
}
</style> 