<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
// import Card from "../components/Card.vue";
import ChatBot from "../components/ChatBot.vue";
import Hero from "../components/HeroBanner.vue";
import SearchForm from "../components/SearchForm.vue";
// AI-integration: Importera vår AI-service för att generera aktiviteter
import { generateActivities } from "../services/aiService";
import type { Activity } from "../data/Activity";
import activityList from "../data/Activity";
import { storeToRefs } from "pinia";
import { useSearchStore } from "../store/searchStore";
import Carousel from "../components/Carousel.vue";

// AI-integration: State för aktiviteter, laddning och felhantering
const loading = ref(false);
const error = ref("");
const currentPage = ref(1);
// const itemsPerPage = 6;
const componentKey = ref(0); // För att tvinga re-render
const showChatBot = ref(false);

// AI-integration: Ladda sparade AI-aktiviteter från localStorage, eller generera nya vid första besöket
onMounted(async () => {
  // Kombinera befintliga aktiviteter med AI-genererade
  const savedActivities = localStorage.getItem("aiActivities");
  let aiGeneratedActivities: Activity[] = [];

  if (savedActivities) {
    try {
      aiGeneratedActivities = JSON.parse(savedActivities);
      console.log("Loaded saved AI activities:", aiGeneratedActivities);
      console.log(
        "Number of saved activities:",
        aiGeneratedActivities?.length || 0
      );

      // Validera att sparade aktiviteter har rätt struktur
      if (
        !Array.isArray(aiGeneratedActivities) ||
        aiGeneratedActivities.length === 0
      ) {
        console.log(
          "Saved activities invalid or empty, generating new ones..."
        );
        localStorage.removeItem("aiActivities"); // Rensa felaktiga data
        await handleGenerateActivities();
        return;
      }

      // Kontrollera att aktiviteterna har rätt struktur
      const validActivities = aiGeneratedActivities.filter(
        (activity) =>
          activity.id && activity.title && activity.capacity !== undefined
      );

      if (validActivities.length === 0) {
        console.log("No valid activities found, generating new ones...");
        localStorage.removeItem("aiActivities");
        await handleGenerateActivities();
        return;
      }

      // Använd bara AI-genererade aktiviteter (göm test-aktiviteterna)
      const combinedActivities = validActivities;
      console.log("Using saved AI activities:", {
        ai: validActivities.length,
        total: combinedActivities.length,
      });

      searchStore.setActivities(combinedActivities);
      searchStore.clearFilters();

      console.log("After setting saved activities:", {
        allActivities: searchStore.allActivities.length,
        filteredActivities: searchStore.filteredActivities.length,
      });
    } catch (err) {
      console.error("Failed to load saved activities:", err);
      localStorage.removeItem("aiActivities"); // Rensa felaktiga data
      // Om laddning misslyckas, generera nya
      await handleGenerateActivities();
    }
  } else {
    // Första besöket - generera AI-rum automatiskt
    console.log("No saved activities, generating new ones...");
    await handleGenerateActivities();
  }
});

// AI-integration: Beräkna vilka aktiviteter som ska visas på nuvarande sida
// const paginatedActivities = computed(() => {
//   const start = (currentPage.value - 1) * itemsPerPage;
//   const end = start + itemsPerPage;
//   return filteredActivities.value.slice(start, end);
// });

// AI-integration: Beräkna totalt antal sidor
// const totalPages = computed(() => {
//   return Math.ceil(filteredActivities.value.length / itemsPerPage);
// });

// AI-integration: Funktion som anropar backend för att generera nya aktiviteter
const handleGenerateActivities = async () => {
  loading.value = true;
  error.value = "";
  currentPage.value = 1;
  try {
    console.log("Starting AI generation...");
    // Generera 12 AI-aktiviteter (ersätter test-aktiviteterna)
    const newActivities = await generateActivities(12);
    console.log("AI generated activities received:", newActivities);
    console.log("Number of AI activities:", newActivities?.length || 0);

    if (!newActivities || newActivities.length === 0) {
      throw new Error("No activities generated");
    }

    // Spara AI-genererade aktiviteter i localStorage
    localStorage.setItem("aiActivities", JSON.stringify(newActivities));

    // Använd bara AI-genererade aktiviteter (göm test-aktiviteterna)
    const combinedActivities = newActivities;
    console.log("Using AI-generated activities:", {
      ai: newActivities.length,
      total: combinedActivities.length,
    });

    searchStore.setActivities(combinedActivities);
    // Se till att filter inte är aktiva från början
    searchStore.clearFilters();

    console.log("After setting activities:", {
      allActivities: searchStore.allActivities.length,
      filteredActivities: searchStore.filteredActivities.length,
    });

    // Tvinga re-render av cards
    componentKey.value++;
  } catch (err) {
    error.value = "Kunde inte generera aktiviteter. Försök igen senare.";
    console.error("Failed to generate activities:", err);
    // Om AI-generering misslyckas, använd test-aktiviteterna som fallback
    searchStore.setActivities(activityList);
    searchStore.clearFilters();
  } finally {
    loading.value = false;
  }
};

