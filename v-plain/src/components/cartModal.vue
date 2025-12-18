<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import type { Activity } from "../data/Activity.ts";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const bookingData = ref<Activity[]>([]);

const totalPrice = computed(() => {
  return bookingData.value.reduce((total, item) => total + item.price, 0);
});

const closeCart = () => {
  emit("close");
};

const removeItem = (id: string) => {
  bookingData.value = bookingData.value.filter((item) => item.id !== id);

  if (bookingData.value.length > 0) {
    localStorage.setItem("bookingData", JSON.stringify(bookingData.value));
  } else {
    localStorage.removeItem("bookingData");
  }
};

const loadBookingData = () => {
  const storedData = localStorage.getItem("bookingData");
  if (storedData) {
    try {
      bookingData.value = JSON.parse(storedData);
      console.log("Loaded booking data:", bookingData.value);
    } catch (error) {
      console.error("Failed to parse booking data:", error);
    }
  }
};

onMounted(() => {
  loadBookingData();
});

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      loadBookingData();
    }
  }
);
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click="closeCart">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Din varukorg</h2>
          <button @click="closeCart" class="close-btn">X</button>
        </div>
        <div class="cart-items">
          <div v-if="bookingData.length === 0" class="empty-cart">
            <p>Din varukorg är tom.</p>
          </div>
          <div v-else>
            <div v-for="item in bookingData" :key="item.id" class="cart-item">
              <img :src="item.imgLink" :alt="item.title" />
              <div class="item-details">
                <h3>{{ item.title }}</h3>
                <p class="item-description">{{ item.description }}</p>
                <div class="item-info">
                  <span class="info-badge"
                    >Svårighet: {{ item.difficulty }}/5</span
                  >
                  <span class="info-badge"
                    >Antal personer: {{ item.capacity }}</span
                  >
                  <span class="info-badge">Ålder: {{ item.ageRange }}+</span>
                  <span class="info-badge">Tid: {{ item.duration }} min</span>
                </div>
              </div>
              <div class="item-price">
                <p>{{ item.price }} kr</p>
                <button @click="removeItem(item.id)" class="delete-btn">
                  <svg
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                  >
                    <path
                      d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-footer" v-if="bookingData.length > 0">
          <div class="total">
            <span>Totalt:</span>
            <span class="total-price">{{ totalPrice }} kr</span>
          </div>
          <div class="checkout-center">
            <RouterLink
              :to="'/checkout'"
              @click="closeCart"
              class="checkout-btn"
              >Till Kassan</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: var(--main-bg-color);
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--transparent-color);
}
.modal-header h2 {
  margin: 0;
  color: var(--action-color);
}

.close-btn {
  all: unset;
  cursor: pointer;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  transition: 0.2s;
  color: var(--action-color);
}

.close-btn:hover {
  background-color: var(--main-box-color);
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.empty-cart {
  text-align: center;
  font-style: italic;
  padding: 40px 20px;
  color: var(--transparent-color);
}

.cart-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background-color: var(--main-box-color);
  border-radius: 8px;
  margin-bottom: 12px;
  transition: 0.2s;
}

.cart-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.item-description {
  color: var(--text-color);
  font-size: 14px;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.item-info {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.info-badge {
  background-color: rgba(0, 0, 0, 0.2);
  color: var(--secondary-action-color);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.item-category {
  color: var(--text-color);
  font-size: 14px;
  margin: 0 0 12px 0;
}

.item-quantity {
  display: flex;
  gap: 12px;
  align-items: center;
}

.item-details {
  color: var(--action-color);
}

.item-quantity button {
  all: unset;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--action-color);
  color: white;
  border-radius: 4px;
  font-weight: bold;
  transition: 0.2s;
}

.item-price {
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-price p {
  margin: 0;
  font-weight: 600;
  font-size: 18px;
  color: var(--action-color);
}

.cart-footer {
  padding: 20px 24px;
  border-top: 1px solid var(--transparent-color);
  align-items: center;
}
.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 500;
  color: var(--text-color);
}

.total-price {
  color: var(--action-color);
}

.checkout-btn {
  all: unset;
  cursor: pointer;
  width: 50%;
  padding: 14px;
  background: var(--secondary-action-color);
  color: var(--main-bg-color);
  text-align: center;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  transition: 0.2s;
}

.checkout-btn:hover {
  background-color: var(--action-color);
}

.delete-btn {
  all: unset;
  display: flex;
  justify-content: center;
  padding: 12px 0;
  border-radius: 4px;
  transition: 0.2s;
}

.delete-btn svg {
  fill: var(--transparent-color);
}

.delete-btn:hover {
  background-color: rgb(119, 0, 64);
}

.checkout-center {
  display: flex;
  justify-content: center;
}

/* Transition animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}
</style>
