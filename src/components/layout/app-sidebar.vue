app-sidebar.vue

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-sidebar bg-stone-900">
      <div class="p-4  ">
        <div class="flex items-center gap-3">
          <div class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <GalleryVerticalEnd class="size-4" />
          </div>
          <div class="flex flex-col gap-0.5 leading-none text-white">
            <span class="font-medium">Probity</span>
            <span class="text-sm text-muted-foreground">v1.0.0</span>
          </div>
        </div>
      </div>

      <nav class="p-4">
        <ul class="space-y-2">
          <li v-for="item in data.navMain" :key="item.title">
            <a :href="item.url" class="block font-medium text-white hover:bg-color-neutral-500 py-2">
              {{ item.title }}
            </a>
            <ul v-if="item.items?.length" class="ml-4 mt-1 space-y-1 pl-4">
              <li v-for="subItem in item.items" :key="subItem.title">
                <a
                  :href="subItem.url"
                  :class="[
                    'block text-sm py-1 text-sidebar-foreground/70 hover:bg-color-neutral-500 transition-colors',
                    subItem.isActive ? 'text-sidebar-primary font-medium' : ''
                  ]"
                >
                  {{ subItem.title }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <Navbar />
      <main class="flex-1 p-6">
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
      title: "Binomial",
      url: "/binomial",
    },
    {
      title: "Bernoulli",
      url: "/bernoulli",
          },
{
      title: "Multinomial",
      url: "/multinomial",
          },
{
      title: "Normal standard",
      url: "/normal-standard",
          },
  ],
}
</script>

<style scoped></style>
