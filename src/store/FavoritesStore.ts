import { defineStore, storeToRefs } from "pinia";
import { computed, type ComputedRef } from "vue";
import type { Card } from "../types/Card";
import { useCardStore } from "./CardStore";

interface FavoritesStore {
    favorites: ComputedRef<Card[]>,
    toggleFavoritesCard: (id: number) => void
}

export const useFavoritesStore = defineStore('favoritesStore', (): FavoritesStore => {
    const cardStore = useCardStore();
    const { cards } = storeToRefs(cardStore)
    const { getCardById, updateCard } = useCardStore()

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
})