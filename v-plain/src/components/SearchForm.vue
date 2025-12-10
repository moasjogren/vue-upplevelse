<script setup lang="ts">
    import { storeToRefs } from 'pinia';
   import { useSearchStore } from '../store/searchStore';

    const searchStore = useSearchStore();
    const {searchQuery, difficulty, minAge, maxPrice} = storeToRefs(searchStore);
</script>

<template>
    <div class="search-container">
        <div class="filters">
            <select name="difficulty" id="difficulty" v-model.number="difficulty">
                <option :value="null">Alla svårighetsgrader</option>
                <option :value="1">Lätt</option>
                <option :value="2">Medel</option>
                <option :value="3">Svår</option>
            </select>
            
            <div class="input-wrapper">
                <input 
                v-model.number="minAge" 
                type="number" 
                placeholder="Minsta ålder" 
                />
                <span class="input-suffix">år</span>
            </div>

            <div class="input-wrapper">
                <input 
                v-model.number="maxPrice"
                type="number" 
                placeholder="Högsta pris"
                />
                <span class="input-suffix">kr</span>
            </div>

            <button @click="searchStore.clearFilters()">Rensa filter</button>
        </div>
    </div>
</template>

<style scoped>
.search-container {
  width: 80%;
  margin-bottom: 20px;
}

.filters{
    display: flex;
    gap: 10px;
    margin-top: 10px;
    flex-wrap: wrap;
    align-items: center;
}

.filters input, .filters select{
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: var(--secondary-action-color);
}

.filters button{
    padding: 8px 16px;
    cursor: pointer;
    background-color: var(--action-color);
    border: none;
    border-radius: 4px;
    color: white;
}

.search-input::placeholder{
    color:black;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
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