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
    console.log("Respuesta cruda de la API:", response.data)
    apiResult.value = response.data
  } catch (error) {
    apiError.value = error
    console.error('Error al contactar la API:', error)
  } finally {
    isLoading.value = false
  }
}

// Helpers para evitar errores
function safeNumber(value) {
  return typeof value === 'number' ? value : 0
}

function safeFormat(value, decimals = 3) {
  return typeof value === 'number' ? value.toFixed(decimals) : 'N/A'
}

function safeDivide(num, den, decimals = 3) {
  const n = safeNumber(num)
  const d = safeNumber(den)
  return d > 0 ? (n / d).toFixed(decimals) : 'N/A'
}

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Distribución de Resultados de Bernoulli',
      font: { size: 18, weight: 'bold' },
      color: '#292524'
    },
    legend: {
      position: 'top',
      labels: {
        font: { size: 14 },
        color: '#44403c'
      }
    },
    tooltip: {
      backgroundColor: '#1c1917',
      titleFont: { size: 14 },
      bodyFont: { size: 14 },
      padding: 12,
      boxPadding: 6
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Resultado',
        font: { size: 14, weight: 'bold' },
        color: '#44403c'
      },
      grid: { color: '#e7e5e4' },
      ticks: { color: '#57534e', font: { size: 13 } }
    },
    y: {
      title: {
        display: true,
        text: 'Frecuencia',
        font: { size: 14, weight: 'bold' },
        color: '#44403c'
      },
      grid: { color: '#e7e5e4' },
      ticks: { color: '#57534e', font: { size: 13 } },
      beginAtZero: true
    },
  },
})

// Chatbot functionality
const message = ref("")
const messages = ref([])

