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
import BinomialForm from '@/components/formulas/BinomialForm.vue'
import BinomialChart from '@/components/charts/BinomialChart.vue'
import { calculateBinomial } from '@/services/formulasAPI'

// --- La lógica no cambia en absoluto ---
const apiResult = ref(null)
const isLoading = ref(false)
const apiError = ref(null)

async function handleCalculate(formData) {
  isLoading.value = true
  apiResult.value = null
  apiError.value = null
  try {
    const response = await calculateBinomial(formData)
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
      <h1 class="text-3xl font-bold">Distribución Binomial</h1>
      <p class="text-muted-foreground">
        Calcula la probabilidad para un número de éxitos (k) en (n) ensayos.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Parámetros</CardTitle>
          </CardHeader>
          <CardContent>
            <BinomialForm @calculate="handleCalculate" />
          </CardContent>
          <CardFooter>
            <Button form="binomial-form" type="submit" class="w-full">Calcular</Button>
          </CardFooter>
        </Card>

        <Card v-if="apiResult || isLoading || apiError">
          <CardHeader>
            <CardTitle>Resultados Numéricos</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <p v-if="isLoading" class="text-center">Calculando...</p>
            <p v-if="apiError" class="text-center text-red-500">Error al calcular.</p>
            <div v-if="apiResult" class="text-sm space-y-2">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Media (μ):</span>
                <span class="font-mono font-semibold">{{ apiResult.result.mean.toFixed(4) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Varianza (σ²):</span>
                <span class="font-mono font-semibold">{{
                  apiResult.result.variance.toFixed(4)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">P(X = k):</span>
                <span class="font-mono font-semibold">{{
                  apiResult.result.pmf_at_k.toFixed(4)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">P(X ≤ k):</span>
                <span class="font-mono font-semibold">{{
                  apiResult.result.cdf_at_k.toFixed(4)
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
            <BinomialChart
              v-if="apiResult && apiResult.graph_data"
              :chart-data="apiResult.graph_data"
            />
            <div v-else class="text-center text-gray-500 h-full flex items-center justify-center">
              <p>Ingresa los datos y presiona "Calcular" para generar el gráfico.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
