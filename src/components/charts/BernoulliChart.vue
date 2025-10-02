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
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
})

// Adaptamos el gráfico a la nueva estructura de datos de la API
const dataForRender = computed(() => ({
  labels: props.chartData.categories, // <--- CAMBIO: Usamos 'categories' en lugar de 'labels'
  datasets: [
    {
      label: 'Resultados Observados',
      backgroundColor: ['#60a5fa', '#f87171'], // Azul para éxitos, rojo para fracasos
      data: props.chartData.dataset, // <--- CAMBIO: Usamos 'dataset' en lugar de 'probabilities'
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: props.chartData.title,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Resultado de la Simulación', // Etiqueta fija para claridad
      },
    },
    y: {
      title: {
        display: true,
        text: 'Número de Ocurrencias', // El eje Y ahora muestra conteos
      },
      beginAtZero: true,
      ticks: {
        // Asegura que solo se muestren números enteros en el eje Y
        stepSize: 1,
      },
    },
  },
}))
</script>

<template>
  <div class="relative h-96">
    <!-- El v-if ahora busca 'categories' para asegurarse de que los datos son correctos -->
    <Bar v-if="chartData && chartData.categories" :data="dataForRender" :options="chartOptions" />
  </div>
  =========
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
    } from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

    const props = defineProps({ chartData: { type: Object, required: true } })

    const chartDataForRender = computed(() => {
      const pmfData = props.chartData.datasets[0]
      return {
        labels: pmfData.x,
        datasets: [
          {
            type: 'bar',
            label: pmfData.label,
            data: pmfData.y,
            backgroundColor: 'lightgreen',
            borderColor: 'green',
          },
        ],
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
    watch(
      () => props.chartData,
      () => {
        if (chartRef.value) chartRef.value.update()
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
    >>>>>>>>> Temporary merge branch 2
  </template>
</template>
