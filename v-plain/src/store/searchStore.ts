import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Activity } from "../data/Activity.ts";

export type SearchFilters = {
  difficulty: number | null;
  minAge: number | null;
  maxPrice: number | null;
  ageRange: "barn" | "vuxen" | "senior";
  selectedDate: string | null;
  minDuration: number | null;
  maxDuration: number | null;
  players: number;
};

export const useSearchStore = defineStore("search", () => {
  const difficulty = ref<number | null>(null);
  const minAge = ref<number | null>(null);
  const maxPrice = ref<number | null>(null);
  const minDuration = ref<number | null>(null);
  const maxDuration = ref<number | null>(null);
  const ageRange = ref<string | null>(null);
  const selectedDate = ref<string>("");
  const players = ref<number>(2);

  const activeDifficulty = ref<number | null>(null);
  const activeAgeRange = ref<string | null>(null);
  const activeSelectedDate = ref<string>("");
  const activeMaxPrice = ref<number | null>(null);
  const activeMinDuration = ref<number | null>(null);
  const activeMaxDuration = ref<number | null>(null);
  const activePlayers = ref<number>(2);

  const allActivities = ref<Activity[]>([]);

  const filteredActivities = computed((): Activity[] => {
    return allActivities.value.filter((activity) => {
      if (
        activeDifficulty.value !== null &&
        activity.difficulty !== activeDifficulty.value
      ) {
        return false;
      }

      if (activeAgeRange.value !== null) {
        if (activity.ageRange !== activeAgeRange.value) {
          return false;
        }
      }

      if (
        activeMaxPrice.value !== null &&
        activity.price > activeMaxPrice.value
      ) {
        return false;
      }

      if (
        activeMinDuration.value !== null &&
        activity.duration < activeMinDuration.value
      ) {
        return false;
      }
      if (
        activeMaxDuration.value !== null &&
        activity.duration > activeMaxDuration.value
      ) {
        return false;
      }

      // Filtrera baserat på antal spelare vs aktivitetens kapacitet
      if (activePlayers.value > activity.capacity) {
        return false;
      }

      return true;
    });
  });

  const setDifficulty = (value: number | null): void => {
    difficulty.value = value;
  };

  const setAgeRange = (value: string | null): void => {
    ageRange.value = value;
  };

  const setMaxPrice = (value: number | null): void => {
    maxPrice.value = value;
  };

  const setDurationRange = (min: number | null, max: number | null): void => {
    minDuration.value = min;
    maxDuration.value = max;
  };

  const setActivities = (activities: Activity[]): void => {
    allActivities.value = activities;
  };

  const applyFilters = () => {
    activeDifficulty.value = difficulty.value;
    activeAgeRange.value = ageRange.value;
    activeSelectedDate.value = selectedDate.value;
    activeMaxPrice.value = maxPrice.value;
    activeMinDuration.value = minDuration.value;
    activeMaxDuration.value = maxDuration.value;
    activePlayers.value = players.value;
  };

  const clearFilters = (): void => {
    difficulty.value = null;
    ageRange.value = null;
    minAge.value = null;
    selectedDate.value = "";
    maxPrice.value = null;
    minDuration.value = null;
    maxDuration.value = null;
    players.value = 2;
    activeDifficulty.value = null;
    activeAgeRange.value = null;
    activeSelectedDate.value = "";
    activeMaxPrice.value = null;
    activeMinDuration.value = null;
    activeMaxDuration.value = null;
    activePlayers.value = 2;
  };

  return {
    difficulty,
    ageRange,
    selectedDate,
    maxPrice,
    minDuration,
    maxDuration,
    players,
    allActivities,
    filteredActivities,

    setDifficulty,
    setAgeRange,
    setMaxPrice,
    setDurationRange,
    setActivities,
    applyFilters,
    clearFilters,
  };
});
