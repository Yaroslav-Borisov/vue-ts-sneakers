import { computed, type Ref } from "vue"
import type { Card } from "../types/Card"
import { getElementById } from "../components/utils/getElementById";

export const useFavorites = (cards: Ref<Card[]>) => {
    const favorites = computed<Card[]>(() => {
        return cards.value.filter(c => c.isFavorite);
    });

    const toggleFavoritesCard = (id: number | string) => {
        const targetCard = getElementById(cards.value, id);

        if (targetCard) {
            targetCard.isFavorite = !targetCard.isFavorite;
        }
    };

    return {
        favorites,
        toggleFavoritesCard
    }
}