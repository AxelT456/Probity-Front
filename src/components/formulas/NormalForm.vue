<script setup>
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Valores iniciales de ejemplo
const mean = ref(100)
const std_dev = ref(15)
const x_value = ref(115)

const emit = defineEmits(['calculate'])

function handleSubmit() {
  // Validación simple en el frontend
  if (std_dev.value <= 0) {
    alert('La desviación estándar debe ser un número positivo.')
    return
  }
  emit('calculate', {
    mean: mean.value,
    std_dev: std_dev.value,
    x_value: x_value.value,
  })
}
</script>

<template>
  <form id="normal-form" @submit.prevent="handleSubmit" class="space-y-4">
    <div class="flex items-center justify-between">
      <Label for="mean" class="text-sm text-muted-foreground">Media (μ)</Label>
      <Input
        id="mean"
        v-model="mean"
        type="number"
        step="any"
        placeholder="Ej: 100"
        required
        class="w-28 text-right"
      />
    </div>
    <div class="flex items-center justify-between">
      <Label for="std_dev" class="text-sm text-muted-foreground">Desviación Estándar (σ)</Label>
      <Input
        id="std_dev"
        v-model="std_dev"
        type="number"
        step="any"
        min="0.0001"
        placeholder="Ej: 15"
        required
        class="w-28 text-right"
      />
    </div>
    <div class="flex items-center justify-between">
      <Label for="x_value" class="text-sm text-muted-foreground">Valor de X</Label>
      <Input
        id="x_value"
        v-model="x_value"
        type="number"
        step="any"
        placeholder="Ej: 115"
        required
        class="w-28 text-right"
      />
    </div>
  </form>
</template>
