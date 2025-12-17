import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Checkout from "../views/Checkout.vue";
import Activity from "../views/Activity.vue";
import StoryGenerator from "../views/StoryGenerator.vue";
import BookingSuccess from "../views/BookingSuccess.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/checkout", name: "checkout", component: Checkout },
  { path: "/activity/:id", name: "activity", component: Activity },
  { path: "/story", name: "story", component: StoryGenerator },
  { path: "/booking-success", name: "success", component: BookingSuccess },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
