<script setup lang="ts">
import WineCard from './components/WineCard.vue'
import FilterBar from './components/FilterBar.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import { useWineStore } from './stores/wineStore'
import { useCartStore } from './stores/cartStore'

const wineStore = useWineStore()
const cartStore = useCartStore()
</script>

<template>
  <main class="main">
    <div class="header">
      <div class="header-container">
        <FilterBar />
      </div>
    </div>
    <div class="grid-container">
      <div class="full-width" v-if="wineStore.isLoading">
        <LoadingSpinner />
      </div>
      <div v-if="!wineStore.isLoading" class="grid">
        <WineCard :key="wine.name" :wine="wine" v-for="wine in wineStore.loadedWines" />
      </div>
      <div class="full-width gutter">
        <button
          class="btn load-more-button"
          v-if="!wineStore.loadingMore && wineStore.hasMore && !wineStore.isLoading"
          @click="wineStore.getMore"
        >
          Load more
        </button>
      </div>
      <div class="full-width" v-if="wineStore.loadingMore">
        <LoadingSpinner />
      </div>
    </div>
    <div class="cart-total" v-if="cartStore.cart.length > 0">
      £{{ cartStore.total.toFixed(2) }}
      <button class="clear-button" @click="cartStore.clear">x</button>
    </div>
  </main>
</template>

<style scoped>
.header {
  background-color: var(--card-background);
  margin-bottom: 32px;
  position: sticky;
  top: 0px;
  overflow-x: scroll;
}

.full-width {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.grid-container {
  margin-top: 16px;
  max-width: 1280px;
  margin: 0 auto;
}

.grid {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  row-gap: 24px;
  justify-items: center;
  margin-bottom: 16px;
}

.load-more-button {
  width: 122px;
}

.clear-button {
  font-size: 1.2em;
  border: none;
  background: none;
  color: white;
}

@media (min-width: 600px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1180px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.cart-total {
  position: fixed;
  background-color: var(--main);
  padding: 12px;
  color: white;
  border-radius: 2em;
  bottom: 20px;
  right: 20px;
}

.gutter {
  margin-bottom: 16px;
}
</style>
