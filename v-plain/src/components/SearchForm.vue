<script setup lang="ts">
    import { storeToRefs } from 'pinia';
   import { useSearchStore } from '../store/searchStore';

    const searchStore = useSearchStore();
    const {searchQuery, difficulty, minAge, maxPrice} = storeToRefs(searchStore);
</script>

<template>
    <div class="search-container">
        <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Sök..."
        class="search-input" 
        />
        <div class="filters">
            <select name="difficulty" id="difficulty" v-model.number="difficulty">
                <option :value="null">Alla svårighetsgrader</option>
                <option :value="1">Lätt</option>
                <option :value="2">Medel</option>
                <option :value="3">Svår</option>
            </select>
            <input 
            v-model.number="minAge" 
            type="number" 
            placeholder="Minsta tillåtna ålder" 
            />
            <input 
            v-model.number="maxPrice"
            type="number" 
            placeholder="högsta pris"
            />

            <button @click=searchStore.clearFilters()>Rensa filter</button>
        </div>

    </div>
</template>

<style scoped>
.search-container {
  width: 80%;
  margin-bottom: 20px;
  
}
.search-input{
    width:100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: var(--secondary-action-color);

}

.filters{
    display: flex;
    gap: 10px;
    margin-top: 10px;
    flex-wrap: wrap;
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

.select {}
</style>