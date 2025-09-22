<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import NormalForm from '@/components/formulas/NormalForm.vue'
import NormalChart from '@/components/charts/NormalChart.vue'
import { calculateNormal } from '@/services/formulasAPI'

const apiResult = ref(null)
const isLoading = ref(false)
const apiError = ref(null)

async function handleCalculate(formData) {
  isLoading.value = true
  apiResult.value = null
  apiError.value = null
  try {
    const response = await calculateNormal(formData)
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
  <div class="container mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-3xl font-bold">Distribución Normal General</h1>
      <p class="text-muted-foreground">
        Calcula la PDF y CDF para un valor (x) en una distribución normal definida por su media (μ)
        y desviación estándar (σ).
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Parámetros</CardTitle>
          </CardHeader>
          <CardContent>
            <NormalForm @calculate="handleCalculate" />
          </CardContent>
          <CardFooter>
            <Button form="normal-form" type="submit" class="w-full">Calcular</Button>
          </CardFooter>
        </Card>

        <Card v-if="apiResult || isLoading || apiError">
          <CardHeader>
            <CardTitle>Resultados Numéricos</CardTitle>
            <CardDescription v-if="apiResult">
              Para x = {{ apiResult.metadata.parameters.x_value }}
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <p v-if="isLoading" class="text-center">Calculando...</p>
            <p v-if="apiError" class="text-center text-red-500">Error al calcular.</p>
            <div v-if="apiResult" class="text-sm space-y-2">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Valor PDF:</span>
                <span class="font-mono font-semibold">{{
                  apiResult.result.pdf_at_x.toFixed(4)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Valor CDF (Área):</span>
                <span class="font-mono font-semibold">{{
                  apiResult.result.cdf_at_x.toFixed(4)
                }}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div class="md:col-span-2">
        <Card class="h-full">
          <CardHeader>
            <CardTitle>Visualización Gráfica</CardTitle>
          </CardHeader>
          <CardContent class="pt-6">
            <div v-if="isLoading" class="text-center">Cargando gráfico... ⏳</div>
            <div v-if="apiError" class="text-center text-red-500">Error al cargar los datos.</div>
            <NormalChart
              v-if="apiResult && apiResult.graph_data"
              :chart-data="apiResult.graph_data"
            />
            <div v-else class="text-center text-gray-500 h-full flex items-center justify-center">
              <p>Ingresa los parámetros y presiona "Calcular" para generar el gráfico.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
<!-- Sección Informativa sobre Distribución Normal -->
<div class="mt-8 bg-white rounded-xl border border-stone-200 card-shadow overflow-hidden">
  <div class="bg-stone-800 text-white px-6 py-4">
    <h2 class="text-xl font-semibold flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Acerca de la Distribución Normal
    </h2>
  </div>

  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          ¿Qué es la Distribución Normal?
        </h3>
        <p class="text-stone-600 mb-4">
          La distribución normal, también conocida como <strong>distribución gaussiana</strong> o
          "campana de Gauss", es la distribución de probabilidad más importante en estadística.
          Describe fenómenos donde los valores se distribuyen simétricamente alrededor de una
          media, con la mayoría de las observaciones concentradas cerca del centro y menos en
          los extremos.
        </p>

        <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Fórmula
        </h3>
        <div class="bg-stone-100 p-4 rounded-lg mb-4">
          <p class="text-stone-800 font-mono text-center text-sm">
            f(x; μ, σ) = (1/σ√(2π)) · e^{-(x-μ)²/(2σ²)}
          </p>
        </div>
        <p class="text-stone-600 text-sm">
          Donde: <strong>μ</strong> es la media (centro de la distribución), <strong>σ</strong> es la desviación estándar
          (dispersión de los datos), <strong>π</strong> es la constante pi, y <strong>e</strong> es la base del logaritmo natural.
        </p>

        <h3 class="text-lg font-semibold text-stone-800 mb-3 mt-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Regla Empírica (68-95-99.7)
        </h3>
        <ul class="text-stone-600 space-y-1 text-sm">
          <li>• Aprox. 68% de los datos están dentro de μ ± σ</li>
          <li>• Aprox. 95% de los datos están dentro de μ ± 2σ</li>
          <li>• Aprox. 99.7% de los datos están dentro de μ ± 3σ</li>
        </ul>
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
            Ciencias Sociales: Puntuaciones de CI, calificaciones académicas
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Control de Calidad: Dimensiones de productos manufacturados
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Finanzas: Rendimientos de activos financieros (bajo ciertas condiciones)
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Ciencias Naturales: Mediciones de fenómenos naturales con errores aleatorios
          </li>
        </ul>

        <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
          Interpretación de Resultados
        </h3>
        <p class="text-stone-600 mb-2">
          <strong>PDF (Función de Densidad de Probabilidad):</strong> Indica la densidad de probabilidad
          en un punto específico. Valores más altos significan mayor concentración de datos alrededor de ese punto.
        </p>
        <p class="text-stone-600">
          <strong>CDF (Función de Distribución Acumulativa):</strong> Representa la probabilidad de que
          una variable aleatoria sea menor o igual a un valor específico. Es el área bajo la curva PDF
          desde -∞ hasta el punto x.
        </p>
        <div class="bg-blue-50 p-3 rounded-lg mt-3 border border-blue-100">
          <p class="text-blue-800 text-sm">
            <strong>Ejemplo:</strong> Si CDF(x) = 0.85, significa que el 85% de los valores en la distribución
            son menores o iguales a x.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
</template>
