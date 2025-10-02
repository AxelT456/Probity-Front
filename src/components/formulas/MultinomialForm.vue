<script setup>
import { ref, computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const num_experiments = ref(5000)
const num_trials = ref(10)
const categories = ref([
  { label: 'Rojo', probability: 0.5 },
  { label: 'Verde', probability: 0.3 },
  { label: 'Azul', probability: 0.2 },
])

function addCategory() {
  categories.value.push({ label: '', probability: 0 })
}

function removeCategory(index) {
  if (categories.value.length > 2) {
    categories.value.splice(index, 1)
  }
}

const probabilitySum = computed(() => {
  return categories.value.reduce((sum, cat) => sum + (parseFloat(cat.probability) || 0), 0)
})

const isSumInvalid = computed(() => Math.abs(probabilitySum.value - 1) > 0.001)

const emit = defineEmits(['calculate'])

function handleSubmit() {
  if (isSumInvalid.value) {
    alert('La suma de las probabilidades debe ser igual a 1.')
    return
  }
  emit('calculate', {
    num_experiments: num_experiments.value,
    num_trials: num_trials.value,
    probabilities: categories.value.map((c) => c.probability),
    category_labels: categories.value.map((c) => c.label),
  })
}
</script>

<template>
  <form id="multinomial-form" @submit.prevent="handleSubmit" class="space-y-6">
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <Label for="experiments" class="text-sm text-muted-foreground"># Experimentos</Label>
        <Input
          id="experiments"
          v-model="num_experiments"
          type="number"
          min="1"
          required
          class="w-28 text-right"
        />
      </div>
      <div class="flex items-center justify-between">
        <Label for="trials" class="text-sm text-muted-foreground"># Ensayos por Exp.</Label>
        <Input
          id="trials"
          v-model="num_trials"
          type="number"
          min="1"
          required
          class="w-28 text-right"
        />
      </div>
    </div>

    <div class="space-y-2">
      <Label>Categorías y Probabilidades</Label>
      <div v-for="(category, index) in categories" :key="index" class="flex items-center gap-2">
        <Input v-model="category.label" placeholder="Nombre" class="flex-grow" />
        <Input
          v-model="category.probability"
          type="number"
          min="0"
          max="1"
          step="0.01"
          placeholder="Prob."
          class="w-20 text-right"
        />
        <Button
          type="button"
          @click="removeCategory(index)"
          variant="destructive"
          size="sm"
          :disabled="categories.length <= 2"
          >-</Button
        >
      </div>
      <Button type="button" @click="addCategory" variant="outline" size="sm" class="w-full mt-2"
        >Añadir Categoría</Button
      >
    </div>

    <div
      class="p-2 rounded-lg text-center text-sm"
      :class="isSumInvalid ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
    >
      Suma de probabilidades: {{ probabilitySum.toFixed(4) }}
      <p v-if="isSumInvalid" class="text-xs">Debe ser igual a 1</p>
    </div>
  </form>
</template>
