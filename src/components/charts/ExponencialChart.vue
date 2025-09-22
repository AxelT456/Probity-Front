<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { computed } from 'vue'
import * as ecStat from 'echarts-stat'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
])

const props = defineProps({
  chartData: { type: Object, required: true },
})

const chartOptions = computed(() => {
  const simulationData = props.chartData.simulation_data
  const pdfCurve = props.chartData.theoretical_curves[0]

  // Prepara los datos para el histograma
  const bins = ecStat.histogram(simulationData)
  const histogramData = bins.data.map((item) => [item[0], item[1]])

  // Prepara los datos para la curva PDF
  const pdfData = pdfCurve.x.map((xVal, index) => [xVal, pdfCurve.y[index]])

  return {
    title: {
      text: props.chartData.title,
      left: 'center',
    },
    legend: {
      top: 'bottom',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      name: 'Valor',
    },
    yAxis: {
      type: 'value',
      name: 'Densidad / Frecuencia',
    },
    series: [
      {
        name: 'Histograma (Simulación)',
        type: 'bar',
        barWidth: '98%',
        data: histogramData,
        itemStyle: {
          color: 'rgba(54, 162, 235, 0.6)', // Azul claro con transparencia
        },
      },
      {
        name: pdfCurve.label,
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: pdfData,
        itemStyle: {
          color: '#ef4444', // Rojo
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
