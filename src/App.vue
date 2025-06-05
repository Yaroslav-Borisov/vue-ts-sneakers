<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";
import AppSearch from "./components/AppSearch.vue";
import AppCardList from "./components/AppCardList.vue";
import AppCartModal from "./components/AppCartModal.vue";
import { computed, provide, ref } from "vue";
import { PageState } from "./enums/PageState.ts";
import { useSearchCards } from "./composables/useSearchCards.ts";
import { useCards } from "./composables/useCards";
import { useFavorites } from "./composables/useFavorites.ts";
import { useCartModal } from "./composables/useCartModal.ts";

const pageState = ref<PageState>(PageState.All);

const { cards, getCardById, updateCard } = useCards();

const { favorites, toggleFavoritesCard } = useFavorites(
  cards,
  getCardById,
  updateCard
);

const {
  isModalVisible,
  cart,
  orderState,
  totalCartPrice,
  openCartModal,
  closeCartModal,
  toggleCartCard,
  removeFromCart,
  makeOrder,
} = useCartModal(cards, getCardById, updateCard);

const actualCards = computed(() => {
  return pageState.value === PageState.All ? cards.value : favorites.value;
});

provide("totalCartPrice", totalCartPrice);

const { searchText, filteredCards, updateSearchText } =
  useSearchCards(actualCards);

const changePageState = (newPageState: PageState) => {
  pageState.value = newPageState;
};
</script>

<template>
  <div class="page-wrapper">
    <AppHeader
      :pageState="pageState"
      :totalCartPrice="totalCartPrice"
      @openCartModal="openCartModal"
      @changePageState="changePageState"
    />
    <main class="page-content">
      <h1 class="page-content__title page-title">Все кроссовки</h1>
      <AppSearch v-model="searchText" @update:modelValue="updateSearchText" />
      <AppCardList
        :cards="filteredCards"
        @toggleFavoritesCard="toggleFavoritesCard"
        @toggleCartCard="toggleCartCard"
      />
    </main>
    <AppCartModal
      v-if="isModalVisible"
      :orderState="orderState"
      :cards="cart"
      @close="closeCartModal"
      @removeCardFromCart="removeFromCart"
      @makeOrder="makeOrder"
    />
  </div>
</template>
