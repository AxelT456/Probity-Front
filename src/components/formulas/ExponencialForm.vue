<script setup>
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const n = ref(5000)
const rate = ref(0.5)

const emit = defineEmits(['calculate'])

function handleSubmit() {
  if (rate.value <= 0) {
    alert('La tasa (λ) debe ser un número positivo.')
    return
  }
  emit('calculate', { n: n.value, rate: rate.value })
}
</script>

<template>
  <form id="exponencial-form" @submit.prevent="handleSubmit" class="space-y-4">
    <div class="flex items-center justify-between">
      <Label for="n" class="text-sm text-muted-foreground"># Simulaciones (n)</Label>
      <Input
        id="n"
        v-model="n"
        type="number"
        min="1"
        placeholder="Ej: 5000"
        required
        class="w-28 text-right"
      />
    </div>
    <div class="flex items-center justify-between">
      <Label for="rate" class="text-sm text-muted-foreground">Tasa Lambda (λ)</Label>
      <Input
        id="rate"
        v-model="rate"
        type="number"
        step="any"
        min="0.0001"
        placeholder="Ej: 0.5"
        required
        class="w-28 text-right"
      />
    </div>
  </form>
</template>
