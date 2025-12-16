<script setup lang="ts">
    import { ref } from 'vue';
    import Card from './Card.vue';

  // Definiera props för Carousel-komponenten
    const props = defineProps<{
  cards: Array<any>
}>();
    // Hanterar akutuell slide index
    const currentIndex = ref(0);
    const cardsPerView = ref(3);

    //Funktioner för att navigera i karusellen 
    const next = () =>{
        if(currentIndex.value < props.cards.length - cardsPerView.value){
            currentIndex.value++;
        }
    };

    //gå till fåregående slide genom att minska index
    const prev = () =>{
    if (currentIndex.value > 0){
        currentIndex.value--;
    }
    }
    //Gå till en specifik slide baserat på index
    const goToSlide = (index: number) =>{
        currentIndex.value = index;
    }
</script>

<template>
  <div class="carousel-container">
    <button class="carousel-btn prev" @click="prev" :disabled="currentIndex === 0">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    
    <div class="carousel-wrapper">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }">
        <div v-for="card in cards" :key="card.id" class="carousel-item">
          <Card 
            :id="card.id"
            :imgLink="card.imgLink"
            :title="card.title"
            :description="card.description"
            :difficulty="card.difficulty"
            :capacity="card.capacity"
            :ageRange="card.ageRange"
            :duration="card.duration"
            :price="card.price"
          />
        </div>
      </div>
    </div>

    <button class="carousel-btn next" @click="next" :disabled="currentIndex >= cards.length - cardsPerView">
     <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <div class="carousel-dots">
      <button 
        v-for="(_, index) in cards.length - cardsPerView + 1" 
        :key="index"
        @click="goToSlide(index)"
        :class="{ active: currentIndex === index }"
        class="dot"
      ></button>
    </div>
  </div>
</template>    

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  padding: 40px 60px;
}

.carousel-wrapper {
  overflow: hidden;
  width: 100%;
}

.carousel-track {
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease;
}

.carousel-item {
  flex: 0 0 calc(33.333% - 14px); /* 3 kort per view */
  min-width: 0;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--main-box-color);
  border: 2px solid var(--main-bg-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: 0.3s;
  color: var(--text-color);
}

.carousel-btn:hover:not(:disabled) {
  border-color: var(--action-color);
  color: var(--action-color);
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-btn.prev {
  left: 0;
}

.carousel-btn.next {
  right: 0;
}

.carousel-btn svg {
  width: 24px;
  height: 24px;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--main-bg-color);
  border: 2px solid var(--text-color);
  cursor: pointer;
  transition: 0.3s;
  padding: 0;
}

.dot:hover,
.dot.active {
  background-color: var(--action-color);
  border-color: var(--action-color);
}
</style>