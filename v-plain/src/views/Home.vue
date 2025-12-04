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
  import activityList from '../data/Activity';
  import Card from '../components/Card.vue';
</script>

<template>
  <h1>Home</h1>
  <div v-for="activity in activityList" :key="activity.activityId">
    <Card
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
</template>