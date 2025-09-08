<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({ chartData: { type: Object, required: true } })

const chartDataForRender = computed(() => {
  // Espera que la API devuelva un objeto con labels y datasets
  return {
    labels: props.chartData.labels,
    datasets: props.chartData.datasets,
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: props.chartData.title },
  },
  scales: {
    x: { title: { display: true, text: props.chartData.x_label } },
    y: { beginAtZero: true, title: { display: true, text: props.chartData.y_label } },
  },
}))

const chartRef = ref(null)
watch(() => props.chartData, () => { if (chartRef.value) chartRef.value.update() })
</script>

<template>
  <div class="relative h-96">
    <Bar v-if="chartData && chartData.datasets" :data="chartDataForRender" :options="chartOptions" ref="chartRef"/>
  </div>
</template>
