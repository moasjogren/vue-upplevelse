<script setup lang="ts">
  import activityList from "../data/Activity";
  import Card from "../components/Card.vue";
  import { onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
   import SearchForm from "../components/SearchForm.vue"
  import { useSearchStore } from '../store/searchStore'
  
  const searchStore = useSearchStore()
  const {filteredActivities} = storeToRefs(searchStore)
   onMounted(() => {
    searchStore.setActivities(activityList)
   });
</script>

<template>
  <main>
    <div class="main-content">
      <h1>Home</h1>
      <SearchForm />
      <div class="cards">
        <Card
          v-for="activity in filteredActivities"
          :key="activity.id"
          :id="activity.id"
          :imgLink="activity.imgLink"
          :title="activity.title"
          :description="activity.description"
          :difficulty="activity.difficulty"
          :capacity="activity.capacity"
          :age="activity.age"
          :duration="activity.duration"
          :price="activity.price"
        />
      </div>
       <p v-if="filteredActivities.length === 0">Inga aktiviteter hittades</p>
    </div>
  </main>
</template>

<style scoped>
.main-content {
  width: 80vw;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
}

.cards {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 28px 0;
}
</style>
