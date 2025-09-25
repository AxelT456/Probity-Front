<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const navItems = ref([
  { name: 'Inicio', path: '/' },
  { name: 'Binomial', path: '/binomial' },
  { name: 'Bernoulli', path: '/bernoulli' },
  { name: 'Multinomial', path: '/multinomial' },
  { name: 'Normal', path: '/normal-standard' },
  { name: 'Gibbs', path: '/gibbs' },
  { name: 'Exponencial', path: '/exponencial' },
  { name: 'Normal Bivariada', path: '/bivariate-normal' },
])
</script>

<template>
  <nav class="bg-gray-800 p-4 text-white shadow-lg">
    <div class="container mx-auto flex items-center justify-between">
      <RouterLink to="/" class="text-xl font-bold hover:text-gray-300"> Probity </RouterLink>

      <div class="space-x-4">
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          class="hover:text-gray-300 transition-colors"
          active-class="font-semibold text-blue-300"
        >
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
