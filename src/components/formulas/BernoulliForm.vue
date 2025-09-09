<script setup>
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const n = ref(10)
const p = ref(0.5)

const emit = defineEmits(['calculate'])

function handleSubmit() {
  emit('calculate', {
    n: n.value,
    p: p.value,
  })
}
</script>

<template>
  <form id="bernoulli-form" @submit.prevent="handleSubmit" class="space-y-4">
    <div class="flex items-center justify-between">
      <Label for="n">Número de ensayos (n)</Label>
      <Input id="n" v-model="n" type="number" min="1" required class="w-24 text-right" />
    </div>

    <div class="flex items-center justify-between">
      <Label for="p">Probabilidad de éxito (p)</Label>
      <Input
        id="p"
        v-model="p"
        type="number"
        min="0"
        max="1"
        step="0.01"
        required
        class="w-24 text-right"
      />
    </div>
  </form>
</template>
