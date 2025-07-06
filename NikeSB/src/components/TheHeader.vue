<template>
  <header class="header">
    <div class="header-content">
      <router-link to="/" class="logo">
        <img :src="dunkIcon" alt="Nike Dunk" class="logo-icon" />
        NikeSB
      </router-link>
      
      <nav class="nav">
        <router-link
          to="/"
          class="nav-link home-link"
          :class="{ 'router-link-exact-active': $route.path === '/' }"
        >Главная</router-link>
        <router-link to="/shop">Магазин</router-link>
        <router-link to="/top">Топ</router-link>
        <router-link to="/about">О нас</router-link>
      </nav>
      
      <div class="actions">
        <router-link to="/profile">
          <i class="fas fa-user"></i>
          Профиль
        </router-link>
        <router-link to="/favorites">
          <i class="fas fa-heart"></i>
          Избранное
        </router-link>
        <router-link to="/cart">
          <i class="fas fa-shopping-cart"></i>
          Корзина
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import dunkIcon from '../assets/dunk.svg'
const $route = useRoute()
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
  text-decoration: none;
}

.logo-icon {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  vertical-align: middle;
}

.logo:hover {
  background: transparent;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav a {
  color: #666;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 700;
  transition: color 0.3s ease;
  position: relative;
  background: transparent;
}

.nav a:hover {
  color: #111;
  background: transparent;
}

.nav a.router-link-exact-active {
  color: #000;
  font-weight: 600;
}

.nav a.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #000;
}

.nav a.router-link-active:not(.router-link-exact-active):not(.home-link) {
  color: #000;
  font-weight: 600;
}

.nav a.router-link-active:not(.router-link-exact-active):not(.home-link)::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #000;
}

.actions {
  display: flex;
  gap: 1.5rem;
}

.actions a,
.actions a:hover,
.actions a.router-link-active {
  font-size: 0.95rem;
  font-weight: 700;
  background: transparent;
}

.actions a {
  color: #666;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
}

.actions a:hover {
  color: #000;
}

.actions a.router-link-active {
  color: #000;
  font-weight: 600;
}

.container-1 {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  overflow: hidden;
}
</style> 