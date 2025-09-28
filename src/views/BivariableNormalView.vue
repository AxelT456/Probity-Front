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

<div class="mt-8 bg-white rounded-xl border border-stone-200 card-shadow overflow-hidden">
            <div class="bg-stone-800 text-white px-6 py-4">
                <h2 class="text-xl font-semibold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Acerca de la Distribución Normal Bivariada
                </h2>
            </div>

            <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            ¿Qué es la Distribución Normal Bivariada?
                        </h3>
                        <p class="text-stone-600 mb-4">
                            La distribución normal bivariada es una generalización de la distribución normal para
                            <strong>dos variables aleatorias</strong>. Describe la distribución conjunta de dos variables
                            que siguen individualmente distribuciones normales y que pueden estar correlacionadas entre sí.
                        </p>

                        <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Fórmula
                        </h3>
                        <div class="bg-stone-100 p-4 rounded-lg mb-4">
                            <p class="text-stone-800 font-mono text-center text-sm">
                                f(x,y) = [1/(2πσ₁σ₂√(1-ρ²))] · exp{ -1/[2(1-ρ²)] · [ (x-μ₁)²/σ₁² - 2ρ(x-μ₁)(y-μ₂)/(σ₁σ₂) + (y-μ₂)²/σ₂² ] }
                            </p>
                        </div>
                        <p class="text-stone-600 text-sm">
                            Donde: <strong>μ₁, μ₂</strong> son las medias, <strong>σ₁, σ₂</strong> son las desviaciones estándar,
                            y <strong>ρ</strong> es el coeficiente de correlación entre las dos variables (-1 ≤ ρ ≤ 1).
                        </p>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Aplicaciones Prácticas
                        </h3>
                        <ul class="text-stone-600 space-y-2 mb-4">
                            <li class="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Finanzas: Modelado conjunto de rendimientos de activos correlacionados
                            </li>
                            <li class="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Medicina: Relación entre altura y peso en una población
                            </li>
                            <li class="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Ciencias Sociales: Estudio de la relación entre ingresos y nivel educativo
                            </li>
                            <li class="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Ingeniería: Control de calidad de dos dimensiones relacionadas en un producto
                            </li>
                        </ul>

                        <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                            Interpretación de Resultados
                        </h3>
                        <p class="text-stone-600">
                            La distribución normal bivariada se representa como una <strong>superficie en 3D</strong> o
                            <strong>contornos en 2D</strong>. La forma de la distribución depende del coeficiente de correlación ρ:
                            cuando ρ=0, la distribución es circular; cuando |ρ|≈1, se vuelve elíptica y alargada.
                            La altura de la superficie indica la <strong>densidad de probabilidad</strong> conjunta.
                        </p>
                    </div>
                </div>
            </div>
        </div>

  </div>

</template>
