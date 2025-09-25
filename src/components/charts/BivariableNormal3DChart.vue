<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
// La importación de SurfaceChart se elimina, ya que 'echarts-gl' la registra.
import { VisualMapComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { Grid3DComponent } from 'echarts-gl/components'
import VChart from 'vue-echarts'
import 'echarts-gl'
import { computed } from 'vue'

// Se elimina SurfaceChart de la lista de 'use'.
use([CanvasRenderer, Grid3DComponent, VisualMapComponent, TitleComponent, TooltipComponent])

const props = defineProps({
  chartData: { type: Object, required: true },
})

const chartOptions = computed(() => {
  const { x_grid, y_grid, z_grid, title } = props.chartData

  const data = []
  for (let i = 0; i < y_grid.length; i++) {
    for (let j = 0; j < x_grid.length; j++) {
      data.push([x_grid[j], y_grid[i], z_grid[i][j]])
    }
  }

  const maxValue = Math.max(...z_grid.flat())

  return {
    title: {
      text: title,
      left: 'center',
    },
    tooltip: {},
    visualMap: {
      min: 0,
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
    xAxis3D: { type: 'value', name: 'X' },
    yAxis3D: { type: 'value', name: 'Y' },
    zAxis3D: { type: 'value', name: 'Densidad' },
    grid3D: {
      viewControl: {
        // Permite la rotación y el zoom
      },
    },
    series: [
      {
        type: 'surface', // ECharts reconoce 'surface' gracias a la importación de 'echarts-gl'
        data: data,
        shading: 'lambert',
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
  height: 600px;
}
</style>
