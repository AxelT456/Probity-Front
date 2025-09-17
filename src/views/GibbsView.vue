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
  </div>
</template>
