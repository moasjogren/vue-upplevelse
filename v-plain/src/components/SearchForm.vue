<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSearchStore } from "../store/searchStore";
import Calendar from "./Calendar.vue";

const searchStore = useSearchStore();
const { difficulty, ageRange, maxPrice, selectedDate, players } =
  storeToRefs(searchStore);
</script>

<template>
  <div class="search-container">
    <div class="filters">
      <select name="difficulty" id="difficulty" v-model="difficulty">
        <option :value="null">Alla svårighetsgrader</option>
        <option :value="1">★☆☆☆☆</option>
        <option :value="2">★★☆☆☆</option>
        <option :value="3">★★★☆☆</option>
        <option :value="4">★★★★☆</option>
        <option :value="5">★★★★★</option>
      </select>

      <Calendar v-model="selectedDate" label="Välj datum" />

      <select name="players" id="players" v-model.number="players">
        <option :value="2">2</option>
        <option :value="3">3</option>
        <option :value="4">4</option>
        <option :value="5">5</option>
        <option :value="6">6</option>
        <option :value="7">7</option>
        <option :value="8">8</option>
      </select>

      <div class="input-wrapper">
        <select v-model="ageRange">
          <option :value="null">Ålderskategori</option>
          <option value="barn">Barn</option>
          <option value="vuxen">Vuxen</option>
          <option value="senior">Senior</option>
        </select>
      </div>

      <div class="input-wrapper">
        <input
          type="number"
          placeholder="Högsta pris"
          v-model.number="maxPrice"
        />
        <span class="input-suffix">kr</span>
      </div>
      <button @click="searchStore.applyFilters()">Filtrera</button>
      <button @click="searchStore.clearFilters()">Rensa filter</button>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.filters input,
.filters select {
  font-family: 'poppins';
  padding: 16px;
  border-radius: 8px;
  background-color: white;
}

.filters button {
  padding: 16px;
  cursor: pointer;
  background-color: var(--action-color);
  border: none;
  border-radius: 8px;
  color: var(--main-bg-color);
  font-family: 'poppins','Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  transition: 0.2s;
}

.filters button:last-child {
  background-color: var(--main-box-color);
  color: var(--secondary-action-color);
}

.filters button:hover {
  opacity: 0.8;
}

.search-input::placeholder {
  color: black;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

/* Input med suffix */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  padding-right: 35px;
}

.input-suffix {
  position: absolute;
  right: 12px;
  color: #666;
  font-size: 14px;
  pointer-events: none;
}
</style>
