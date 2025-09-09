<script setup>
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const z_score = ref(1.96)

const emit = defineEmits(['calculate'])

function handleSubmit() {
  emit('calculate', { z_score: z_score.value })
}
</script>

<template>
  <form id="normal-form" @submit.prevent="handleSubmit" class="space-y-4">
    <div class="flex items-center justify-between">
      <Label for="z_score" class="text-sm text-muted-foreground">Puntuación Z (z)</Label>
      <Input
        id="z_score"
        v-model="z_score"
        type="number"
        step="0.01"
        placeholder="Ej: 1.96"
        required
        class="w-24 text-right"
      />
    </div>
  </form>
</template>
