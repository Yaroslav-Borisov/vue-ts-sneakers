import { computed, type Ref } from "vue";
import type { Card } from "../types/Card";

export const useFavorites = (
  cards: Ref<Card[]>,
  getCardById: (id: number) => Card | undefined,
  updateCard: (id: number, card: Partial<Card>) => void
) => {
  const favorites = computed<Card[]>(() => {
    return cards.value.filter((c) => c.isFavorite);
  });

  const toggleFavoritesCard = (id: number) => {
    const targetCard = getCardById(id);

    if (targetCard) {
      updateCard(id, {
        isFavorite: !targetCard.isFavorite,
      });
    }
  };

  return {
    favorites,
    toggleFavoritesCard,
  };
};
