<script setup lang="ts">
import { ref, computed } from "vue";
import type {Activity} from '../data/Activity.ts'

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const activityList = ref<Activity[]>([
    {
        activityId: "hdsh3w421sho12",
        imgLink: "https://tse3.mm.bing.net/th/id/OIP.uF4xhcEH4QKRB9cX8sMSeAHaFA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        title: "Test Title",
        description: "Lorem Ipsum test text hihi when lorem ipsum went ipsum dipsum",
        difficulty: 3,
        capacity: "3-6",
        age: 12,
        duration: 90,
        price: 319,
    }
])

const totalPrice = computed(() => {
  return activityList.value.reduce(
    (total, item) => total + item.price,
    0
  );
});

const closeCart = () => {
  emit("close");
};


const removeItem = (id: string) => {
  activityList.value = activityList.value.filter((item) => item.activityId !== id);
};
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
          <div v-if="activityList.length === 0" class="empty-cart">
            <p>Din varukorg är tom.</p>
          </div>
          <div v-else>
            <div v-for="item in activityList" :key="item.activityId" class="cart-item">
              <img :src="item.imgLink" :alt="item.title" />
              <div class="item-details">
                <h3>{{ item.title }}</h3>
                <p class="item-description">{{ item.description }}</p>
                <div class="item-info">
                  <span class="info-badge">Svårighet: {{ item.difficulty }}/5</span>
                  <span class="info-badge">Antal personer: {{ item.capacity }}</span>
                  <span class="info-badge">Ålder: {{ item.age }}+</span>
                  <span class="info-badge">Tid: {{ item.duration }} min</span>
                </div>
              </div>
              <div class="item-price">
                <p>{{ item.price }} kr</p>
                <button @click="removeItem(item.activityId)">Ta bort</button>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-footer" v-if="activityList.length > 0">
          <div class="total">
            <span>Totalt:</span>
            <span class="total-price">{{ totalPrice }} kr</span>
          </div>
          <div class="checkout-center">
          <button class="checkout-btn">Till Kassan</button>
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
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
}
.modal-header h2 {
  margin: 0;
  color: #FF56A2;
}

.close-btn {
  all: unset;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  transition: 0.2s;
  color: #FF56A2
}

.close-btn:hover {
  background-color: #f5f5f5;
  
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.empty-cart {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.cart-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 12px;
  transition: 0.2s;
}

.cart-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  color: #666;
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
  background-color: #f0f0f0;
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.item-category {
  color: #666;
  font-size: 14px;
  margin: 0 0 12px 0;
}

.item-quantity {
  display: flex;
  gap: 12px;
  align-items: center;
}

.item-details{
    color: #FF56A2;
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

.item-quantity button:hover {
  opacity: 0.8;
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
  color: #FF56A2;
}

.remove-btn {
  all: unset;
  cursor: pointer;
  color: #e74c3c;
  font-size: 14px;
  transition: 0.2s;
}

.remove-btn:hover {
  text-decoration: underline;
}

.cart-footer {
  padding: 20px 24px;
  border-top: 1px solid #eee;
  align-items: center;
}
.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 600;
  color:#FF56A2;
}

.total-price {
  color: var(--action-color);
}

.checkout-btn {
  all: unset;
  cursor: pointer;
  width: 50%;
  padding: 14px;
  background: var(--action-color);
  color: white;
  text-align: center;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  transition: 0.2s;
  
}

.item-price button {
  all: unset;
  cursor: pointer;
  color:#FF56A2;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: 0.2s;
  font-weight: 500;
  
}

.item-price button:hover {
  background-color: #ffe5e5;
  text-decoration: underline;
}

.checkout-center{
    display: flex;
    justify-content: center
}

.checkout-btn:hover {
  opacity: 0.9;
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
