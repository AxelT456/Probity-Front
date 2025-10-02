<script setup>
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const n = ref(10)
const p = ref(0.5)
const k = ref(5)

const emit = defineEmits(['calculate'])

function handleSubmit() {
  emit('calculate', {
    n: n.value,
    p: p.value,
    k: k.value,
  })
}
</script>

<template>
  <form id="binomial-form" @submit.prevent="handleSubmit" class="space-y-4">
    <div class="flex items-center justify-between">
      <Label for="n" class="text-sm text-muted-foreground">Tamaño de muestra (n)</Label>
      <Input
        id="n"
        v-model="n"
        type="number"
        min="1"
        placeholder="10"
        required
        class="w-24 text-right"
      />
    </div>

    <div class="flex items-center justify-between">
      <Label for="p" class="text-sm text-muted-foreground">Probabilidad de éxito (p)</Label>
      <Input
        id="p"
        v-model="p"
        type="number"
        min="0"
        max="1"
        step="0.01"
        placeholder="0.5"
        required
        class="w-24 text-right"
      />
    </div>

    <div class="flex items-center justify-between">
      <Label for="k" class="text-sm text-muted-foreground">Número de éxitos (k)</Label>
      <Input
        id="k"
        v-model="k"
        type="number"
        min="0"
        placeholder="5"
        required
        class="w-24 text-right"
      />
    </div>
  </form>
</template>
<style scoped></style>
