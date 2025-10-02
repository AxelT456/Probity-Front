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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  chartData: { type: Object, required: true },
  chartOptions: { type: Object, default: () => ({}) },
})

const dataForRender = computed(() => ({
  labels: props.chartData.labels,
  datasets: [
    {
      backgroundColor: '#60a5fa',
      ...props.chartData.datasets[0],
    },
  ],
}))

const optionsForRender = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  ...props.chartOptions,
}))
</script>

<template>
  <div class="relative h-96">
    <Bar :data="dataForRender" :options="optionsForRender" />
  </div>
</template>
