<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const props = defineProps({
  chartData: { type: Object, required: true },
})

const dataForRender = computed(() => {
  const pdfData = props.chartData.datasets[0]
  const cdfData = props.chartData.datasets[1]
  const marker = props.chartData.marker

  return {
    labels: pdfData.x,
    datasets: [
      {
        type: 'line',
        label: pdfData.label,
        data: pdfData.y,
        borderColor: '#3b82f6',
        yAxisID: 'y-pdf',
        pointRadius: 0,
        tension: 0.1,
      },
      {
        type: 'line',
        label: cdfData.label,
        data: cdfData.y,
        borderColor: '#f97316',
        yAxisID: 'y-cdf',
        pointRadius: 0,
        tension: 0.1,
      },
      // Marcador en la curva PDF
      {
        type: 'scatter',
        label: 'Punto X (PDF)',
        data: [{ x: marker.x, y: marker.pdf }], // CAMBIO: marker.x
        backgroundColor: '#ef4444',
        yAxisID: 'y-pdf',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      // Marcador en la curva CDF
      {
        type: 'scatter',
        label: 'Punto X (CDF)',
        data: [{ x: marker.x, y: marker.cdf }], // CAMBIO: marker.x
        backgroundColor: '#ef4444',
        yAxisID: 'y-cdf',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    title: { display: true, text: props.chartData.title },
    tooltip: {
      callbacks: {
        label: function (context) {
          if (context.dataset.type === 'scatter') {
            return `${context.dataset.label}: (${context.raw.x}, ${context.raw.y.toFixed(4)})`
          }
          return `${context.dataset.label}: ${context.formattedValue}`
        },
      },
    },
  },
  scales: {
    x: {
      type: 'linear',
      title: { display: true, text: 'Valor (x)' }, // CAMBIO: Etiqueta más genérica
    },
    'y-pdf': {
      type: 'linear',
      position: 'left',
      title: { display: true, text: 'Densidad de Probabilidad (PDF)' },
    },
    'y-cdf': {
      type: 'linear',
      position: 'right',
      min: 0,
      max: 1,
      title: { display: true, text: 'Probabilidad Acumulada (CDF)' },
      grid: { drawOnChartArea: false },
    },
  },
}))
</script>

<template>
  <div class="relative h-96">
    <Line v-if="chartData && chartData.datasets" :data="dataForRender" :options="chartOptions" />
  </div>
</template>
