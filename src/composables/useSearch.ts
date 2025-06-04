import { computed, ref, type Ref } from "vue"
import type { Card } from "../types/Card"
import { PageState } from "../enums/PageState";

export const useSearch = (
    cards: Ref<Card[]>,
    favorites: Ref<Card[]>,
    pageState: Ref<PageState>) => {

    const searchText = ref<string>('');

    const filteredCards = computed(() => {
        const currentSearchText = searchText.value.toLowerCase();
        const currentPageState = pageState.value;

        switch (currentPageState) {
            case PageState.All:
                return cards.value.filter((card) =>
                    card.title.toLowerCase().includes(currentSearchText)
                );
            case PageState.Favorite:
                return favorites.value.filter((card) =>
                    card.title.toLowerCase().includes(currentSearchText)
                );
            default:
                return cards.value;
        }
    });

    return {
        searchText,
        filteredCards
    }
}