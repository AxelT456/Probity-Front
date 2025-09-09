<script setup>
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import BinomialForm from '@/components/formulas/BinomialForm.vue'
import BinomialChart from '@/components/charts/BinomialChart.vue'
import { calculateBinomial } from '@/services/formulasAPI'
import { ref } from 'vue'

// Estado para guardar los resultados de la API
const apiResult = ref(null)
const isLoading = ref(false)
const apiError = ref(null)

async function handleCalculate(formData) {
  isLoading.value = true
  apiResult.value = null
  apiError.value = null

  try {
    const response = await calculateBinomial(formData)
    apiResult.value = response.data
  } catch (error) {
    apiError.value = error
    console.error('Error al contactar la API:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-stone-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-stone-800 mb-2">Distribución Binomial</h1>
        <p class="text-stone-600">Calcula y visualiza probabilidades binomiales</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Panel de entrada -->
        <Card class="lg:col-span-1 bg-white border-stone-200 card-shadow">
          <CardHeader class="pb-3 border-b border-stone-100">
            <CardTitle class="text-stone-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Parámetros Binomiales
            </CardTitle>
          </CardHeader>
          <CardContent class="pt-6">
            <BinomialForm @calculate="handleCalculate" />
          </CardContent>
          <CardFooter class="pt-4 border-t border-stone-100">
            <Button
              form="binomial-form"
              type="submit"
              class="w-full bg-stone-800 hover:bg-stone-700 text-white transition-colors"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">Calcular Probabilidades</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </span>
            </Button>
          </CardFooter>
        </Card>

        <!-- Panel de visualización -->
        <div class="lg:col-span-2">
          <Card class="h-full bg-white border-stone-200 card-shadow">
            <CardHeader class="pb-3 border-b border-stone-100">
              <CardTitle class="text-stone-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Distribución de Probabilidades
              </CardTitle>
            </CardHeader>
            <CardContent class="pt-6">
              <!-- Estados de carga -->
              <div v-if="isLoading" class="flex flex-col items-center justify-center h-96">
                <div class="animate-pulse flex flex-col items-center">
                  <div class="rounded-full bg-stone-200 h-12 w-12 mb-4"></div>
                  <div class="h-4 bg-stone-200 rounded w-40 mb-2"></div>
                  <div class="h-3 bg-stone-200 rounded w-32"></div>
                </div>
              </div>

              <div v-else-if="apiError" class="text-center py-12 px-4 rounded-lg bg-stone-50 border border-stone-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-stone-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 class="font-medium text-stone-700 mb-1">Error al procesar la solicitud</h3>
                <p class="text-stone-500 text-sm">Intente nuevamente o verifique los parámetros ingresados.</p>
              </div>

              <div v-else-if="!apiResult" class="text-center py-12 px-4 rounded-lg bg-stone-50 border border-stone-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-stone-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="font-medium text-stone-700 mb-1">Esperando datos</h3>
                <p class="text-stone-500 text-sm">Ingresa los parámetros y presiona "Calcular" para generar el gráfico.</p>
              </div>

              <BinomialChart
                v-else-if="apiResult && apiResult.graph_data"
                :chart-data="apiResult.graph_data"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Panel de resultados (si existen) -->
      <div v-if="apiResult && apiResult.summary" class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white p-4 rounded-lg border border-stone-200 card-shadow">
          <div class="flex items-center">
            <div class="rounded-full bg-stone-100 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-stone-600">Media (μ)</p>
              <p class="text-xl font-semibold text-stone-800">{{ apiResult.summary.mean }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg border border-stone-200 card-shadow">
          <div class="flex items-center">
            <div class="rounded-full bg-stone-100 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-stone-600">Desviación Estándar (σ)</p>
              <p class="text-xl font-semibold text-stone-800">{{ apiResult.summary.stdDev }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg border border-stone-200 card-shadow">
          <div class="flex items-center">
            <div class="rounded-full bg-stone-100 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-stone-600">Varianza (σ²)</p>
              <p class="text-xl font-semibold text-stone-800">{{ apiResult.summary.variance }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}
</style>
