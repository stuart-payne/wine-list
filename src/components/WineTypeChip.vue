<script setup lang="ts">
import { WineType } from '@/enums'
import { computed } from 'vue'

const { name, wineType, country } = defineProps<{
  wineType: WineType
  name: string
  country: string
}>()

const wineTypeClasses = {
  [WineType.Red]: 'red',
  [WineType.Sparkling]: 'sparkling',
  [WineType.Rose]: 'rose',
  [WineType.White]: 'white',
} as const

const colorClass = computed(() => `chip ${wineTypeClasses[wineType]}`)
</script>
<template>
  <div :class="colorClass">
    <p class="name">{{ name }}</p>
    <p class="wine-type">{{ country }}</p>
  </div>
</template>
<style scoped>
.chip {
  border-radius: 1em;
  padding: 12px;
  text-align: end;
}

.name {
  margin: 0;
  font-weight: 600;
  font-size: 1rem;
}

.wine-type {
  font-size: 0.7rem;
  font-weight: 400;
}

.red {
  background-color: #580000;
  color: white;
}

.white {
  background-color: #f9e8c0;
}

.rose {
  background-color: #d3b4c0;
}

.sparkling {
  background-color: #c4b9aa;
}
</style>
