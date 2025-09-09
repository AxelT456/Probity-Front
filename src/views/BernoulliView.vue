
<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'
import BernoulliForm from '@/components/formulas/BernoulliForm.vue'
import BarChart from '@/components/charts/BarChart.vue'
import { calculateBernoulli } from '@/services/formulasAPI'

const apiResult = ref(null)
const isLoading = ref(false)
const apiError = ref(null)

async function handleCalculate(formData) {
  isLoading.value = true
  apiResult.value = null
  apiError.value = null

  try {
    const response = await calculateBernoulli(formData)
  console.log("Respuesta cruda de la API:", response.data)
    apiResult.value = response.data
  } catch (error) {
    apiError.value = error
    console.error('Error al contactar la API:', error)
  } finally {
    isLoading.value = false
  }
}

// Helpers para evitar errores
function safeNumber(value) {
  return typeof value === 'number' ? value : 0
}

function safeFormat(value, decimals = 3) {
  return typeof value === 'number' ? value.toFixed(decimals) : 'N/A'
}

function safeDivide(num, den, decimals = 3) {
  const n = safeNumber(num)
  const d = safeNumber(den)
  return d > 0 ? (n / d).toFixed(decimals) : 'N/A'
}

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Distribución de Resultados de Bernoulli',
      font: { size: 18, weight: 'bold' },
      color: '#292524'
    },
    legend: {
      position: 'top',
      labels: {
        font: { size: 14 },
        color: '#44403c'
      }
    },
    tooltip: {
      backgroundColor: '#1c1917',
      titleFont: { size: 14 },
      bodyFont: { size: 14 },
      padding: 12,
      boxPadding: 6
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Resultado',
        font: { size: 14, weight: 'bold' },
        color: '#44403c'
      },
      grid: { color: '#e7e5e4' },
      ticks: { color: '#57534e', font: { size: 13 } }
    },
    y: {
      title: {
        display: true,
        text: 'Frecuencia',
        font: { size: 14, weight: 'bold' },
        color: '#44403c'
      },
      grid: { color: '#e7e5e4' },
      ticks: { color: '#57534e', font: { size: 13 } },
      beginAtZero: true
    },
  },
})
</script>

