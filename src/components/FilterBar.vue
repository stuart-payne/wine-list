<script setup lang="ts">
import { Sorting, Country, WineType } from '@/enums'
import { useWineStore } from '../stores/wineStore'

const wineStore = useWineStore()
</script>
<template>
  <div class="container">
    <div class="filters">
      <div class="select-container">
        <label for="country">Country</label>
        <select id="country" class="select" v-model="wineStore.selectedCountry">
          <option value="">Any</option>
          <option :key="country" :value="country" v-for="country in Object.values(Country)">
            {{ country }}
          </option>
        </select>
      </div>
      <div class="select-container">
        <label for="wine-type">Wine Type</label>
        <select id="wine-type" class="select" v-model="wineStore.selectedWineType">
          <option value="">Any</option>
          <option :key="wineType" :value="wineType" v-for="wineType in Object.values(WineType)">
            {{ wineType }}
          </option>
        </select>
      </div>
    </div>
    <div>
      <label for="sorting">Sorting</label>
      <select id="sorting" class="select" v-model="wineStore.selectedSorting">
        <option :key="sorting" :value="sorting" v-for="sorting in Object.values(Sorting)">
          {{ sorting }}
        </option>
      </select>
    </div>
  </div>
</template>
<style scoped>
.container {
  padding: 8px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: space-between;
}

.filters {
  display: flex;
  gap: 16px;
  flex-direction: row;
}

.select {
  width: 100%;
  min-width: 15ch;
  max-width: 30ch;
  border: 1px solid var(--main);
  border-radius: 1em;
  padding: 0.5em 1em;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);
  color: var(--lighter-font-color);
}
</style>
