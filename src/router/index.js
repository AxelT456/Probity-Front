import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BinomialView from '../views/BinomialView.vue'
import BernoulliView from '../views/BernoulliView.vue'
import NormalView from '../views/NormalView.vue'
import MultinomialView from '../views/MultinomialView.vue'
import GibbsView from '../views/GibbsView.vue'
import ExponencialView from '../views/ExponencialView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/binomial', name: 'binomial', component: BinomialView },
    { path: '/bernoulli', name: 'bernoulli', component: BernoulliView },
    { path: '/normal', name: 'normal', component: NormalView },
    { path: '/multinomial', name: 'multinomial', component: MultinomialView },
    { path: '/gibbs', name: 'gibbs', component: GibbsView },
    { path: '/exponencial', name: 'exponencial', component: ExponencialView },
  ],
})

export default router
