import { defineStore, storeToRefs } from "pinia";
import { computed, ref, type ComputedRef, type Ref } from "vue";
import { useCardStore } from "./CardStore";
import { useFavoritesStore } from "./FavoritesStore";
import type { Card } from "../types/Card";
import { PageRoute } from "../enums/PageRoute";

interface FilteredStore {
    searchText: Ref<string>,
    filteredCards: ComputedRef<Card[]>,
    updateSearchText: (text: string) => void,
    setCardsBasedOnRoute: (currentPath: string) => void
}

export const useFilteredStore = defineStore('filteredStore', (): FilteredStore => {

    const cardStore = useCardStore();
    const { cards } = storeToRefs(cardStore);

    const favoritesStore = useFavoritesStore();
    const { favorites } = storeToRefs(favoritesStore);

    const searchText = ref<string>("");
    const currentRoutePath = ref<string>(PageRoute.Main); // Добавьте reactive переменную для пути

    const actualCards = computed<Card[]>(() => {
        return currentRoutePath.value === PageRoute.Main ? cards.value : favorites.value;
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

    const setCardsBasedOnRoute = (path: string) => {
        currentRoutePath.value = path;
    };

    return {
        searchText,
        filteredCards,
        updateSearchText,
        setCardsBasedOnRoute
    };
});