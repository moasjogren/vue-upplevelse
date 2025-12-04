<!-- <script setup lang="ts">
  import activityList from '../data/Activity';
  import Card from '../components/Card.vue';
</script>

<template>
  <h1>Home</h1>
  <div v-for="activity in activityList">
    <Card
      :key="activity.activityId"
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
</template> -->

<script setup lang="ts">
import activityList from "../data/Activity";
import Card from "../components/Card.vue";
</script>

<template>
  <main>
    <div class="main-content">
      <h1>Home</h1>
      <div class="cards">
        <Card
          v-for="activity in activityList"
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
}
</style>
