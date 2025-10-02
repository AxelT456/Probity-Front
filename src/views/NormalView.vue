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
        Calcula la PDF y CDF para un valor (x) en una distribución definida por su media (μ) y desviación estándar (σ).
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
                <span class="font-mono font-semibold">{{ apiResult.result.pdf_at_x.toFixed(4) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Valor CDF (Área):</span>
                <span class="font-mono font-semibold">{{ apiResult.result.cdf_at_x.toFixed(4) }}</span>
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
             <div v-if="isLoading" class="text-center h-96 flex items-center justify-center">Generando gráfico... ⏳</div>
             <div v-else-if="apiError" class="text-center text-red-500 h-96 flex items-center justify-center">Error al cargar los datos.</div>
            <NormalChart v-else-if="apiResult && apiResult.graph_data" :chart-data="apiResult.graph_data" />
            <div v-else class="text-center text-gray-500 h-96 flex items-center justify-center">
              <p>Ingresa los parámetros y presiona "Calcular" para generar el gráfico.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

