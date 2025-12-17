<script setup lang="ts">
import { ref } from 'vue'; 
import { useRouter } from "vue-router";

// import { computed } from "vue";
// import { useCartStore } from "../store/cart.ts";
// import type { Activity } from "../data/Activity.ts";

// const cartStore = useCartStore();
const router = useRouter();

const bookingData = localStorage.getItem("bookingData");
const bookingQuery = ref(bookingData ? JSON.parse(bookingData) : []);
console.log(bookingQuery);

function goBack() {
  router.go(-1);
}

const handleDelete = (id:string):void => {
  bookingQuery.value = bookingQuery.value.filter((item: any) => item.id !== id);
  localStorage.setItem("bookingData", JSON.stringify(bookingQuery.value));
}
</script>

<template>
  <div class="content-wrapper">
    <div class="title-container">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none">
          <g stroke-width="0"></g>
          <g stroke-linecap="round" stroke-linejoin="round"></g>
          <g>
          <path
            d="M5 12H19M19 12L13 6M19 12L13 18"
            stroke="#ffafc5"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          </g>
        </svg>
      </button>
      <svg
        height="36px"
        viewBox="0 -960 960 960"
        width="36px"
        fill="#F9EDEB"
      >
      <path
        d="m480-560-56-56 63-64H320v-80h167l-64-64 57-56 160 160-160 160ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"
      />
      </svg>
      <h1>Kundkorg</h1>
    </div>
    <div class="checkout-container">
      <ul class="checkout-lista" v-if="bookingQuery.length > 0">
        <li v-for="item in bookingQuery" :key="item.id"><!-- v-for="item in cartStore.cart.items" :key="item.id" -->
          <section class="item-header">
            <h3>{{item.title}}</h3> <!-- {{ item.title }} -->
            <div class="right-section">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                height="36px"
                viewBox="0 -1150 960 1260"
                width="21px"
                fill="#ffafc5"
              >
                <path
                  d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"
                />
              </svg>
              <p>{{ item.players }} x</p>
            </div>
            
          </section>
          <div class="indicators">
            <p v-if="item.selectedDate">{{item.selectedDate}}</p>
            <p v-else class="null">Inget datum valt</p>

            <p v-if="item.selectedTime">{{item.selectedTime}}</p>
            <p v-else class="null">Ingen tid vald</p>
          </div>
          
          <section class="add-ons" v-if="item.addOns && Object.values(item.addOns).some(v => v)"> 
            <h4>Tillägg</h4>
            <div class="indicators">
              <p v-if="item.addOns.hotel">+ Hotell<span></span>899 kr</p>
              <p v-if="item.addOns.vr">+ VR-upplevelse<span></span>189 kr</p>
              <p v-if="item.addOns.food">+ Mat<span></span>239 kr</p>
            </div>
          </section>
          <h3 class="total">Totalt:</h3>
          <div class="footer">
            <p class="total-price">{{ item.price }} kr</p>
            <button @click.prevent="handleDelete(item.id)" class="delete-btn"> <!-- @click="cartStore.removeItem(item.id)" -->
              <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/></svg>
            </button> 
          </div>
          <RouterLink :to="{ name: 'success' }" class="buy-btn">Betala</RouterLink>
        </li>
      </ul>

      <div v-else class="empty-cart">
        <p>Din varukorg är tom</p>
        <img src="../assets/undraw_void_wez2.svg" alt="void">
      </div>
    </div>
  </div>
</template>

<style scoped>
  .content-wrapper {
    display: flex;
    flex-direction: column;
    width: 80vw;
  }

  h3, h4 {
    font-weight: 500;
  }

  h3 {
    font-size: 24px;
  }

  .title-container {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--text-color);
  }

  .back-btn {
  background: none;
  border: none;
  text-decoration: none;
  padding: 0;
  cursor: pointer;

  width: 46px;
  transform: rotate(180deg);
}

.back-btn svg {
  width: 48px;
  transition: 0.2s;
}

.back-btn svg:hover {
  margin-left: 10px;
}

.checkout-container {
  display: flex;
  flex-direction: column;
}

ul {
  all: unset;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 50%;
  align-self: center;
}

li {
  list-style: none;
  display: flex;
  flex-direction: column;
  background-color: var(--main-box-color);
  color: var(--text-color);
  padding: 16px 24px;
  border-radius: 8px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-header p {
  font-size: 21px;
  font-weight: 500;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 6px;
}

.right-section p {
  font-size: 18px;
  color: var(--text-color);
}

.add-ons {
  margin-top: 24px;
  border-top: 2px dashed var(--transparent-color)
}

.add-ons h4 {
  margin: 12px 0 8px 4px;
}

.indicators {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.indicators p {
  padding: 6px 24px;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.2);
  color: var(--secondary-action-color);
}

.indicators p span {
  border-left: solid 2px var(--transparent-color);
  margin: 0 12px;
}

.total {
  margin-top: 12px;
}

li .footer {
  display: flex;
  margin-top: -8px;
  justify-content: space-between;
}

li .total-price {
  font-size: 28px;
  font-weight: 500;
  color: var(--action-color);
  align-self: flex-end;
}

button {
  all: unset;
  cursor: pointer;
}

.delete-btn {
  padding: 7px 12px 2px 12px;
  border-radius: 4px;
  transition: 0.2s;
}

.delete-btn svg {
  fill: var(--transparent-color);
}

.delete-btn:hover {
  background-color: rgb(119, 0, 64)
}

.buy-btn {
  width: 100%;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  color: var(--main-bg-color);
  background-color: var(--secondary-action-color);
  padding: 8px 0;
  border-radius: 8px;
  margin-top: 12px;
  transition: 0.2s;
}

.buy-btn:hover {
  background-color: var(--action-color);
}

.empty-cart {
  text-align: center;
  color: var(--transparent-color);
  font-style: italic;
}

.empty-cart img {
  width: 400px;
  margin: 48px 0;
}

.null{
  font-style: italic;
  opacity: 0.8;
}
</style>