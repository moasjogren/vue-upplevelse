<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "../store/cart.ts";
import type { Activity } from "../data/Activity.ts";

const cartStore = useCartStore();

const totalPrice = computed((): number => {
  return cartStore.cart.items.reduce((sum: number, item: Activity) => {
    return sum + item.price;
  }, 0);
});

const buyAll = (): void => {
  console.log("Bought all items");
};
</script>

<template>
  <h1>Checkout</h1>
  <div class="checkout-container">
    <ul class="checkout-lista">
      <li v-for="item in cartStore.cart.items" :key="item.id">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <p>{{ item.price }}</p>
        <button @click="cartStore.removeItem(item.id)">Remove Item</button>
      </li>
    </ul>
    <p>{{ totalPrice }}</p>
    <button @click="buyAll">Buy All</button>
  </div>
</template>
