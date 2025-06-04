<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import AppSearch from './components/AppSearch.vue';
import AppCardList from './components/AppCardList.vue';
import AppCartModal from './components/AppCartModal.vue';
import { ref } from 'vue';
import type { Card } from './types/Card';
import { useModal } from './composables/useModal';
import { useCart } from './composables/useCart';
import { useFavorites } from './composables/useFavorites';
import { PageState } from './enums/PageState.ts';
import { useSearch } from './composables/useSearch';

const pageState = ref<PageState>(PageState.All);
const cards = ref<Card[]>([
  {
    id: 1,
    image: '/sneakers/1.jpg',
    title: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 12999,
    isFavorite: true,
    isCart: false,
  },
  {
    id: 2,
    image: '/sneakers/2.jpg',
    title: 'Мужские Кроссовки Nike Air Max 270',
    price: 12999,
    isFavorite: false,
    isCart: true,
  },
  {
    id: 3,
    image: '/sneakers/3.jpg',
    title: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 8499,
    isFavorite: true,
    isCart: false,
  },
  {
    id: 4,
    image: '/sneakers/4.jpg',
    title: 'Кроссовки Puma X Aka Boku Future Rider',
    price: 8499,
    isFavorite: false,
    isCart: false,
  },
  {
    id: 5,
    image: '/sneakers/5.jpg',
    title: 'Мужские Кроссовки Under Armour Curry 8',
    price: 15199,
    isFavorite: true,
    isCart: true,
  },
  {
    id: 6,
    image: '/sneakers/6.jpg',
    title: 'Мужские Кроссовки Nike Kyrie 7',
    price: 11299,
    isFavorite: false,
    isCart: false,
  },
  {
    id: 7,
    image: '/sneakers/7.jpg',
    title: 'Мужские Кроссовки Jordan Air Jordan 11',
    price: 10799,
    isFavorite: false,
    isCart: true,
  },
  {
    id: 8,
    image: '/sneakers/8.jpg',
    title: 'Мужские Кроссовки Nike LeBron XVIII',
    price: 16499,
    isFavorite: true,
    isCart: false,
  },
  {
    id: 9,
    image: '/sneakers/9.jpg',
    title: 'Мужские Кроссовки Nike LeBron XVIII Low',
    price: 13999,
    isFavorite: false,
    isCart: false,
  },
  {
    id: 10,
    image: '/sneakers/10.jpg',
    title: 'Мужские Кроссовки Nike Kyrie Flytrap IV',
    price: 11299,
    isFavorite: true,
    isCart: false,
  },
]);

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
const { searchText, filteredCards } = useSearch(cards, favorites, pageState);

const changePageState = (newPageState: PageState) => {
  pageState.value = newPageState;
};

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
    <AppHeader
      :pageState="pageState"
      :totalCartPrice="totalCartPrice"
      @openCartModal="openCartModal"
      @changePageState="changePageState"
    />
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

<style scoped></style>
