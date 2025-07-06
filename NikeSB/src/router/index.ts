import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import TopView from '../views/TopView.vue'

// Объявляем роутер
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'shop',
          name: 'shop',
          component: () => import('../views/ShopView.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue')
        },
        {
          path: 'favorites',
          name: 'favorites',
          component: () => import('../views/FavoritesView.vue')
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/CartView.vue')
        },
        {
          path: 'top',
          name: 'top',
          component: () => import('../views/TopView.vue')
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      meta: { requiresAuth: false }
    }
  ]
})

// Добавляем отладочную информацию
router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.path) // Путь к маршруту
  console.log('Component:', to.matched[0]?.components?.default) // Компонент маршрута
  next() // Продолжаем навигацию
})

export default router 
