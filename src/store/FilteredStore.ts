import { defineStore, storeToRefs } from "pinia";
import { computed, ref, type ComputedRef, type Ref } from "vue";
import { useCardStore } from "./CardStore";
import { PageState } from "../enums/PageState";
import { usePageStateStore } from "./PageStateStore";
import { useFavoritesStore } from "./FavoritesStore";
import type { Card } from "../types/Card";

interface FilteredStore {
    searchText: Ref<string>,
    filteredCards: ComputedRef<Card[]>,
    updateSearchText: (text: string) => void,
}

export const useFilteredStore = defineStore('filteredStore', (): FilteredStore => {
    const cardStore = useCardStore();
    const { cards } = storeToRefs(cardStore);

    const favoritesStore = useFavoritesStore();
    const { favorites } = storeToRefs(favoritesStore);

    const pageStateStore = usePageStateStore();
    const { pageState } = storeToRefs(pageStateStore);

    const searchText = ref<string>("");

    const actualCards = computed<Card[]>(() => {
        return pageState.value === PageState.All ? cards.value : favorites.value;
    });

    const filteredCards = computed<Card[]>(() => {
        if (searchText.value.length === 0) {
            return actualCards.value;
        }

        return actualCards.value.filter((c) =>
            c.title.toLowerCase().includes(searchText.value.toLowerCase())
        );
    });

    const updateSearchText = (text: string) => {
        searchText.value = text;
    };

    return {
        searchText,
        filteredCards,
        updateSearchText,
    };
});