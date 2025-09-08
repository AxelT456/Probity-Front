<script setup>
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const n = ref(10)

const probabilities = ref([0.3, 0.3, 0.4])
const k = ref(3)

const emit = defineEmits(['calculate'])


function handleSubmit() {
  emit('calculate', {
    n: n.value,
    probabilities: probabilities.value.map(Number),
    k: Number(k.value),
  })
}


function addProbability() {
  probabilities.value.push(0)
}


function removeProbability(index) {
  if (probabilities.value.length > 1) {
    probabilities.value.splice(index, 1)
  }
}
</script>

<template>
  <form id="multinomial-form" @submit.prevent="handleSubmit" class="space-y-4">
    <div class="flex items-center justify-between">
      <Label for="n" class="text-sm text-muted-foreground">Número de ensayos (n)</Label>
      <Input id="n" v-model="n" type="number" min="1" required class="w-24 text-right" />
    </div>
    <div>
      <Label class="text-sm text-muted-foreground">Probabilidades (deben sumar 1)</Label>
      <div v-for="(prob, idx) in probabilities" :key="idx" class="flex items-center space-x-2 mt-2">
        <Input v-model="probabilities[idx]" type="number" min="0" max="1" step="0.01" required class="w-20 text-right" />
        <button type="button" @click="removeProbability(idx)" class="text-red-500 hover:underline" v-if="probabilities.length > 1">Eliminar</button>
      </div>
      <button type="button" @click="addProbability" class="mt-2 text-blue-600 hover:underline">Agregar categoría</button>
      <div class="flex items-center space-x-2 mt-4">
        <Label for="k" class="text-sm text-muted-foreground">k (éxitos por categoría)</Label>
        <Input id="k" v-model="k" type="number" min="0" :max="n" step="1" required class="w-16 text-right" />
      </div>
    </div>
  </form>
</template>

<style scoped></style>
