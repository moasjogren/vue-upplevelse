import { defineStore } from "pinia";
import {ref} from "vue";

type ForWho = 'Kid' | 'Adult' | 'Senior'

 export type Item = {
    id: string,
    name: string,
    description: string,
    price: number,
    amountOfPeople: number,
    forWho: ForWho,
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
        removeItem(id: string) {
            cart.value.items = cart.value.items.filter(item => item.id !== id)
        }
    }
}, {
    persist: true
})


