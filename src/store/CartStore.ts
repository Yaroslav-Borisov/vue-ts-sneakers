import { defineStore, storeToRefs } from "pinia";
import { computed, ref, type ComputedRef, type Ref } from "vue";
import type { Card } from "../types/Card";
import { useCardStore } from "./CardStore";
import { useModal } from "../composables/useModal";
import { OrderState } from "../enums/OrderState";

interface CartStore {
    cart: ComputedRef<Card[]>,
    orderState: Ref<OrderState, OrderState>,
    totalCartPrice: ComputedRef<number>,
    isModalVisible: Ref<boolean, boolean>,
    toggleCartCard: (id: number) => void,
    removeFromCart: (id: number) => void,
    resetCart: () => void,
    makeOrder: () => void,
    openCartModal: () => void,
    closeCartModal: () => void,
}

export const useCartStore = defineStore('cartStore', (): CartStore => {
    const cardStore = useCardStore();
    const { cards } = storeToRefs(cardStore)
    const { getCardById, updateCard } = useCardStore()


    const { isModalVisible, openModal, closeModal } = useModal();
    const orderState = ref<OrderState>(OrderState.Processing);

    const cart = computed<Card[]>(() => {
        return cards.value.filter((c) => c.isCart);
    });

    const totalCartPrice = computed(() => {
        return cart.value.reduce((acc, c) => acc + c.price, 0);
    });

    const toggleCartCard = (id: number) => {
        const targetCard = getCardById(id);
        if (targetCard) {
            updateCard(id, { isCart: !targetCard.isCart });
            // orderState.value = OrderState.Processing
        }
    };

    const removeFromCart = (id: number) => {
        const targetCard = getCardById(id);
        if (targetCard) {
            updateCard(id, { isCart: false });
        }
    };

    const resetCart = () => {
        cart.value.forEach((c) => {
            updateCard(c.id, { isCart: false });
        });
    };

    const makeOrder = () => {
        orderState.value = OrderState.Done;
        resetCart();
    };

    const openCartModal = () => {
        openModal();
    };

    const closeCartModal = () => {
        closeModal();
        orderState.value = OrderState.Processing
    };

    return {
        cart,
        orderState,
        totalCartPrice,
        isModalVisible,
        toggleCartCard,
        removeFromCart,
        resetCart,
        makeOrder,
        openCartModal,
        closeCartModal,
    }
})