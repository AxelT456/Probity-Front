LayoutWithSidebar.vue

<template>
  <div class="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <!-- Sidebar -->
    <AppSidebar />


      <main class="flex-1 container mx-auto py-8 px-4">
        <slot />
      </main>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from '@/components/layout/app-sidebar.vue'
import Navbar from '@/components/layout/NavBar.vue' // Asegúrate de que esta ruta sea correcta
</script>
