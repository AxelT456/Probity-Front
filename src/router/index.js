import { createRouter, createWebHistory } from 'vue-router'

import BinomialView from '../views/BinomialView.vue'
import HomeView from '@/views/HomeView.vue'
import BernoulliView from '@/views/BernoulliView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView, // <-- Ruta para el inicio
    },
    {
      path: '/binomial',
      name: 'binomial',
      component: BinomialView,
    },
    {
      path: '/bernoulli',
      name: 'bernoulli',
      component: BernoulliView,
    },
    {
      path: '/multinomial',
      name: 'multinomial',
      component: () => import('@/views/MultinomialView.vue'),
    },
  ],
})

export default router
