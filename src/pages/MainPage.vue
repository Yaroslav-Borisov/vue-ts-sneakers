<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
import AppSearch from '../components/AppSearch.vue';
import AppCardList from '../components/AppCardList.vue';
import AppCartModal from '../components/AppCartModal.vue';
import { useModal } from '../composables/useModal';
import { useCart } from '../composables/useCart';
import { useFavorites } from '../composables/useFavorites';
import { useSearch } from '../composables/useSearch';
import { onMounted, ref } from 'vue';
import { getCards } from '../api/getCards';
import type { Card } from '../types/Card';

const cards = ref<Card[]>([]);

const { isModalVisible, openModal, closeModal } = useModal();
const {
  cart,
  cartState,
  totalCartPrice,
  removeFromCart,
  toggleCartCard,
  makeOrder,
  resetCartState,
} = useCart(cards);
const { favorites, toggleFavoritesCard } = useFavorites(cards);
const { searchText, filteredCards } = useSearch(cards, favorites);

onMounted(async () => {
  try {
    cards.value = await getCards();
  } catch (err) {
    console.error(err);
  }
});

const openCartModal = () => {
  openModal();
};

const closeCartModal = () => {
  closeModal();
  resetCartState();
};
</script>

<template>
  <div class="page-wrapper">
    <AppHeader :totalCartPrice="totalCartPrice" @openCartModal="openCartModal" />
    <main class="page-content">
      <h1 class="page-content__title page-title">Все кроссовки</h1>
      <AppSearch v-model="searchText" />
      <AppCardList
        :cards="filteredCards"
        @toggleFavoritesCard="toggleFavoritesCard"
        @toggleCartCard="toggleCartCard"
      />
    </main>
    <AppCartModal
      v-if="isModalVisible"
      :cartState="cartState"
      :cards="cart"
      :totalCartPrice="totalCartPrice"
      @close="closeCartModal"
      @removeCardFromCart="removeFromCart"
      @makeOrder="makeOrder"
    />
  </div>
</template>
