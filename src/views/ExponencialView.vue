<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import ExponencialForm from '@/components/formulas/ExponencialForm.vue'
import ExponencialChart from '@/components/charts/ExponencialChart.vue'
import { calculateExponencial } from '@/services/formulasAPI'

const apiResult = ref(null)
const isLoading = ref(false)
const apiError = ref(null)

async function handleCalculate(formData) {
  isLoading.value = true
  apiResult.value = null
  apiError.value = null
  try {
    const response = await calculateExponencial(formData)
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
      <h1 class="text-3xl font-bold">Distribución Exponencial</h1>
      <p class="text-muted-foreground">
        Compara una simulación de datos exponenciales con su PDF teórica.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Parámetros</CardTitle>
          </CardHeader>
          <CardContent>
            <ExponencialForm @calculate="handleCalculate" />
          </CardContent>
          <CardFooter>
            <Button form="exponencial-form" type="submit" class="w-full"
              >Ejecutar Simulación</Button
            >
          </CardFooter>
        </Card>

        <Card v-if="apiResult || isLoading || apiError">
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4 text-sm">
            <p v-if="isLoading" class="text-center">Ejecutando simulación...</p>
            <p v-if="apiError" class="text-center text-red-500">Error en la simulación.</p>
            <div v-if="apiResult" class="space-y-2">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Media de la Simulación:</span>
                <span class="font-mono font-semibold">{{
                  apiResult.result.mean_of_simulation.toFixed(4)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Media Teórica (1/λ):</span>
                <span class="font-mono font-semibold">{{
                  apiResult.result.theoretical_mean.toFixed(4)
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
            <div v-if="isLoading" class="text-center h-96 flex items-center justify-center">
              Generando gráfico... ⏳
            </div>
            <div
              v-if="apiError"
              class="text-center text-red-500 h-96 flex items-center justify-center"
            >
              Error al cargar los datos.
            </div>
            <ExponencialChart v-if="apiResult" :chart-data="apiResult.graph_data" />
            <div v-else class="text-center text-gray-500 h-96 flex items-center justify-center">
              <p>Configura y ejecuta la simulación para generar el gráfico.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
