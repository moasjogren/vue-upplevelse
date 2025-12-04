import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Checkout from "../views/Checkout.vue";
import Activity from "../views/Activity.vue";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/about", name: "about", component: About },
  { path: "/checkout", name: "checkout", component: Checkout },
  { path: "/activity/:id", name: "activity", component: Activity },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
