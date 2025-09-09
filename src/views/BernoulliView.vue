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
import BernoulliForm from '@/components/formulas/BernoulliForm.vue'
import BernoulliChart from '@/components/charts/BernoulliChart.vue'
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
      <h1 class="text-3xl font-bold">Simulación de Ensayos de Bernoulli</h1>
      <p class="text-muted-foreground">
        Simula múltiples ensayos con una probabilidad de éxito (p).
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Columna de Controles y Resultados -->
      <div class="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Parámetros</CardTitle>
          </CardHeader>
          <CardContent>
            <BernoulliForm @calculate="handleCalculate" />
          </CardContent>
          <CardFooter>
            <Button form="bernoulli-form" type="submit" class="w-full"> Simular y Calcular </Button>
          </CardFooter>
        </Card>

        <!-- Tarjeta de Resultados -->
        <Card v-if="apiResult || isLoading || apiError">
          <CardHeader>
            <CardTitle>Resultados de la Simulación</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <p v-if="isLoading" class="text-center">Simulando...</p>
            <p v-if="apiError" class="text-center text-red-500">Error en la simulación.</p>
            <div v-if="apiResult" class="text-center space-y-2">
              <div class="flex justify-around">
                <div>
                  <p class="text-sm text-muted-foreground">Éxitos</p>
                  <p class="text-2xl font-bold text-green-500">
                    {{ apiResult.result.data.Exitos }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-muted-foreground">Fracasos</p>
                  <p class="text-2xl font-bold text-red-500">
                    {{ apiResult.result.data.Fracasos }}
                  </p>
                </div>
              </div>
              <div>
                <p class="text-xs text-muted-foreground mt-4">Secuencia de Resultados</p>
                <div class="w-full bg-gray-100 p-2 rounded-md text-xs break-all dark:bg-gray-800">
                  {{ apiResult.result.data.Sucesion.join(', ') }}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Columna del Gráfico -->
      <div class="md:col-span-2">
        <Card class="h-full">
          <CardHeader>
            <CardTitle>Conteo de Resultados</CardTitle>
          </CardHeader>
          <CardContent class="pt-6">
            <BernoulliChart
              v-if="apiResult && apiResult.graph_data"
              :chart-data="apiResult.graph_data"
            />
            <div v-else class="text-center text-gray-500 h-full flex items-center justify-center">
              <p>Presiona "Simular y Calcular" para generar el gráfico.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