const sendMessage = async () => {
  if (!message.value.trim()) return

  // Agregar mensaje del usuario
  messages.value.push({ sender: "user", text: message.value })

  // Guardar temporalmente el texto
  const userMessage = message.value
  message.value = ""

  try {
    const response = await fetch("http://localhost:8000/api/chat/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    })

    const data = await response.json()

    // Agregar respuesta del chatbot
    messages.value.push({
      sender: "bot",
      text: data.reply || "Error en la respuesta",
    })
  } catch (error) {
    console.error(error)
    messages.value.push({
      sender: "bot",
      text: "Error al conectar con el servidor.",
    })
  }
}
</script>

<template>
  <div class="min-h-screen p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-stone-800 mb-2">Distribución de Bernoulli</h1>
        <p class="text-stone-600 max-w-2xl mx-auto">
          Simula múltiples ensayos independientes con probabilidad de éxito
          <span class="font-medium text-stone-800">p</span> y visualiza la distribución de resultados
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Panel lateral -->
        <div class="lg:col-span-1 space-y-6">
          <Card class="bg-white border-stone-200 card-shadow-lg">
            <CardHeader class="pb-4 border-b border-stone-100">
              <CardTitle class="text-stone-800">Parámetros de Simulación</CardTitle>
            </CardHeader>
            <CardContent class="pt-6">
              <BernoulliForm @calculate="handleCalculate" />
            </CardContent>
            <CardFooter class="pt-4 border-t border-stone-100">
              <Button
                form="bernoulli-form"
                type="submit"
                class="w-full bg-stone-800 hover:bg-stone-700 text-white"
                :disabled="isLoading"
              >
                <span v-if="!isLoading">Ejecutar Simulación</span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Simulando...
                </span>
              </Button>
            </CardFooter>
          </Card>

          <!-- Resultados -->
          <Card v-if="apiResult || isLoading || apiError" class="bg-white border-stone-200 card-shadow">
            <CardHeader class="pb-4 border-b border-stone-100">
              <CardTitle class="text-stone-800">Resumen Estadístico</CardTitle>
            </CardHeader>
            <CardContent class="pt-6">
              <div v-if="isLoading" class="space-y-4">Cargando...</div>

              <div v-else-if="apiError" class="text-center py-4 px-4 rounded-lg bg-stone-50 border border-stone-200">
                <p class="text-stone-600 text-sm">Error en la simulación</p>
              </div>

              <div v-else-if="apiResult?.result?.data" class="space-y-5">
                <div class="flex justify-between items-center p-3 bg-stone-50 rounded-lg">
                  <div>
                    <p class="text-sm font-medium text-stone-700">Total de ensayos</p>
                    <p class="text-xs text-stone-500">Número de simulaciones</p>
                  </div>
                  <span class="text-xl font-bold text-stone-800 bg-white py-1 px-3 rounded-md border border-stone-200">
                    {{ safeNumber(apiResult.result.data.Exitos) + safeNumber(apiResult.result.data.Fracasos) }}
                  </span>
                </div>

                <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <div>
                    <p class="text-sm font-medium text-green-800">Éxitos</p>
                    <p class="text-xs text-green-600">
                      Probabilidad: {{ safeDivide(apiResult.result.data.Exitos, safeNumber(apiResult.result.data.Exitos) + safeNumber(apiResult.result.data.Fracasos)) }}
                    </p>
                  </div>
                  <span class="text-xl font-bold text-green-700 bg-white py-1 px-3 rounded-md border border-green-200">
                    {{ safeNumber(apiResult.result.data.Exitos) }}
                  </span>
                </div>

                <div class="flex justify-between items-center p-3 bg-rose-50 rounded-lg border border-rose-100">
                  <div>
                    <p class="text-sm font-medium text-rose-800">Fracasos</p>
                    <p class="text-xs text-rose-600">
                      Probabilidad: {{ safeDivide(apiResult.result.data.Fracasos, safeNumber(apiResult.result.data.Exitos) + safeNumber(apiResult.result.data.Fracasos)) }}
                    </p>
                  </div>
                  <span class="text-xl font-bold text-rose-700 bg-white py-1 px-3 rounded-md border border-rose-200">
                    {{ safeNumber(apiResult.result.data.Fracasos) }}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Gráfico -->
        <div class="lg:col-span-3">
          <Card class="h-full bg-white border-stone-200 card-shadow-lg">
            <CardHeader class="pb-4 border-b border-stone-100">
              <div class="flex justify-between items-center">
                <CardTitle class="text-stone-800">Visualización de Resultados</CardTitle>
                <div v-if="apiResult?.result?.data" class="text-sm text-stone-600 bg-stone-100 px-3 py-1 rounded-full">
                  Probabilidad teórica:
                  {{ safeDivide(apiResult.result.data.Exitos, safeNumber(apiResult.result.data.Exitos) + safeNumber(apiResult.result.data.Fracasos)) }}
                </div>
              </div>
            </CardHeader>
            <CardContent class="pt-6 h-96">

<BarChart
  v-if="apiResult?.graph_data"
  :chart-data="{
    labels: apiResult.graph_data.labels ?? [],   // ✅ etiquetas de la API
    datasets: [
      {
        label: 'Probabilidad teórica',
        data: apiResult.graph_data.probabilities ?? [], // ✅ valores de la API
        backgroundColor: ['#65a30d', '#e11d48'],
        borderColor: ['#65a30d', '#e11d48'],
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: ['#4d7c0f', '#be123c'],
        hoverBorderColor: ['#3f6212', '#9f1239'],
      }
    ],
  }"
  :chart-options="{
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        title: {
          ...chartOptions.scales.y.title,
          text: apiResult.graph_data.y_label || 'Probabilidad' // ✅ etiqueta correcta
        },
        beginAtZero: true,
        suggestedMax: 1 // ✅ para que se vea entre 0 y 1
      },
      x: {
        ...chartOptions.scales.x,
        title: {
          ...chartOptions.scales.x.title,
          text: apiResult.graph_data.x_label || 'Resultado'
        }
      }
    }
  }"
