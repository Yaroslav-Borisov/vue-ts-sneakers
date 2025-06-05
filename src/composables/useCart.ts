import { computed, ref, type Ref } from "vue";
import type { Card } from "../types/Card";

export enum OrderState {
  Done = "done",
  Processing = "processing",
}

export const useCart = (
  cards: Ref<Card[]>,
  getCardById: (id: number) => Card | undefined,
  updateCard: (id: number, card: Partial<Card>) => void
) => {
  const cart = computed<Card[]>(() => {
    return cards.value.filter((c) => c.isCart);
  });

  const toggleCartCard = (id: number) => {
    const targetCard = getCardById(id);
    if (targetCard) {
      updateCard(id, { isCart: !targetCard.isCart });
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

  const orderState = ref<OrderState>(OrderState.Processing);

  const makeOrder = () => {
    orderState.value = OrderState.Done;
  };

  const totalCartPrice = computed(() => {
    return cart.value.reduce((acc, c) => acc + c.price, 0);
  });

  return {
    cart,
    toggleCartCard,
    removeFromCart,
    resetCart,
    orderState,
    makeOrder,
    totalCartPrice,
  };
};
