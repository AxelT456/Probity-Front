<script setup lang="ts"></script>

<template>
  <div class="text-center py-16">
    <h1 class="text-5xl font-extrabold text-gray-800 dark:text-gray-200 mb-4">
      Bienvenido a la Calculadora de Probabilidad
    </h1>
    <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
      Selecciona una calculadora del menú superior para empezar.
    </p>
    <div class="flex justify-center space-x-4">
      <RouterLink
        to="/binomial"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Ir a Binomial
      </RouterLink>
      <RouterLink
        to="/bernoulli"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Ir a Bernoulli
      </RouterLink>
      <RouterLink
        to="/multinomial"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Ir a Multinomial
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
