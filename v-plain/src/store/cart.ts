import { defineStore } from "pinia";
import {ref} from "vue";

export type Item = {
    id: string,
    name: string,
    description: string
}  

export type Cart = {
    items: Item[]
}

export const useCartStore = defineStore('cart', () => {
    const cart = ref<Cart>({ items: [] })

    return {
        cart,
        addItem(item: Item) {
            cart.value.items.push(item)
        },
        removeItem(id: String) {
            cart.value.items = cart.value.items.filter(item => item.id !== id)
        }
    }
}, {
    persist: true
})


