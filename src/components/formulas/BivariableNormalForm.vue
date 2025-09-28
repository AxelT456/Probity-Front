<script setup>
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Valores iniciales de ejemplo
const mean_x = ref(0)
const mean_y = ref(0)
const std_dev_x = ref(1)
const std_dev_y = ref(1)
const correlation = ref(0.5)
const x_value = ref(0.5)
const y_value = ref(0.5)

const emit = defineEmits(['calculate'])

function handleSubmit() {
  if (std_dev_x.value <= 0 || std_dev_y.value <= 0) {
    alert('Las desviaciones estándar deben ser números positivos.')
    return
  }
  if (correlation.value < -1 || correlation.value > 1) {
    alert('La correlación debe estar entre -1 y 1.')
    return
  }
  emit('calculate', {
    mean_x: mean_x.value,
    mean_y: mean_y.value,
    std_dev_x: std_dev_x.value,
    std_dev_y: std_dev_y.value,
    correlation: correlation.value,
    x_value: x_value.value,
    y_value: y_value.value,
  })
}
</script>

<template>
  <form id="bivariate-form" @submit.prevent="handleSubmit" class="space-y-4">
    <div class="grid grid-cols-2 gap-x-4 gap-y-3">
      <div>
        <Label for="mean_x" class="text-sm">Media X (μₓ)</Label>
        <Input id="mean_x" v-model="mean_x" type="number" step="any" required />
      </div>
      <div>
        <Label for="mean_y" class="text-sm">Media Y (μᵧ)</Label>
        <Input id="mean_y" v-model="mean_y" type="number" step="any" required />
      </div>
      <div>
        <Label for="std_dev_x" class="text-sm">Desv. Est. X (σₓ)</Label>
        <Input id="std_dev_x" v-model="std_dev_x" type="number" step="any" min="0.001" required />
      </div>
      <div>
        <Label for="std_dev_y" class="text-sm">Desv. Est. Y (σᵧ)</Label>
        <Input id="std_dev_y" v-model="std_dev_y" type="number" step="any" min="0.001" required />
      </div>
    </div>
    <div>
      <Label for="correlation" class="text-sm">Correlación (ρ)</Label>
      <Input
        id="correlation"
        v-model="correlation"
        type="number"
        step="0.1"
        min="-1"
        max="1"
        required
      />
    </div>
  </form>
</template>
