import { ref } from "vue"
import type { Card } from "../types/Card"
import { getElementById } from "../components/utils/getElementById";

export const useFavorites = (cards: Card[]) => {
    const favorites = ref(cards.filter(c => c.isFavorite === true))

    const addToFavorites = (id: number | string) => {
        const targetCard = getElementById(cards, id)
        if (targetCard) {
            favorites.value.push(targetCard)
        }
    }

    const removeFromFavorites = (id: number | string) => {
        favorites.value = favorites.value.filter((c) => c.id !== id);
    }

    const toggleFavoritesCard = (id: number | string) => {
        const targetCard = getElementById(cards, id)
        if (targetCard && favorites.value.includes(targetCard)) {
            removeFromFavorites(id);
        } else {
            addToFavorites(id);
        }
    };

    return {
        favorites,
        toggleFavoritesCard
    }
}