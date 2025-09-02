<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/layout/NavBar.vue' // Importa el Navbar
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <Navbar />
    <main class="container mx-auto py-8 px-4">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