// AI-integration: Navigeringsfunktioner för pagination
// const goToPage = (page: number) => {
//   if (page >= 1 && page <= totalPages.value) {
//     currentPage.value = page;
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }
// };

const searchStore = useSearchStore();
const { filteredActivities } = storeToRefs(searchStore);

// Sätt inga aktiviteter initialt - vänta på AI-genererade eller använd test-aktiviteterna som fallback
// searchStore.setActivities(activityList); // Göm test-aktiviteterna
searchStore.clearFilters();
console.log("Waiting for AI activities or using fallback...");
</script>

<template>
  <main>
    <Hero />
    <div class="main-content">
      <div class="header-section">
        <h1>Home</h1>
        <!-- AI-integration: Knapp för att generera nya rum -->
        <button
          class="ai-button"
          @click="handleGenerateActivities"
          :disabled="loading"
        >
          {{ loading ? "Genererar 12 Rum..." : "🔄 Generera Nya Rum" }}
        </button>
      </div>

      <!-- AI-integration: Visa felmeddelande om något går fel -->
      <div v-if="error" class="error">{{ error }}</div>

      <SearchForm />

      <div class="hero-action-symbol">
        <img src="../assets/arrowstar.svg" alt="star" class="star" />
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

      <div v-if="loading" class="loading-state">
        <p>🔄 Genererar AI-aktiviteter... Detta kan ta upp till en minut.</p>
      </div>

      <!-- <div class="cards" v-if="filteredActivities.length > 0 && !loading">
        <Card
          v-for="activity in filteredActivities"
          :key="activity.id"
          :id="activity.id"
          :imgLink="activity.imgLink"
          :title="activity.title"
          :description="activity.description"
          :difficulty="activity.difficulty"
          :capacity="activity.capacity"
          :ageRange="activity.ageRange"
          :duration="activity.duration"
          :price="activity.price"
        />
      </div> -->

      <div class="carousel-wrapper" v-else-if="filteredActivities.length > 0">
        <Carousel
          :cards="filteredActivities"
          :key="filteredActivities.length"
        />
      </div>

      <!-- AI-integration: Pagination för att bläddra mellan sidor -->
      <!-- <div v-if="totalPages > 1" class="pagination">
        <button
          class="page-btn"
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
        >
          ← Föregående
        </button>

        <div class="page-numbers">
          <button
            v-for="page in totalPages"
            :key="page"
            class="page-number"
            :class="{ active: page === currentPage }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </div>

        <button
          class="page-btn"
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          Nästa →
        </button>
      </div>
      <p v-if="filteredActivities.length === 0">Inga aktiviteter hittades</p>
    </div> --> 
    </div>

    <!-- Floating chat button -->
    <button class="chat-fab" @click="showChatBot = true" title="Chatta med AI">
      💬
    </button>

    <!-- ChatBot modal -->
    <ChatBot :show="showChatBot" @close="showChatBot = false" />
  </main>
</template>

<style scoped>
main {
  flex-direction: column;
  justify-content: center;
}
.main-content {
  width: 80vw;
  padding: 124px 0 68px 0;
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
  width: 124px;
}

.hero-action-symbol svg {
  width: 76px;
  position: absolute;
  transform: rotate(90deg) translate(38%, 132%);

  z-index: 6;
  top: 0;
}

.hero-action-symbol svg path {
  stroke: var(--action-color);
}

/* AI-integration: Header med knapp */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* AI-integration: Styling för AI-knappen */
.ai-button {
  background: linear-gradient(135deg, var(--action-color), #ff7ac2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.ai-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 86, 162, 0.4);
}

.ai-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* AI-integration: Felmeddelande styling */
.error {
  background-color: rgba(255, 0, 0, 0.1);
  color: #ff4444;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 4px solid #ff4444;
}

.carousel-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Floating chat button */
.chat-fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--action-color);
  border: none;
  font-size: 28px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 100;
}

.chat-fab:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.chat-fab:active {
  transform: scale(0.95);
  flex-wrap: wrap;
  gap: 28px 0;
}
</style>
