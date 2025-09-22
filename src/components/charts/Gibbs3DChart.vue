<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
// La importación de componentes 3D se elimina, ya que 'echarts-gl' se encarga de registrarlos.
import { TooltipComponent, VisualMapComponent, TitleComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import 'echarts-gl' // Esta línea registra todos los componentes 3D necesarios.
import { computed } from 'vue'

// Se elimina Grid3DComponent de la lista de 'use'.
use([CanvasRenderer, TooltipComponent, VisualMapComponent, TitleComponent])

const props = defineProps({
  chartData: { type: Object, required: true },
})

const chartOptions = computed(() => {
  // Validación para evitar errores si los datos no están listos
  if (!props.chartData || !props.chartData.data) {
    return { title: { text: 'Esperando datos para el gráfico 3D...' } }
  }

  const data = props.chartData.data
  const maxValue = data.length > 0 ? Math.max(...data.map((item) => item[2])) : 0

  return {
    title: {
      text: props.chartData.title,
      left: 'center',
    },
    tooltip: {},
    visualMap: {
      max: maxValue,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026',
        ],
      },
    },
    xAxis3D: {
      type: 'category',
      data: props.chartData.x_bins,
      name: 'X',
    },
    yAxis3D: {
      type: 'category',
      data: props.chartData.y_bins,
      name: 'Y',
    },
    zAxis3D: {
      type: 'value',
      name: 'Frecuencia',
    },
    grid3D: {
      boxWidth: 100,
      boxDepth: 100,
      viewControl: {
        // Permite al usuario rotar y hacer zoom en el gráfico
      },
      light: {
        main: { intensity: 1.2 },
        ambient: { intensity: 0.3 },
      },
    },
    series: [
      {
        type: 'bar3D', // ECharts reconoce 'bar3D' gracias a la importación de 'echarts-gl'
        data: data.map((item) => ({ value: [item[0], item[1], item[2]] })),
        shading: 'lambert',
        emphasis: {
          label: {
            fontSize: 20,
            color: '#900',
          },
          itemStyle: {
            color: '#900',
          },
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
  height: 600px; /* Damos más altura a los gráficos 3D */
}
</style>
