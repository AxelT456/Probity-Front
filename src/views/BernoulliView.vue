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
    apiResult.value = response.data
  } catch (error) {
    apiError.value = error
    console.error('Error al contactar la API:', error)
  } finally {
    isLoading.value = false
  }
}

const chartOptions = ref({
  plugins: {
    title: { display: true, text: 'Conteo de Resultados de la Simulación' },
  },
  scales: {
    x: { title: { display: true, text: 'Resultado' } },
    y: { title: { display: true, text: 'Número de Ocurrencias' } },
  },
})
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
      <div class="md:col-span-1 space-y-6">
        <Card>
          <CardHeader><CardTitle>Parámetros</CardTitle></CardHeader>
          <CardContent><BernoulliForm @calculate="handleCalculate" /></CardContent>
          <CardFooter
            ><Button form="bernoulli-form" type="submit" class="w-full"
              >Simular y Calcular</Button
            ></CardFooter
          >
        </Card>

        <Card v-if="apiResult || isLoading || apiError">
          <CardHeader><CardTitle>Resultados de la Simulación</CardTitle></CardHeader>
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
            </div>
          </CardContent>
        </Card>
      </div>

      <div class="md:col-span-2">
        <Card class="h-full">
          <CardHeader><CardTitle>Conteo de Resultados</CardTitle></CardHeader>
          <CardContent class="pt-6">
            <BarChart
              v-if="apiResult"
              :chart-data="{
                labels: apiResult.graph_data.categories,
                datasets: [
                  { data: apiResult.graph_data.dataset, backgroundColor: ['#60a5fa', '#f87171'] },
                ],
              }"
              :chart-options="chartOptions"
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
