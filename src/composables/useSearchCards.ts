import { computed, ref, type Ref } from "vue";
import type { Card } from "../types/Card";

export const useSearchCards = (cards: Ref<Card[]>) => {
  const searchText = ref<string>("");

  const filteredCards = computed(() => {
    if (searchText.value.length === 0) {
      return cards.value;
    }

    return cards.value.filter((c) =>
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
};
