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
  const pmfData = props.chartData.datasets[0]
  const cdfData = props.chartData.datasets[1]
  const datasets = []
  if (pmfData) {
    datasets.push({
      type: pmfData.type || 'bar',
      label: pmfData.label || 'Datos',
      data: pmfData.y,
      backgroundColor: pmfData.backgroundColor || 'skyblue',
      borderColor: pmfData.borderColor || 'skyblue',
      yAxisID: 'y-pmf',
    })
  }
  if (cdfData && cdfData.y) {
    datasets.push({
      type: cdfData.type || 'line',
      label: cdfData.label || 'CDF',
      data: cdfData.y,
      backgroundColor: cdfData.backgroundColor || 'red',
      borderColor: cdfData.borderColor || 'red',
      yAxisID: 'y-cdf',
    })
  }
  return {
    labels: pmfData?.x || [],
    datasets,
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
