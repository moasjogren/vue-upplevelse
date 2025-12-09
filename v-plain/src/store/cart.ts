import { defineStore } from "pinia";
import { ref } from "vue";
import type { Activity } from "../data/Activity.ts";

export type Cart = {
  items: Activity[];
};

export const useCartStore = defineStore(
  "cart",
  () => {
    const cart = ref<Cart>({ items: [] });

    return {
      cart,
      addItem(item: Activity) {
        cart.value.items.push(item);
      },
      removeItem(id: string) {
        cart.value.items = cart.value.items.filter((item) => item.id !== id);
      },
    };
  },
  {
    persist: true,
  }
);