/>

              <div v-else class="h-full flex flex-col items-center justify-center p-8 text-center bg-stone-50 rounded-lg border-2 border-dashed border-stone-200">
                <h3 class="font-medium text-stone-600 mb-1">Esperando datos de simulación</h3>
                <p class="text-stone-400 text-sm">Configura los parámetros y ejecuta la simulación para visualizar los resultados.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Sección Informativa sobre Distribución de Bernoulli -->
      <div class="mt-8 bg-white rounded-xl border border-stone-200 card-shadow overflow-hidden">
        <div class="bg-stone-800 text-white px-6 py-4">
          <h2 class="text-xl font-semibold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Acerca de la Distribución de Bernoulli
          </h2>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                ¿Qué es la Distribución de Bernoulli?
              </h3>
              <p class="text-stone-600 mb-4">
                La distribución de Bernoulli es un modelo de probabilidad discreta que representa un experimento aleatorio con <strong>solo dos resultados posibles</strong>:
                éxito (1) o fracaso (0). Es la base de la distribución binomial y se utiliza para modelar eventos dicotómicos donde la probabilidad de éxito se denota como <strong>p</strong>.
              </p>

              <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Fórmula
              </h3>
              <div class="bg-stone-100 p-4 rounded-lg mb-4">
                <p class="text-stone-800 font-mono text-center">
                  P(X = x) = p<sup>x</sup> · (1-p)<sup>1-x</sup> &nbsp;&nbsp;para x ∈ {0, 1}
                </p>
              </div>
              <p class="text-stone-600 text-sm">
                Donde: <strong>p</strong> es la probabilidad de éxito, <strong>x=1</strong> representa éxito y <strong>x=0</strong> representa fracaso.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 极 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Aplicaciones Prácticas
              </h3>
              <ul class="text-stone-600 space-y-2 mb-4">
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Lanzamiento de moneda: Cara o cruz
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.极 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Encuestas binarias: Sí/No, A favor/En contra
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 极 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Control de calidad: Producto defectuoso o no defectuoso
                </li>
                <li class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin极="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Medicina: Paciente responde o no responde a un tratamiento
                </li>
              </ul>

              <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/s极" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2极6a2 2 0 002 2h2极4l.586-.586z" />
                </svg>
                Interpretación de Resultados
              </h3>
              <p class="text-stone-600">
                En la gráfica de barras, la <strong>altura de cada barra</strong> representa la probabilidad de cada resultado.
                La <strong>barra de éxito (1)</strong> muestra la probabilidad <strong>p</strong>, mientras que la
                <strong>barra de fracaso (0)</strong> muestra la probabilidad <strong>1-p</strong>.
                La suma de ambas probabilidades siempre es igual a 1.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Chatbot para Bernoulli -->
      <div class="mt-8 bg-white rounded-xl border border-stone-200 card-shadow overflow-hidden">
        <div class="bg-stone-800 text-white px-6 py-4">
          <h2 class="text-xl font-semibold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M极6 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Asistente de Distribución de Bernoulli
          </h2>
        </div>

        <div class="p-4">
          <!-- Historial de mensajes -->
          <div class="h-64 overflow-y-auto mb-4 space-y-3 p-2 bg-stone-50 rounded-lg">
            <div v-if="messages.length === 0" class="text-center text-stone-500 py-8">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2极8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p>Envía un mensaje para comenzar la conversación</p>
            </div>

            <div
              v-for="(msg, index) in messages"
              :key="index"
              :class="msg.sender === 'user' ? 'flex justify-end' : 'flex justify-start'"
            >
              <div
                :class="[
                  'max-w-[80%] rounded-lg px-4 py-2',
                  msg.sender === 'user'
                    ? 'bg-stone-800 text-white'
                    : 'bg-stone-100 text-stone-800 border border-stone-200'
                ]"
              >
                <p class="whitespace-pre-wrap">{{ msg.text }}</p>
                <p class="text-xs mt-1 opacity-70">
                  {{ msg.sender === 'user' ? 'Tú' : 'Asistente' }} •
                  {{ new Date().toLocaleTimeString() }}
                </p>
              </div>
            </div>
          </div>

          <!-- Área de entrada -->
          <div class="flex items-center gap-2">
            <input
              v-model="message"
              type="text"
              placeholder="Escribe tu pregunta sobre distribución de Bernoulli..."
              class="flex-grow px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
              @keyup.enter="sendMessage"
            />
            <button
              @click="sendMessage"
              :disabled="!message.trim()"
              class="bg-stone-800 text-white px-4 py-3 rounded-lg hover:bg-stone-700 transition disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Enviar
            </button>
          </div>

          <!-- Ejemplos de preguntas -->
          <div class="mt-3">
            <p class="text-sm text-stone-600 mb-2">Ejemplos de preguntas:</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="(example, index) in [
                  '¿Qué es la distribución de Bernoulli?',
                  '¿Cómo interpreto los resultados de Bernoulli?',
                  '¿Cuáles son las aplicaciones prácticas de Bernoulli?'
                ]"
                :key="index"
                @click="message = example; sendMessage()"
                class="text-xs bg-stone-100 text-stone-700 px-3 py-1 rounded-full hover:bg-stone-200 transition border border-stone-200"
              >
                {{ example }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}
.card-shadow-lg {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 极.08), 0 5px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
