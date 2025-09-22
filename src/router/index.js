import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BinomialView from '../views/BinomialView.vue'
import BernoulliView from '../views/BernoulliView.vue'
import NormalStandardView from '../views/NormalStandardView.vue'
import MultinomialView from '@/views/MultinomialView.vue'
import ExponencialView from '@/views/ExponencialView.vue'
import GibbsView from '../views/GibbsView.vue'

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
      component: MultinomialView,
    },
    {
      path: '/normal-standard',
      name: 'normal-standard',
      component: NormalStandardView,
    },
    {
      path: '/exponencial',
      name: 'Exponencial',
      component: ExponencialView,
    },
    { path: '/gibbs', name: 'gibbs', component: GibbsView },

  ],
})

export default router
