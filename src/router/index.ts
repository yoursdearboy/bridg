import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../AppLayout.vue'
import person from '../person/routes'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        ...person
      ]
    }
  ]
})

export default router
