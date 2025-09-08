<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
  <div class="h-screen flex flex-col items-center justify-center p-8 space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
      <Card class="md:col-span-1">
        <CardHeader>
          <CardTitle>Calculadora Bernoulli</CardTitle>
        </CardHeader>
        <CardContent>
          <BernoulliForm @calculate="handleCalculate" />
        </CardContent>
        <CardFooter>
          <Button form="bernoulli-form" type="submit">Calcular</Button>
        </CardFooter>
      </Card>

      <div class="md:col-span-2">
        <Card class="h-full">
          <CardHeader>
            <CardTitle>Visualización Gráfica</CardTitle>
          </CardHeader>
          <CardContent class="pt-6">
            <div v-if="isLoading" class="text-center">Cargando gráfico... ⏳</div>
            <div v-if="apiError" class="text-center text-red-500">
              Ocurrió un error al cargar los datos.
            </div>
            <BernoulliChart
              v-if="apiResult && apiResult.graph_data"
              :chart-data="{
                labels: apiResult.graph_data.categories,
                datasets: [
                  {
                    label: 'Conteo',
                    data: apiResult.graph_data.dataset,
                    backgroundColor: ['#4ade80', '#f87171'],
                    borderColor: ['#16a34a', '#b91c1c'],
                  },
                ],
                title: apiResult.graph_data.title,
                x_label: 'Categoría',
                y_label: 'Frecuencia',
              }"
            />
            <div
              v-if="
                apiResult &&
                apiResult.result &&
                apiResult.result.data &&
                apiResult.result.data.Sucesion
              "
              class="mt-8"
            >
              <h3 class="font-semibold mb-2">Primeros 100 resultados de la sucesión:</h3>
              <div class="bg-gray-100 dark:bg-gray-800 rounded p-4 text-xs max-h-40 overflow-auto">
                <span
                  v-for="(item, idx) in apiResult.result.data.Sucesion.slice(0, 100)"
                  :key="idx"
                >
                  {{ item }}<span v-if="idx < apiResult.result.data.Sucesion.length - 1">, </span>
                </span>
              </div>
            </div>
            <div v-if="!apiResult && !isLoading && !apiError" class="text-center text-gray-500">
              Ingresa los datos y presiona "Calcular" para generar el gráfico.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
