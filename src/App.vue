
<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/layout/NavBar.vue' // Importa el Navbar
import AppSidebar from './components/app-sidebar.vue'
import LayoutWithSidebar from './components/layout/LayoutWithSidebar.vue'
</script>

<template>
  <LayoutWithSidebar>
    <RouterView />
  </LayoutWithSidebar>
</template>

<style scoped></style>

