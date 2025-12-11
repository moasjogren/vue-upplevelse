<template>
  <header>
    <div class="header-content">
      <section class="logo">
        <RouterLink to="/">
          <h1 class="header-logo">‘SCAPE</h1>
        </RouterLink>
        <svg
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#ffffffff"
        >
          <path
            d="M520-40v-240l-84-80-40 176-276-56 16-80 192 40 64-324-72 28v136h-80v-188l158-68q35-15 51.5-19.5T480-720q21 0 39 11t29 29l40 64q26 42 70.5 69T760-520v80q-66 0-123.5-27.5T540-540l-24 120 84 80v300h-80Zm20-700q-33 0-56.5-23.5T460-820q0-33 23.5-56.5T540-900q33 0 56.5 23.5T620-820q0 33-23.5 56.5T540-740Z"
          />
        </svg>
      </section>
      <nav>
        <button class="cart-checkout" @click="openCart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#F9EDEB"
          >
            <path
              d="m480-560-56-56 63-64H320v-80h167l-64-64 57-56 160 160-160 160ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"
            />
          </svg>
        </button>
      </nav>
      <CartModal :is-open="isCartOpen" @close="closeCart" />
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import CartModal from "./cartModal.vue";

const isCartOpen = ref(false);

const openCart = () => {
  isCartOpen.value = true;
};

const closeCart = () => {
  isCartOpen.value = false;
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  padding: 12px 0;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
}

a {
  text-decoration: none;
}

.header-content {
  display: flex;
  align-items: center;
  width: 80vw;
  justify-content: space-between;
}

.header-logo {
  margin: 0;
  font-size: 62px;
  color: var(--action-color);
}

.logo svg {
  width: 62px;
  height: 62px;
}

nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

nav a {
  color: var(--secondary-action-color);
  text-decoration: none;
  font-size: 21px;
  font-weight: 600;
  transition: 0.1s;
}

nav a:hover {
  color: var(--action-color);
}

button {
  all: unset;
  cursor: pointer;
  padding: 12px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition: 0.1s;
}

button svg {
  fill: var(--action-color);
  width: 36px;
  height: 36px;
}

button:hover {
  background-color: var(--main-box-color);
}
</style>
