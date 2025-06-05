import type { Ref } from "vue";
import type { Card } from "../types/Card";
import { useCart } from "./useCart";
import { useModal } from "./useModal";

export const useCartModal = (
  cards: Ref<Card[]>,
  getCardById: (id: number) => Card | undefined,
  updateCard: (id: number, card: Partial<Card>) => void
) => {
  const { isModalVisible, openModal, closeModal } = useModal();

  const {
    cart,
    orderState,
    totalCartPrice,
    toggleCartCard,
    removeFromCart,
    resetCart,
    makeOrder,
  } = useCart(cards, getCardById, updateCard);

  const openCartModal = () => {
    openModal();
  };

  const closeCartModal = () => {
    closeModal();
    resetCart();
  };

  return {
    isModalVisible,
    cart,
    orderState,
    totalCartPrice,
    openCartModal,
    closeCartModal,
    toggleCartCard,
    removeFromCart,
    makeOrder,
  };
};
