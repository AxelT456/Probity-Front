<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const p = ref(0.75)
const n = ref(10)

const emit = defineEmits(['calculate'])

function handleSubmit() {
  emit('calculate', { p: p.value, n: n.value })
}
</script>

<template>
  <form id="bernoulli-form" @submit.prevent="handleSubmit" class="space-y-4">
    <div class="flex items-center justify-between">
      <Label for="p" class="text-sm text-muted-foreground">Probabilidad de éxito (p)</Label>
      <Input
        id="p"
        v-model="p"
        type="number"
        min="0"
        max="1"
        step="0.01"
        placeholder="Ej: 0.75"
        required
        class="w-24 text-right"
      />
    </div>
    <div class="flex items-center justify-between">
      <Label for="p" class="text-sm text-muted-foreground">Veces a ejecutar (n)</Label>
      <Input
        id="n"
        v-model="n"
        type="number"
        min="0"
        max="99,999"
        step="1"
        placeholder="Ej: 10"
        required
        class="w-24 text-right"
      />
    </div>
  </form>
</template>
