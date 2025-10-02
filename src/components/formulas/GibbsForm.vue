<script setup>
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// Valores iniciales de ejemplo
const limite_inferior = ref(0)
const limite_superior = ref(2)
const x0 = ref(1)
const y0 = ref(1)
const iteraciones = ref(5000)
const formula = ref('(2*x + 3*y + 2)/28')

const emit = defineEmits(['calculate'])

function handleSubmit() {
  emit('calculate', {
    limite_inferior: limite_inferior.value,
    limite_superior: limite_superior.value,
    x0: x0.value,
    y0: y0.value,
    iteraciones: iteraciones.value,
    formula: formula.value,
  })
}
</script>

<template>
  <form id="gibbs-form" @submit.prevent="handleSubmit" class="space-y-4">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <Label for="x0" class="text-sm">X inicial (x0)</Label>
        <Input id="x0" v-model="x0" type="number" step="any" required />
      </div>
      <div>
        <Label for="y0" class="text-sm">Y inicial (y0)</Label>
        <Input id="y0" v-model="y0" type="number" step="any" required />
      </div>
      <div>
        <Label for="limite_inferior" class="text-sm">Límite Inferior</Label>
        <Input id="limite_inferior" v-model="limite_inferior" type="number" step="any" required />
      </div>
      <div>
        <Label for="limite_superior" class="text-sm">Límite Superior</Label>
        <Input id="limite_superior" v-model="limite_superior" type="number" step="any" required />
      </div>
    </div>
    <div>
      <Label for="iteraciones" class="text-sm"># Iteraciones</Label>
      <Input id="iteraciones" v-model="iteraciones" type="number" min="1" required />
    </div>
    <div>
      <Label for="formula" class="text-sm">Fórmula de la Distribución Conjunta</Label>
      <Textarea
        id="formula"
        v-model="formula"
        placeholder="Ej: (2*x + 3*y + 2)/28"
        required
        class="font-mono"
      />
    </div>
  </form>
</template>
