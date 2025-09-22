<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import ExponencialForm from '@/components/formulas/ExponencialForm.vue'
import ExponencialChart from '@/components/charts/ExponencialChart.vue'
import { calculateExponencial } from '@/services/formulasAPI'

const apiResult = ref(null)
const isLoading = ref(false)
const apiError = ref(null)

async function handleCalculate(formData) {
  isLoading.value = true
  apiResult.value = null
  apiError.value = null
  try {
    const response = await calculateExponencial(formData)
    apiResult.value = response.data
  } catch (error) {
    apiError.value = error
    console.error('Error al contactar la API:', error)
  } finally {
    isLoading.value = false
  }
}

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
  <div class="container mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-3xl font-bold">Distribución Exponencial</h1>
      <p class="text-muted-foreground">
        Compara una simulación de datos exponenciales con su PDF teórica.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Parámetros</CardTitle>
          </CardHeader>
          <CardContent>
            <ExponencialForm @calculate="handleCalculate" />
          </CardContent>
          <CardFooter>
            <Button form="exponencial-form" type="submit" class="w-full"
              >Ejecutar Simulación</Button
            >
          </CardFooter>
        </Card>

        <Card v-if="apiResult || isLoading || apiError">
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4 text-sm">
            <p v-if="isLoading" class="text-center">Ejecutando simulación...</p>
            <p v-if="apiError" class="text-center text-red-500">Error en la simulación.</p>
            <div v-if="apiResult" class="space-y-2">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Media de la Simulación:</span>
                <span class="font-mono font-semibold">{{
                  apiResult.result.mean_of_simulation.toFixed(4)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Media Teórica (1/λ):</span>
                <span class="font-mono font-semibold">{{
                  apiResult.result.theoretical_mean.toFixed(4)
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
            <div v-if="isLoading" class="text-center h-96 flex items-center justify-center">
              Generando gráfico... ⏳
            </div>
            <div
              v-if="apiError"
              class="text-center text-red-500 h-96 flex items-center justify-center"
            >
              Error al cargar los datos.
            </div>
            <ExponencialChart v-if="apiResult" :chart-data="apiResult.graph_data" />
            <div v-else class="text-center text-gray-500 h-96 flex items-center justify-center">
              <p>Configura y ejecuta la simulación para generar el gráfico.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
<!-- Sección Informativa sobre Distribución Exponencial -->
<div class="mt-8 bg-white rounded-xl border border-stone-200 card-shadow overflow-hidden">
  <div class="bg-stone-800 text-white px-6 py-4">
    <h2 class="text-xl font-semibold flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Acerca de la Distribución Exponencial
    </h2>
  </div>

  <div class="p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          ¿Qué es la Distribución Exponencial?
        </h3>
        <p class="text-stone-600 mb-4">
          La distribución exponencial modela el <strong>tiempo entre eventos</strong> en un proceso de Poisson,
          donde los eventos ocurren de forma continua e independiente a una tasa constante.
          Es una distribución continua con la propiedad de <strong>falta de memoria</strong>,
          lo que significa que la probabilidad de que un evento ocurra en el futuro no depende
          de cuánto tiempo haya pasado desde el último evento.
        </p>

        <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Fórmula
        </h3>
        <div class="bg-stone-100 p-4 rounded-lg mb-4">
          <p class="text-stone-800 font-mono text-center text-sm">
            f(x; λ) = λe^{-λx} &nbsp;&nbsp;para x ≥ 0
          </p>
        </div>
        <p class="text-stone-600 text-sm">
          Donde: <strong>λ</strong> es el parámetro de tasa (λ > 0), <strong>e</strong> es la base del logaritmo natural,
          y <strong>x</strong> representa el tiempo entre eventos. La media es 1/λ y la varianza es 1/λ².
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
            Ingeniería: Tiempo entre fallas de componentes electrónicos
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Telecomunicaciones: Tiempo entre llegadas de llamadas
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Biología: Tiempo entre mutaciones genéticas
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Finanzas: Modelado del tiempo entre transacciones bursátiles
          </li>
        </ul>

        <h3 class="text-lg font-semibold text-stone-800 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
          Interpretación de Resultados
        </h3>
        <p class="text-stone-600">
          El gráfico muestra la <strong>función de densidad de probabilidad (PDF)</strong> teórica junto con
          un histograma de datos simulados. Una buena coincidencia entre la curva teórica y el histograma
          indica que la simulación representa adecuadamente la distribución exponencial.
          La distribución es <strong>asimétrica hacia la derecha</strong>, con la mayor densidad cerca de cero
          que disminuye exponencialmente a medida que aumenta x.
        </p>
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
            Asistente de Distribución de Exponencial
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
