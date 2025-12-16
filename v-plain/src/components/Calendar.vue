<template>
  <div class="calendar-input">
    <input
      :id="inputId"
      type="date"
      :value="modelValue"
      :min="minDate"
      :max="maxDate"
      @input="updateValue"
      class="calendar-field"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue?: string;
  label?: string;
  minDate?: string;
  maxDate?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  label: "",
  minDate: (() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  })(),
  maxDate: (() => {
    const endDate = new Date("December 31, 2027 01:00:00");
    return endDate.toISOString().split("T")[0];
  })(),
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const inputId = computed(() => {
  return `calendar-${Math.random().toString(36).substr(2, 9)}`;
});

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<style scoped>
.calendar-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.calendar-label {
  font-weight: 500;
  color: #333;
  font-size: 0.95rem;
}

.calendar-field {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.calendar-field:hover {
  border-color: #999;
}

.calendar-field:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.calendar-field:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
</style>
