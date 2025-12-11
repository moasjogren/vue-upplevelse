import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Checkout from "../views/Checkout.vue";
import Activity from "../views/Activity.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/checkout", name: "checkout", component: Checkout },
  { path: "/activity/:id", name: "activity", component: Activity },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
