<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { computed } from 'vue'

use([
  CanvasRenderer,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
])

const props = defineProps({
  chartData: { type: Object, required: true },
})

const chartOptions = computed(() => {
  // Validación para asegurar que los datos son arrays
  if (!props.chartData || !Array.isArray(props.chartData.x) || !Array.isArray(props.chartData.y)) {
    return { title: { text: 'Esperando datos válidos para el gráfico...' } }
  }

  // CORRECCIÓN: Accede directamente a las props 'x' e 'y'
  const scatterData = props.chartData.x.map((xVal, index) => {
    return [xVal, props.chartData.y[index]]
  })

  return {
    title: {
      text: props.chartData.title,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: 'Punto: ({c})',
    },
    grid: {
      left: '3%',
      right: '7%',
      bottom: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      name: 'Valor X',
      nameLocation: 'middle',
      nameGap: 30,
    },
    yAxis: {
      type: 'value',
      name: 'Valor Y',
      nameLocation: 'middle',
      nameGap: 40,
    },
    dataZoom: [
      { type: 'slider', show: true, xAxisIndex: [0], start: 0, end: 100 },
      { type: 'slider', show: true, yAxisIndex: [0], start: 0, end: 100 },
    ],
    series: [
      {
        name: 'Puntos de la Simulación',
        type: 'scatter',
        symbolSize: 4,
        data: scatterData,
        itemStyle: {
          opacity: 0.5,
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
