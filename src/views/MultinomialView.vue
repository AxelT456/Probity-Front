<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import MultinomialForm from '@/components/formulas/MultinomialForm.vue'
import MultinomialChart from '@/components/charts/MultinomialChart.vue'
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
  <div class="h-screen flex flex-col items-center justify-center p-8 space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
      <Card class="md:col-span-1">
        <CardHeader>
          <CardTitle>Calculadora Multinomial</CardTitle>
        </CardHeader>
        <CardContent>
          <MultinomialForm @calculate="handleCalculate" />
        </CardContent>
        <CardFooter>
          <Button form="multinomial-form" type="submit">Calcular</Button>
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
            <MultinomialChart
              v-if="apiResult && apiResult.graph_data"
              :chart-data="apiResult.graph_data"
            />
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
