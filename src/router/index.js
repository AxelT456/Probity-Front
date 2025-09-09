import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BinomialView from '../views/BinomialView.vue'
import BernoulliView from '../views/BernoulliView.vue'
import NormalStandardView from '../views/NormalStandardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
    {
      path: '/normal-standard',
      name: 'normal-standard',
      component: NormalStandardView,
    },
  ],
})

export default router
