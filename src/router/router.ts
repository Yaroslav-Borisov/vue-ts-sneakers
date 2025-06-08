import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../pages/MainPage.vue'
import FavoritesPage from '../pages/FavoritesPage.vue'

const routes = [
    { path: '/', component: MainPage },
    { path: '/favorites', component: FavoritesPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router