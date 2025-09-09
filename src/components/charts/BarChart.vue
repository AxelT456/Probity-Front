<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

// Registra los elementos necesarios de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  // Objeto con los datos del gráfico (labels, datasets)
  chartData: {
    type: Object,
    required: true,
  },
  // Objeto con las opciones de configuración del gráfico
  chartOptions: {
    type: Object,
    default: () => ({}),
  },
})

// Combina los datos recibidos para que Chart.js los entienda
const dataForRender = computed(() => ({
  labels: props.chartData.labels,
  datasets: [
    {
      backgroundColor: '#60a5fa', // Un color azul por defecto
      ...props.chartData.datasets[0], // Permite que los datos de la vista anulen el color por defecto
    },
  ],
}))

// Combina las opciones base con las opciones personalizadas de la vista
const optionsForRender = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Oculta la leyenda por defecto
    },
  },
  ...props.chartOptions, // Permite que la vista anule las opciones por defecto
}))
</script>

<template>
  <div class="relative h-96">
    <Bar :data="dataForRender" :options="optionsForRender" />
  </div>
</template>
