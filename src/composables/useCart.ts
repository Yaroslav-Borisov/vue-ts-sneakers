import { computed, ref } from "vue"
import type { Card } from "../types/Card"
import { getElementById } from "../components/utils/getElementById";

export enum CartState {
    Done = 'done',
    Processing = 'processing',
    Empty = 'empty'
}

export const useCart = (cards: Card[]) => {
    const cart = ref<Card[]>(cards.filter(c => c.isCart));
    const cartState = ref<CartState>(cart.value.length > 0 ? CartState.Processing : CartState.Empty)

    const totalCartPrice = computed(() => {
        return cart.value.reduce((total, card) => total + card.price, 0);
    });

    const addToCart = (id: number | string) => {
        const targetCard = getElementById(cards, id)
        if (targetCard) {
            cart.value.push(targetCard)
            cartState.value = CartState.Processing
        }
    }

    const removeFromCart = (id: number | string) => {
        cart.value = cart.value.filter((c) => c.id !== id);
        if (cart.value.length === 0) {
            cartState.value = CartState.Empty;
        }
    }

    const toggleCartCard = (id: number | string) => {
        const targetCard = getElementById(cards, id)
        if (targetCard && cart.value.includes(targetCard)) {
            removeFromCart(id);
        } else {
            addToCart(id);
        }
    };

    const makeOrder = () => {
        console.log('заказ сделан')
        cart.value = [];
        cartState.value = CartState.Done
    }

    const resetCartState = () => {
        cartState.value = CartState.Empty
    }

    return {
        cart,
        cartState,
        totalCartPrice,
        addToCart,
        removeFromCart,
        toggleCartCard,
        makeOrder,
        resetCartState
    }
}