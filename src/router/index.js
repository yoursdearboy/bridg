import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import person from '../person/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    ...person
  ]
})

export default router
