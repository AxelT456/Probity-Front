<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import GibbsForm from '@/components/formulas/GibbsForm.vue'
import GibbsScatterChart from '@/components/charts/GibbsScatterChart.vue'
import Gibbs3DChart from '@/components/charts/Gibbs3DChart.vue'
import { calculateGibbs } from '@/services/formulasAPI'

const apiResult = ref(null)
const isLoading = ref(false)
const apiError = ref(null)

async function handleCalculate(formData) {
  isLoading.value = true
  apiResult.value = null
  apiError.value = null
  try {
    const response = await calculateGibbs(formData)
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
      <h1 class="text-3xl font-bold">Muestreo de Gibbs</h1>
      <p class="text-muted-foreground">
        Visualiza la trayectoria y densidad de un muestreador de Gibbs.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Columna de Controles y Resumen -->
      <div class="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Parámetros de Simulación</CardTitle>
          </CardHeader>
          <CardContent>
            <GibbsForm @calculate="handleCalculate" />
          </CardContent>
          <CardFooter>
            <Button form="gibbs-form" type="submit" class="w-full">Ejecutar Simulación</Button>
          </CardFooter>
        </Card>

        <Card v-if="apiResult || isLoading || apiError">
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4 text-sm">
            <p v-if="isLoading" class="text-center">Ejecutando simulación...</p>
            <p v-if="apiError" class="text-center text-red-500">Error en la simulación.</p>
            <div v-if="apiResult" class="space-y-2">
              <div class="flex justify-between">
                <span class="text-muted-foreground"># Iteraciones:</span>
                <span class="font-mono font-semibold">{{
                  apiResult.metadata.parameters.iteraciones
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground"># Puntos Generados:</span>
                <span class="font-mono font-semibold">{{
                  apiResult.graph_data.scatter_plot.x.length
                }}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Columna de Gráficos -->
      <div class="md:col-span-2 space-y-6">
        <!-- Gráfico de Dispersión 2D -->
        <Card>
          <CardHeader>
            <CardTitle>Trayectoria de la Simulación (2D)</CardTitle>
          </CardHeader>
          <CardContent class="pt-6">
            <div v-if="isLoading" class="text-center h-96 flex items-center justify-center">
              Generando gráficos... ⏳
            </div>
            <div
              v-else-if="apiError"
              class="text-center text-red-500 h-96 flex items-center justify-center"
            >
              Error al cargar los datos.
            </div>
            <GibbsScatterChart
              v-else-if="apiResult && apiResult.graph_data"
              :chart-data="apiResult.graph_data.scatter_plot"
            />
            <div v-else class="text-center text-gray-500 h-96 flex items-center justify-center">
              <p>Configura y ejecuta la simulación para generar los gráficos.</p>
            </div>
          </CardContent>
        </Card>

        <!-- Gráfico de Densidad 3D -->
        <Card v-if="apiResult && !isLoading && !apiError">
          <CardHeader>
            <CardTitle>Visualización de Densidad (3D)</CardTitle>
          </CardHeader>
          <CardContent class="pt-6">
            <Gibbs3DChart
              v-if="apiResult.graph_data.histogram_3d"
              :chart-data="apiResult.graph_data.histogram_3d"
            />
            <div v-else class="text-center text-gray-500 h-96 flex items-center justify-center">
              <p>No se recibieron datos para el gráfico 3D.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
<!-- Sección Informativa sobre Muestreo de Gibbs -->
<div class="mt-8 bg-white rounded-xl border border-stone-200 card-shadow overflow-hidden">
  <div class="bg-stone-800 text-white px-6 py-4">
    <h2 class="text-xl font-semibold flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Acerca del Muestreo de Gibbs
    </h2>
  </div>

  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          ¿Qué es el Muestreo de Gibbs?
        </h3>
        <p class="text-stone-600 mb-4">
          El muestreo de Gibbs es un <strong>algoritmo de cadenas de Markov Monte Carlo (MCMC)</strong>
          utilizado para obtener secuencias de observaciones aproximadas de una distribución
          multivariante cuando la distribución conjunta es difícil de muestrear directamente.
          Funciona muestreando iterativamente cada variable condicionada a las demás.
        </p>

        <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Algoritmo
        </h3>
        <div class="bg-stone-100 p-4 rounded-lg mb-4">
          <p class="text-stone-800 font-mono text-sm">
            Para cada iteración t y cada variable Xᵢ:<br>
            1. X₁⁽ᵗ⁺¹⁾ ~ P(X₁ | X₂⁽ᵗ⁾, X₃⁽ᵗ⁾, ..., Xₙ⁽ᵗ⁾)<br>
            2. X₂⁽ᵗ⁺¹⁾ ~ P(X₂ | X₁⁽ᵗ⁺¹⁾, X₃⁽ᵗ⁾, ..., Xₙ⁽ᵗ⁾)<br>
            3. ...<br>
            n. Xₙ⁽ᵗ⁺¹⁾ ~ P(Xₙ | X₁⁽ᵗ⁺¹⁾, X₂⁽ᵗ⁺¹⁾, ..., Xₙ₋₁⁽ᵗ⁺¹⁾)
          </p>
        </div>
        <p class="text-stone-600 text-sm">
          El algoritmo genera una <strong>cadena de Markov</strong> que converge a la distribución
          objetivo después de un número suficiente de iteraciones (período de "burn-in").
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
            Inferencia Bayesiana: Estimación de parámetros en modelos complejos
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Aprendizaje Automático: Modelos de mezclas y modelos gráficos
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Bioinformática: Análisis de datos genómicos y proteómicos
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Procesamiento de Imágenes: Reconstrucción y restauración de imágenes
          </li>
        </ul>

        <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
          Interpretación de Resultados
        </h3>
        <p class="text-stone-600">
          El <strong>gráfico 2D</strong> muestra la trayectoria del muestreador, donde cada punto representa
          un estado en el espacio de parámetros. La <strong>visualización 3D</strong> representa la densidad
          de la distribución objetivo. La convergencia se observa cuando la cadena se estabiliza
          alrededor de los valores más probables, formando una nube densa en esas regiones.
        </p>
      </div>
    </div>
  </div>
</div>
  </div>
</template>
