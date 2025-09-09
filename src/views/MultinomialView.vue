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
import MultinomialForm from '@/components/formulas/MultinomialForm.vue'
import ResultsChart from '@/components/charts/ResultsChart.vue'
import { calculateMultinomial } from '@/services/formulasAPI'

const apiResult = ref(null)
const isLoading = ref(false)
const apiError = ref(null)

async function handleCalculate(formData) {
  isLoading.value = true
  apiResult.value = null
  apiError.value = null
  try {
    const response = await calculateMultinomial(formData)
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
      <h1 class="text-3xl font-bold">Simulación de Distribución Multinomial</h1>
      <p class="text-muted-foreground">
        Ejecuta una simulación de Monte Carlo para encontrar los resultados más frecuentes.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Parámetros de Simulación</CardTitle>
          </CardHeader>
          <CardContent>
            <MultinomialForm @calculate="handleCalculate" />
          </CardContent>
          <CardFooter>
            <Button form="multinomial-form" type="submit" class="w-full"
              >Ejecutar Simulación</Button
            >
          </CardFooter>
        </Card>

        <Card v-if="apiResult || isLoading || apiError">
          <CardHeader>
            <CardTitle>Resumen de la Simulación</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4 text-sm">
            <p v-if="isLoading" class="text-center">Ejecutando simulación...</p>
            <p v-if="apiError" class="text-center text-red-500">Error en la simulación.</p>
            <div v-if="apiResult" class="space-y-2">
              <div class="flex justify-between">
                <span class="text-muted-foreground"># Experimentos Totales:</span>
                <span class="font-mono font-semibold">{{
                  apiResult.result.total_experiments
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground"># Resultados Únicos:</span>
                <span class="font-mono font-semibold">{{
                  apiResult.result.unique_outcomes_count
                }}</span>
              </div>
              <div class="text-center pt-2">
                <p class="text-muted-foreground">Resultado Más Frecuente</p>
                <p class="font-mono font-bold text-lg">
                  {{ apiResult.result.most_frequent_outcome.vector }}
                </p>
                <p class="text-xs text-muted-foreground">
                  (Apareció {{ apiResult.result.most_frequent_outcome.count }} veces)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div class="md:col-span-2">
        <Card class="h-full">
          <CardHeader>
            <CardTitle>Top 20 Resultados Más Frecuentes</CardTitle>
          </CardHeader>
          <CardContent class="pt-6">
            <div v-if="isLoading" class="text-center">Generando gráfico... ⏳</div>
            <div v-else-if="apiError" class="text-center text-red-500">
              Error al cargar los datos.
            </div>
            <ResultsChart
              v-else-if="apiResult && apiResult.graph_data"
              :chart-data="{
                title: apiResult.graph_data.title,
                labels: apiResult.graph_data.labels,
                data: apiResult.graph_data.data,
              }"
            />
            <div v-else class="text-center text-gray-500 h-full flex items-center justify-center">
              <p>Configura y ejecuta la simulación para generar el gráfico.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