<template>
  <div class="min-h-screen bg-stone-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-stone-800 mb-2">Distribución de Bernoulli</h1>
        <p class="text-stone-600 max-w-2xl mx-auto">
          Simula múltiples ensayos independientes con probabilidad de éxito
          <span class="font-medium text-stone-800">p</span> y visualiza la distribución de resultados
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Panel lateral -->
        <div class="lg:col-span-1 space-y-6">
          <Card class="bg-white border-stone-200 card-shadow-lg">
            <CardHeader class="pb-4 border-b border-stone-100">
              <CardTitle class="text-stone-800">Parámetros de Simulación</CardTitle>
            </CardHeader>
            <CardContent class="pt-6">
              <BernoulliForm @calculate="handleCalculate" />
            </CardContent>
            <CardFooter class="pt-4 border-t border-stone-100">
              <Button
                form="bernoulli-form"
                type="submit"
                class="w-full bg-stone-800 hover:bg-stone-700 text-white"
                :disabled="isLoading"
              >
                <span v-if="!isLoading">Ejecutar Simulación</span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Simulando...
                </span>
              </Button>
            </CardFooter>
          </Card>

          <!-- Resultados -->
          <Card v-if="apiResult || isLoading || apiError" class="bg-white border-stone-200 card-shadow">
            <CardHeader class="pb-4 border-b border-stone-100">
              <CardTitle class="text-stone-800">Resumen Estadístico</CardTitle>
            </CardHeader>
            <CardContent class="pt-6">
              <div v-if="isLoading" class="space-y-4">Cargando...</div>

              <div v-else-if="apiError" class="text-center py-4 px-4 rounded-lg bg-stone-50 border border-stone-200">
                <p class="text-stone-600 text-sm">Error en la simulación</p>
              </div>

              <div v-else-if="apiResult?.result?.data" class="space-y-5">
                <div class="flex justify-between items-center p-3 bg-stone-50 rounded-lg">
                  <div>
                    <p class="text-sm font-medium text-stone-700">Total de ensayos</p>
                    <p class="text-xs text-stone-500">Número de simulaciones</p>
                  </div>
                  <span class="text-xl font-bold text-stone-800 bg-white py-1 px-3 rounded-md border border-stone-200">
                    {{ safeNumber(apiResult.result.data.Exitos) + safeNumber(apiResult.result.data.Fracasos) }}
                  </span>
                </div>

                <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <div>
                    <p class="text-sm font-medium text-green-800">Éxitos</p>
                    <p class="text-xs text-green-600">
                      Probabilidad: {{ safeDivide(apiResult.result.data.Exitos, safeNumber(apiResult.result.data.Exitos) + safeNumber(apiResult.result.data.Fracasos)) }}
                    </p>
                  </div>
                  <span class="text-xl font-bold text-green-700 bg-white py-1 px-3 rounded-md border border-green-200">
                    {{ safeNumber(apiResult.result.data.Exitos) }}
                  </span>
                </div>

                <div class="flex justify-between items-center p-3 bg-rose-50 rounded-lg border border-rose-100">
                  <div>
                    <p class="text-sm font-medium text-rose-800">Fracasos</p>
                    <p class="text-xs text-rose-600">
                      Probabilidad: {{ safeDivide(apiResult.result.data.Fracasos, safeNumber(apiResult.result.data.Exitos) + safeNumber(apiResult.result.data.Fracasos)) }}
                    </p>
                  </div>
                  <span class="text-xl font-bold text-rose-700 bg-white py-1 px-3 rounded-md border border-rose-200">
                    {{ safeNumber(apiResult.result.data.Fracasos) }}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Gráfico -->
        <div class="lg:col-span-3">
          <Card class="h-full bg-white border-stone-200 card-shadow-lg">
            <CardHeader class="pb-4 border-b border-stone-100">
              <div class="flex justify-between items-center">
                <CardTitle class="text-stone-800">Visualización de Resultados</CardTitle>
                <div v-if="apiResult?.result?.data" class="text-sm text-stone-600 bg-stone-100 px-3 py-1 rounded-full">
                  Probabilidad teórica:
                  {{ safeDivide(apiResult.result.data.Exitos, safeNumber(apiResult.result.data.Exitos) + safeNumber(apiResult.result.data.Fracasos)) }}
                </div>
              </div>
            </CardHeader>
            <CardContent class="pt-6 h-96">

<BarChart
  v-if="apiResult?.graph_data"
  :chart-data="{
    labels: apiResult.graph_data.labels ?? [],   // ✅ etiquetas de la API
    datasets: [
      {
        label: 'Probabilidad teórica',
        data: apiResult.graph_data.probabilities ?? [], // ✅ valores de la API
        backgroundColor: ['#65a30d', '#e11d48'],
        borderColor: ['#65a30d', '#e11d48'],
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: ['#4d7c0f', '#be123c'],
        hoverBorderColor: ['#3f6212', '#9f1239'],
      }
    ],
  }"
  :chart-options="{
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        title: {
          ...chartOptions.scales.y.title,
          text: apiResult.graph_data.y_label || 'Probabilidad' // ✅ etiqueta correcta
        },
        beginAtZero: true,
        suggestedMax: 1 // ✅ para que se vea entre 0 y 1
      },
      x: {
        ...chartOptions.scales.x,
        title: {
          ...chartOptions.scales.x.title,
          text: apiResult.graph_data.x_label || 'Resultado'
        }
      }
    }
  }"
/>

              <div v-else class="h-full flex flex-col items-center justify-center p-8 text-center bg-stone-50 rounded-lg border-2 border-dashed border-stone-200">
                <h3 class="font-medium text-stone-600 mb-1">Esperando datos de simulación</h3>
                <p class="text-stone-400 text-sm">Configura los parámetros y ejecuta la simulación para visualizar los resultados.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}
.card-shadow-lg {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 5px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
