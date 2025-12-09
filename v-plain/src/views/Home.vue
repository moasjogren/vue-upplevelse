<script setup lang="ts">
  import activityList from "../data/Activity";
  import Card from "../components/Card.vue";
  import Hero from "../components/HeroBanner.vue"
</script>

<template>

  <main>
    <Hero/>
    <div class="main-content">
      <div class="hero-action-symbol">
            <img src="../assets/arrowstar.svg" alt="star" class="star">
            <svg viewBox="0 0 24 24" fill="none">
                    <g stroke-width="0"></g>
                    <g stroke-linecap="round" stroke-linejoin="round"></g>
                    <g>
                    <path
                        d="M5 12H19M19 12L13 6M19 12L13 18"
                        stroke="#F9EDEB"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    </g>
                </svg>
        </div>
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
main {
  flex-direction: column;
  justify-content: center;
}
.main-content {
  width: 80vw;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  position: relative;
}

.hero-action-symbol {
  position: absolute;
  top: -75px;
  left: 45%;
}

.hero-action-symbol img {
  animation: spin infinite 20s linear;
  position: relative;
  z-index: 5;
}

.hero-action-symbol svg {
  width: 86px;
  position: absolute;
  transform: rotate(90deg) translate(38%, 132%);;
  
  z-index: 6;
  top: 0;
}

.hero-action-symbol svg path {
  stroke: var(--action-color)
}

.cards {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 28px 0;
}
</style>
