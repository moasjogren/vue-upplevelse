<script setup lang="ts">
import {useCartStore} from '../store/cart.ts'

const cartStore = useCartStore()

const buyAll = () => {
    console.log("Bought all items")
}

</script>

<template>
  <h1>Checkout</h1>
  <div class="checkout-container">
    <ul class="checkout-lista">
        <li v-for="item in cartStore.cart.items" :key="item.id">
           <h3>{{ item.name }}</h3>
           <p>{{ item.description }}</p>
           <button @click="() => cartStore.removeItem(item.id)">Remove Item</button>
        </li>
    </ul>
    <button @click="() => buyAll"></button>
  </div>
</template>
