import { createRouter, createWebHistory } from 'vue-router'
import FirstPage from '@/components/FirstPage.vue'
import AuthForm from '@/components/AuthForm.vue'
import Cart from '@/components/Cart.vue'
import Shop from '@/components/Shop.vue' // Імпортуємо компонент Shop
import Features from '@/components/Features.vue' // Імпортуємо компонент Features
import NotFound from '@/components/NotFound.vue' // Імпортуємо компонент сторінки 404
import Favorites from '@/components/Favorites.vue' // Імпортуємо компонент улюблених
import ProductDetail from '@/components/ProductDetail.vue' // Імпортуємо компонент для деталей продукту

const routes = [
  {
    path: '/',
    name: 'Home',
    component: FirstPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: AuthForm,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop, // Додаємо маршрут для Shop
  },
  {
    path: '/features',
    name: 'Features',
    component: Features, // Додаємо маршрут для Features
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites, // Додаємо маршрут для улюблених
  },
  {
    path: '/product/:id',  // Додаємо динамічний маршрут для продукту
    name: 'ProductDetail',
    component: ProductDetail, // Компонент для відображення детальної інформації про продукт
    props: true, // передаємо параметр ID як пропс до компонента
  },
  {
    path: '/:pathMatch(.*)*', // новий синтаксис для перехоплення всіх маршрутів
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
