import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Activity } from "../data/Activity.ts";

export type SearchFilters = {
  searchQuery: string;
  difficulty: number | null;
  minAge: number | null;
  maxPrice: number | null;
  minDuration: number | null;
  maxDuration: number | null;
  maxPlayers: number | null;
  minPlayers: number | null;
};

export const useSearchStore = defineStore("search", () => {
  const searchQuery = ref<string>("");

  const difficulty = ref<number | null>(null);
  const minAge = ref<number | null>(null);
  const maxPrice = ref<number | null>(null);
  const minDuration = ref<number | null>(null);
  const maxDuration = ref<number | null>(null);
  const maxPlayers = ref<number | null>(null);
  const minPlayers = ref<number | null>(null);

  const allActivities = ref<Activity[]>([]);

  const filteredActivities = computed((): Activity[] => {
    return allActivities.value.filter((activity) => {
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        const matchesSearch =
          activity.title.toLowerCase().includes(query) ||
          activity.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      if (
        difficulty.value !== null &&
        activity.difficulty !== difficulty.value
      ) {
        return false;
      }

      if (minAge.value !== null && activity.age < minAge.value) {
        return false;
      }

      if (maxPrice.value !== null && activity.price > maxPrice.value) {
        return false;
      }

      if (minDuration.value !== null && activity.duration < minDuration.value) {
        return false;
      }
      if (maxDuration.value !== null && activity.duration > maxDuration.value) {
        return false;
      }
      if (maxPlayers.value !== null && activity.players > maxPlayers.value) {
        return false;
      }

      if (minPlayers.value !== null && activity.players < minPlayers.value) {
        return false;
      }

      return true;
    });
  });

  const setSearchQuery = (query: string): void => {
    searchQuery.value = query;
  };

  const setDifficulty = (value: number | null): void => {
    difficulty.value = value;
  };

  const setMinAge = (value: number | null): void => {
    minAge.value = value;
  };

  const setMaxPrice = (value: number | null): void => {
    maxPrice.value = value;
  };

  const setPlayersRange = (min: number | null, max: number | null): void => {
    minPlayers.value = min;
    maxPlayers.value = max;
  };

  const setDurationRange = (min: number | null, max: number | null): void => {
    minDuration.value = min;
    maxDuration.value = max;
  };

  const setActivities = (activities: Activity[]): void => {
    allActivities.value = activities;
  };

  const clearFilters = (): void => {
    searchQuery.value = "";
    difficulty.value = null;
    minAge.value = null;
    maxPrice.value = null;
    minDuration.value = null;
    maxDuration.value = null;
  };

  return {
    searchQuery,
    difficulty,
    minAge,
    maxPrice,
    minDuration,
    maxDuration,
    minPlayers,
    maxPlayers,
    allActivities,

    filteredActivities,

    setSearchQuery,
    setDifficulty,
    setMinAge,
    setMaxPrice,
    setPlayersRange,
    setDurationRange,
    setActivities,
    clearFilters,
  };
});
