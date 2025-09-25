<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import BivariableNormalForm from '@/components/formulas/BivariableNormalForm.vue'
import BivariableNormal3DChart from '@/components/charts/BivariableNormal3DChart.vue'
import { calculateBivariateNormal } from '@/services/formulasAPI'

const apiResult = ref(null)
const isLoading = ref(false)
const apiError = ref(null)

async function handleCalculate(formData) {
  isLoading.value = true
  apiResult.value = null
  apiError.value = null
  try {
    const response = await calculateBivariateNormal(formData)
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
      <h1 class="text-3xl font-bold">Distribución Normal Bivariada</h1>
      <p class="text-muted-foreground">
        Visualiza la superficie de densidad de probabilidad para dos variables correlacionadas.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Parámetros de la Distribución</CardTitle>
          </CardHeader>
          <CardContent>
            <!-- Se usa el nombre de componente correcto aquí -->
            <BivariableNormalForm @calculate="handleCalculate" />
          </CardContent>
          <CardFooter>
            <Button form="bivariate-form" type="submit" class="w-full">Generar Gráfico</Button>
          </CardFooter>
        </Card>
      </div>

      <div class="md:col-span-2">
        <Card class="h-full">
          <CardHeader>
            <CardTitle>Visualización de Densidad (3D)</CardTitle>
          </CardHeader>
          <CardContent class="pt-6">
            <div v-if="isLoading" class="text-center h-[500px] flex items-center justify-center">
              Generando superficie 3D... ⏳
            </div>
            <div
              v-else-if="apiError"
              class="text-center text-red-500 h-[500px] flex items-center justify-center"
            >
              Error al cargar los datos.
            </div>
            <!-- Y se usa el nombre de componente correcto aquí también -->
            <BivariableNormal3DChart v-else-if="apiResult" :chart-data="apiResult.graph_data" />
            <div
              v-else
              class="text-center text-gray-500 h-[500px] flex items-center justify-center"
            >
              <p>Configura los parámetros y presiona "Generar Gráfico".</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
