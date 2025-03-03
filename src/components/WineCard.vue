<script setup lang="ts">
import WineTypeChip from './WineTypeChip.vue'
import type { Wine } from '../types'
import { wineImages } from '../constants'
import { useCartStore } from '@/stores/cartStore'

defineProps<{
  wine: Wine
}>()

const { addToCart } = useCartStore()
</script>

<template>
  <div class="card">
    <section class="section info">
      <div class="info-child">
        <img :src="wineImages[wine.wineType]" :alt="wine.name" />
      </div>
      <div class="right-section">
        <div class="label-container">
          <WineTypeChip :country="wine.country" :name="wine.name" :wine-type="wine.wineType" />
        </div>
        <div class="price-section">
          <p class="price">£{{ wine.price }}</p>
          <button class="btn" @click="() => addToCart(wine)">Add</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.card {
  border: solid 2px #f4f3f0;
  border-radius: 24px;
  height: 300px;
  width: 260px;
  background-color: white;
  box-shadow: none;
  transition: box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
}

.price {
  font-weight: 600;
  font-size: 1.2rem;
  padding-left: 8px;
  margin: 0;
}

.name {
  font-weight: 600;
}

.country {
  font-weight: 400;
  font-size: 0.9rem;
}

.right-section {
  color: #1a2d41;
  flex: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.label-container {
  width: 100%;
}

.section {
  padding: 8px;
  width: 100%;
}

.info-child {
  height: 100%;
}

.label {
  text-align: end;
}

.info {
  display: flex;
  flex-direction: row;
}

.price-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
