import { computed, ref, type Ref } from "vue"
import type { Card } from "../types/Card"
import { getElementById } from "../components/utils/getElementById";

export enum CartState {
    Done = 'done',
    Processing = 'processing',
    Empty = 'empty'
}

export const useCart = (cards: Ref<Card[]>) => {
    const cart = computed<Card[]>(() => cards.value.filter(c => c.isCart));
    const cartState = ref<CartState>(cart.value.length > 0 ? CartState.Processing : CartState.Empty)

    const totalCartPrice = computed(() => {
        return cart.value.reduce((total, card) => total + card.price, 0);
    });

    const addToCart = (id: number | string) => {
        const targetCard = getElementById(cards.value, id)

        if (targetCard) {
            targetCard.isCart = true
            cartState.value = CartState.Processing
        }
    }

    const removeFromCart = (id: number | string) => {
        const targetCard = getElementById(cards.value, id)

        if (targetCard) {
            targetCard.isCart = false
            cartState.value = CartState.Processing
        }

        if (cart.value.length === 0) {
            cartState.value = CartState.Empty;
        }
    }

    const toggleCartCard = (id: number | string) => {
        if (cart.value.some((card) => card.id === id)) {
            removeFromCart(id)
        } else {
            addToCart(id)
        }
    };

    const makeOrder = () => {
        cards.value = cards.value.map(card => ({ ...card, isCart: false }))
        cartState.value = CartState.Done
    }

    const resetCartState = () => {
        cartState.value = CartState.Empty
    }

    return {
        cart,
        cartState,
        totalCartPrice,
        removeFromCart,
        toggleCartCard,
        makeOrder,
        resetCartState
    }
}