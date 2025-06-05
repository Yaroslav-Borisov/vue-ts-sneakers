import { computed, ref, type Ref } from "vue"
import type { Card } from "../types/Card"
import { useRoute } from "vue-router";
import { PageRoute } from "../enums/PageRoute";

export const useSearch = (
    cards: Ref<Card[]>,
    favorites: Ref<Card[]>,
) => {

    const { path } = useRoute();

    const searchText = ref<string>('');

    const filteredCards = computed(() => {
        const currentSearchText = searchText.value.toLowerCase();
        let cardsToFilter: Card[] = [];

        if (path === PageRoute.Main) {
            cardsToFilter = cards.value;
        } else if (path === PageRoute.Favorites) {
            cardsToFilter = favorites.value;
        } else {
            return [];
        }

        if (currentSearchText) {
            return cardsToFilter.filter((card) =>
                card.title.toLowerCase().includes(currentSearchText)
            );
        } else {
            return cardsToFilter;
        }
    });

    return {
        searchText,
        filteredCards
    }
}