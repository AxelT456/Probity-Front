<script setup>
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import BinomialForm from '@/components/formulas/BinomialForm.vue'
import FormulaDisplay from '@/components/ui/FormulaDisplay.vue'
import BinomialChart from '@/components/charts/BinomialChart.vue'
import { calculateBinomial } from '@/services/formulasAPI'

import { ref } from 'vue'

// Estado para guardar los resultados de la API
const apiResult = ref(null)
const isLoading = ref(false)
const apiError = ref(null)

async function handleCalculate(formData) {
  isLoading.value = true
  apiResult.value = null
  apiError.value = null

  try {
    // 2. Reemplaza la simulación con la llamada real
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
  <div class="h-screen flex flex-col items-center justify-center p-8 space-y-6">
    <FormulaDisplay />
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
      <Card class="md:col-span-1">
        <CardHeader>
          <CardTitle>Calculadora Binomial</CardTitle>
        </CardHeader>
        <CardContent>
          <BinomialForm @calculate="handleCalculate" />
        </CardContent>
        <CardFooter>
          <Button form="binomial-form" type="submit">Calcular</Button>
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
            <BinomialChart
              v-if="apiResult && apiResult.graph_data"
              :chart-data="{
                ...apiResult.graph_data,
                datasets: apiResult.graph_data.datasets.map(ds => {
                  const xArr = Array.isArray(ds.x) ? ds.x : [];
                  let yArr = [];
                  if (Array.isArray(ds.y)) {
                    yArr = ds.y;
                  } else if (typeof ds.y === 'object' && ds.y !== null) {
                    yArr = xArr.map(xi => ds.y[xi] ?? 0);
                  }
                  return {
                    label: ds.label || 'Datos',
                    type: ds.type || 'bar',
                    x: xArr,
                    y: yArr,
                    backgroundColor: ds.backgroundColor || 'skyblue',
                    borderColor: ds.borderColor || 'skyblue',
                  };
                })
              }"
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
