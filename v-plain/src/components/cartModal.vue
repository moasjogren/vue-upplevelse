<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const cartItems = ref([
  {
    id: 1,
    name: "Rum 1",
    price: 700,
    image: "https://picsum.photos/seed/room1/80/80",
    quantity: 1,
    category: "Escape Rooms",
  },
  {
    id: 2,
    name: "Rum 2",
    price: 850,
    image: "https://picsum.photos/seed/room2/80/80",
    quantity: 1,
    category: "Escape Rooms",
  },
  {
    id: 3,
    name: "Rum 3",
    price: 600,
    image: "https://picsum.photos/seed/room3/80/80",
    quantity: 1,
    category: "Escape Rooms",
  },
]);

const totalPrice = computed(() => {
  return cartItems.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

const closeCart = () => {
  emit("close");
};

const increaseQuantity = (id) => {
  const item = cartItems.value.find((item) => item.id === id);
  if (item) item.quantity++;
};

const decreaseQuantity = (id) => {
  const item = cartItems.value.find((item) => item.id === id);
  if (item && item.quantity > 1) item.quantity--;
};

const removeItem = (id) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== id);
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
          <div v-if="cartItems.length === 0" class="empty-cart">
            <p>Din varukorg är tom.</p>
          </div>
          <div v-else>
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <img :src="item.image" :alt="item.name" />
              <div class="item-details">
                <h3>{{ item.name }}</h3>
                <p class="item-category">{{ item.category }}</p>
                <div class="item-quantity">
                  <button @click="decreaseQuantity(item.id)">-</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="increaseQuantity(item.id)">+</button>
                </div>
              </div>
              <div class="item-price">
                <p>{{ item.price * item.quantity }} kr</p>
                <button @click="removeItem(item.id)">Ta bort</button>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-footer" v-if="cartItems.length > 0">
          <div class="total">
            <span>Totalt:</span>
            <span class="total-price">{{ totalPrice }} kr</span>
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
  margin: 0 0 4px 0;
  font-size: 16px;
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
  width: 100%;
  padding: 14px;
  background: var(--action-color);
  color: white;
  text-align: center;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  transition: 0.2s;
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
