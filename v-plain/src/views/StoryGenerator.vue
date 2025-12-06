<script setup lang="ts">
import { ref } from "vue";
import { generateStory } from "../services/aiService";

const theme = ref("");
const story = ref("");
const loading = ref(false);
const error = ref("");

const themes = [
  "Spökhus",
  "Sci-Fi Laboratorium",
  "Egyptisk Pyramid",
  "Bankvault",
  "Trollkarls Torn",
  "Ubåt",
  "Zombie Apokalyps",
  "Medeltida Slott",
];

const handleGenerateStory = async () => {
  if (!theme.value.trim()) {
    error.value = "Vänligen ange ett tema";
    return;
  }

  loading.value = true;
  error.value = "";
  story.value = "";

  try {
    story.value = await generateStory(theme.value);
  } catch (err) {
    error.value = "Kunde inte generera story. Försök igen senare.";
    console.error("Failed to generate story:", err);
  } finally {
    loading.value = false;
  }
};

const selectTheme = (selectedTheme: string) => {
  theme.value = selectedTheme;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(story.value);
};
</script>

<template>
  <main>
    <div class="main-content">
      <h1>🎭 Escape Room Story Generator</h1>
      <p class="subtitle">
        Låt AI skapa ett unikt scenario för ditt escape room
      </p>

      <div class="theme-selection">
        <h2>Välj eller skriv ett tema</h2>
        <div class="theme-chips">
          <button
            v-for="themeOption in themes"
            :key="themeOption"
            class="theme-chip"
            :class="{ active: theme === themeOption }"
            @click="selectTheme(themeOption)"
          >
            {{ themeOption }}
          </button>
        </div>

        <div class="input-group">
          <input
            v-model="theme"
            placeholder="Eller skriv ditt eget tema..."
            @keyup.enter="handleGenerateStory"
          />
          <button
            class="generate-btn"
            @click="handleGenerateStory"
            :disabled="loading || !theme.trim()"
          >
            {{ loading ? "Genererar..." : "✨ Generera Story" }}
          </button>
        </div>
      </div>

      <div v-if="error" class="error">{{ error }}</div>

      <div v-if="story" class="story-container">
        <h2>🎬 Ditt Scenario</h2>
        <div class="story-content">
          {{ story }}
        </div>
        <button class="copy-btn" @click="copyToClipboard">
          📋 Kopiera Story
        </button>
      </div>

      <div v-else-if="!loading" class="placeholder">
        <p>Välj ett tema och klicka på "Generera Story" för att börja!</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main-content {
  width: 80vw;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

h1 {
  text-align: center;
  color: var(--secondary-action-color);
  margin-bottom: 0;
}

.subtitle {
  text-align: center;
  color: var(--text-color);
  margin-top: -10px;
  font-size: 18px;
}

.theme-selection {
  background-color: var(--main-box-color);
  border-radius: 12px;
  padding: 30px;
}

.theme-selection h2 {
  color: var(--secondary-action-color);
  margin-bottom: 20px;
}

.theme-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.theme-chip {
  background-color: var(--main-bg-color);
  color: var(--text-color);
  border: 2px solid var(--main-bg-color);
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-chip:hover {
  border-color: var(--action-color);
  transform: translateY(-2px);
}

.theme-chip.active {
  background-color: var(--action-color);
  border-color: var(--action-color);
}

.input-group {
  display: flex;
  gap: 12px;
}

.input-group input {
  flex: 1;
  padding: 14px 20px;
  border-radius: 8px;
  border: 2px solid var(--main-bg-color);
  background-color: var(--main-bg-color);
  color: var(--text-color);
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: var(--action-color);
}

.generate-btn {
  padding: 14px 30px;
  border-radius: 8px;
  border: none;
  background-color: var(--action-color);
  color: var(--text-color);
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.generate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error {
  background-color: #ff4444;
  color: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.story-container {
  background-color: var(--main-box-color);
  border-radius: 12px;
  padding: 30px;
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.story-container h2 {
  color: var(--secondary-action-color);
  margin-bottom: 20px;
}

.story-content {
  background-color: var(--main-bg-color);
  padding: 25px;
  border-radius: 8px;
  line-height: 1.8;
  font-size: 16px;
  color: var(--text-color);
  white-space: pre-wrap;
  margin-bottom: 20px;
}

.copy-btn {
  background-color: var(--main-bg-color);
  color: var(--secondary-action-color);
  border: 2px solid var(--main-bg-color);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.copy-btn:hover {
  border-color: var(--action-color);
  color: var(--action-color);
}

.placeholder {
  background-color: var(--main-box-color);
  border-radius: 12px;
  padding: 60px 30px;
  text-align: center;
}

.placeholder p {
  color: var(--text-color);
  font-size: 18px;
  opacity: 0.7;
}
</style>
