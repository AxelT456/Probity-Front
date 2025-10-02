app-sidebar.vue

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-stone-900 min-h-screen">
      <div class="p-4 border-b border-stone-800">
        <div class="flex items-center gap-3">
          <div class="bg-stone-800 text-white flex aspect-square size-8 items-center justify-center rounded-lg">
            <GalleryVerticalEnd class="size-4" />
          </div>
          <div class="flex flex-col gap-0.5 leading-none text-white">
            <span class="font-medium">Probity</span>
            <span class="text-sm text-stone-400">v1.0.0</span>
          </div>
        </div>
      </div>

      <nav class="p-4">
        <ul class="space-y-1">
          <li v-for="item in data.navMain" :key="item.title">
            <router-link
              :to="item.url"
              class="block px-3 py-2 rounded-md text-sm font-medium text-stone-300 hover:bg-stone-800 hover:text-white transition-colors"
              active-class="bg-stone-800 text-white"
            >
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1">
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GalleryVerticalEnd } from 'lucide-vue-next'

// Datos de muestra
const data = {
  navMain: [
    {
    title:"Home",
    url: "/"
    },
    {
      title: "Bernoulli",
      url: "/bernoulli",
    },
    {
      title: "Binomial",
      url: "/binomial",
    },
    {
      title: "Multinomial",
      url: "/multinomial",
    },
    {
      title: "Exponencial",
      url: "/exponencial",
    },
    {
      title: "Normal",
      url: "/normal",
    },
    {
      title: "Gibbs",
      url: "/gibbs",
    },
    {
      title: "Bivariate normal",
      url: "/bivariate-normal"
    }
  ],
}
</script>

<style scoped></style>
