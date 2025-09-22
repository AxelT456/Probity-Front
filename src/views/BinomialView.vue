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
  <div class="min-h-screen p-6">
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

      <!-- Sección Informativa sobre Distribución Binomial -->
      <div class="mt-8 bg-white rounded-xl border border-stone-200 card-shadow overflow-hidden">
        <div class="bg-stone-800 text-white px-6 py-4">
          <h2 class="text-xl font-semibold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Acerca de la Distribución Binomial
          </h2>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                ¿Qué es la Distribución Binomial?
              </h3>
              <p class="text-stone-600 mb-4">
                La distribución binomial es un modelo de probabilidad que describe el número de éxitos en una secuencia de <strong>n</strong> ensayos independientes,
                cada uno con una probabilidad constante <strong>p</strong> de éxito. Es fundamental para experimentos con exactamente dos resultados posibles:
                éxito o fracaso.
              </p>

              <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Fórmula
              </h3>
              <div class="bg-stone-100 p-4 rounded-lg mb-4">
                <p class="text-stone-800 font-mono text-center">
                  P(X = k) = C(n, k) · p<sup>k</sup> · (1-p)<sup>n-k</sup>
                </p>
              </div>
              <p class="text-stone-600 text-sm">
                Donde: <strong>C(n, k)</strong> es el coeficiente binomial, <strong>p</strong> es la probabilidad de éxito,
                <strong>n</strong> es el número de ensayos, y <strong>k</strong> es el número de éxitos.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Aplicaciones Prácticas
              </h3>
              <ul class="text-stone-600 space-y-2 mb-4">
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Control de calidad: Número de defectos en un lote de producción
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Investigación médica: Eficacia de tratamientos o medicamentos
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Estudios de mercado: Tasa de respuesta a campañas publicitarias
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Genética: Herencia de características dominantes/recesivas
                </li>
              </ul>

              <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                Interpretación de Resultados
              </h3>
              <p class="text-stone-600">
                La gráfica muestra la probabilidad de obtener diferentes números de éxitos.
                <strong>Picos más altos</strong> indican resultados más probables, mientras que
                <strong>áreas bajo la curva</strong> representan probabilidades acumuladas.
                La forma de la distribución depende de los valores de <strong>n</strong> y <strong>p</strong>.
              </p>
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
