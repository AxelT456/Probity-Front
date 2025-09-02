<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js'

// Registramos todos los elementos necesarios de Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
)

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
})

const chartDataForRender = computed(() => {
  const pmfData = props.chartData.datasets[0] // Datos de las barras (PMF)
  const cdfData = props.chartData.datasets[1] // Datos de la línea (CDF)

  return {
    labels: pmfData.x, // Eje X (Número de Éxitos)
    datasets: [
      {
        type: 'bar', // Tipo de gráfico: barras
        label: pmfData.label,
        data: pmfData.y,
        backgroundColor: 'skyblue',
        borderColor: 'skyblue',
        yAxisID: 'y-pmf', // Asignamos al eje Y izquierdo
      },
      {
        type: 'line', // Tipo de gráfico: línea
        label: cdfData.label,
        data: cdfData.y,
        backgroundColor: 'red',
        borderColor: 'red',
        yAxisID: 'y-cdf', // Asignamos al eje Y derecho
      },
    ],
  }
})

// 'chartOptions' configura el aspecto y comportamiento del gráfico.
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: props.chartData.title, // Título dinámico desde la API
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: props.chartData.x_label, // Etiqueta del eje X
      },
    },
    'y-pmf': {
      // Configuración del eje Y izquierdo (PMF)
      type: 'linear',
      position: 'left',
      title: {
        display: true,
        text: props.chartData.y_label,
      },
    },
    'y-cdf': {
      // Configuración del eje Y derecho (CDF)
      type: 'linear',
      position: 'right',
      title: {
        display: true,
        text: 'Probabilidad Acumulada',
      },
      grid: {
        drawOnChartArea: false, // Evita que la cuadrícula se superponga
      },
    },
  },
}))

const chartRef = ref(null)

watch(
  () => props.chartData,
  () => {
    if (chartRef.value) {
      // Forzamos la actualización si es necesario
      chartRef.value.update()
    }
  },
)
</script>

<template>
  <div class="relative h-96">
    <Bar
      v-if="chartData && chartData.datasets"
      :data="chartDataForRender"
      :options="chartOptions"
      ref="chartRef"
    />
  </div>
</template>
