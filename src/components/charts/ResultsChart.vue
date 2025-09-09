<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { computed } from 'vue'

use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, GridComponent])

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
})

const chartOptions = computed(() => {
  // ECharts necesita que los datos se inviertan para un gráfico horizontal
  // donde la barra más grande está arriba.
  const labels = [...props.chartData.labels].reverse()
  const data = [...props.chartData.data].reverse()

  return {
    title: {
      text: props.chartData.title || 'Frecuencia de Resultados',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true, // Asegura que las etiquetas largas quepan
    },
    xAxis: {
      type: 'value',
      name: 'Frecuencia',
      nameLocation: 'middle',
      nameGap: 25,
    },
    yAxis: {
      type: 'category',
      data: labels,
      name: 'Resultados',
    },
    series: [
      {
        name: 'Frecuencia',
        type: 'bar',
        data: data,
        label: {
          show: true,
          position: 'right', // Muestra el valor a la derecha de la barra
          color: '#333',
        },
      },
    ],
  }
})
</script>

<template>
  <v-chart class="chart" :option="chartOptions" autoresize />
</template>

<style scoped>
.chart {
  height: 500px;
}
</style>
