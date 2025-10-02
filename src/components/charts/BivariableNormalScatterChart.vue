<script setup>
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'
import { Scatter } from 'vue-chartjs'
import { ref, watch } from 'vue'

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  zoomPlugin
)

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  }
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context) => {
          return `(${context.parsed.x.toFixed(3)}, ${context.parsed.y.toFixed(3)})`
        }
      }
    },
    title: {
      display: true,
      text: 'Nube de Puntos de la Simulación'
    },
    zoom: {
      pan: {
        enabled: true,
        mode: 'xy'
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true
        },
        mode: 'xy',
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Variable X'
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Variable Y'
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    }
  },
  interaction: {
    mode: 'nearest',
    intersect: true,
  }
}

const scatterData = ref({
  datasets: []
})

watch(() => props.chartData, (newData) => {
  if (newData?.scatter_2d) {
    const { x, y, title } = newData.scatter_2d

    // Crear array de puntos a partir de los arrays x e y
    const points = x.map((xVal, index) => ({
      x: xVal,
      y: y[index]
    }))

    scatterData.value = {
      datasets: [{
        label: 'Puntos simulados',
        data: points,
        backgroundColor: 'rgba(75, 192, 192, 0.3)', // Más transparente para ver densidad
        borderColor: 'rgba(75, 192, 192, 0.5)',
        borderWidth: 1,
        pointRadius: 2, // Puntos más pequeños
        pointHoverRadius: 5
      }]
    }

    // Actualizar el título si existe
    if (title && options.plugins.title) {
      options.plugins.title.text = title
    }
  }
}, { deep: true, immediate: true })
</script>

<template>
  <div class="h-full relative">
    <Scatter :data="scatterData" :options="options" />
  </div>
</template>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
