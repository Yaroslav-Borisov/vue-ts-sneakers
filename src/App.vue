<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import AppSearch from './components/AppSearch.vue';
import AppCardList from './components/AppCardList.vue';
import AppCartModal from './components/AppCartModal.vue';
import { computed, ref } from 'vue';
import type { Card } from './types/Card';

const isCartVisible = ref<boolean>(false);
const isFavFilterOn = ref<boolean>(false);
const isOrderDone = ref<boolean>(false);
const searchText = ref<string>('');

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
const searchedCards = computed(() =>
  searchText.value.length > 0
    ? cards.value.filter((card) => card.title.toLowerCase().includes(searchText.value))
    : cards.value
);
const favCards = computed(() => searchedCards.value.filter((card) => card.isFavorite === true));
const cartCards = computed(() => cards.value.filter((card) => card.isCart === true));
const totalCartPrice = computed<number>(() =>
  cartCards.value.map((card) => card.price).reduce((total, current) => total + current, 0)
);
const totalCartPriceTax = computed<number>(() => Math.ceil(totalCartPrice.value * 0.05));

const changeFavFilterState = () => {
  isFavFilterOn.value = !isFavFilterOn.value;
};

const openCartModal = () => {
  isCartVisible.value = true;
};

const closeCartModal = () => {
  isCartVisible.value = false;
  isOrderDone.value = false;
};

const makeOrder = () => {
  isOrderDone.value = true;
  cards.value = cards.value.map((card) => ({ ...card, isCart: false }));
};

const toggleFavCard = (id: number) => {
  const targetCard = cards.value.find((card) => card.id === id);
  if (targetCard) {
    targetCard.isFavorite = !targetCard.isFavorite;
  }
};

const toggleCartCard = (id: number) => {
  const targetCard = cards.value.find((card) => card.id === id);
  if (targetCard) {
    targetCard.isCart = !targetCard.isCart;
  }
};
</script>

<template>
  <div class="page-wrapper">
    <AppHeader
      :favFilterState="isFavFilterOn"
      :totalCartPrice="totalCartPrice"
      @openCartModal="openCartModal"
      @changeFavFilterState="changeFavFilterState"
    />
    <main class="page-content">
      <h1 class="page-content__title page-title">Все кроссовки</h1>
      <AppSearch v-model:searchText="searchText" />
      <AppCardList
        :cards="isFavFilterOn ? favCards : searchedCards"
        @toggleFavCard="toggleFavCard"
        @toggleCartCard="toggleCartCard"
      />
    </main>
    <AppCartModal
      :cards="cartCards"
      :totalCartPrice="totalCartPrice"
      :totalCartPriceTax="totalCartPriceTax"
      :isVisible="isCartVisible"
      :isOrderDone="isOrderDone"
      @close="closeCartModal"
      @removeCardFromCart="toggleCartCard"
      @makeOrder="makeOrder"
    />
  </div>
</template>

<style scoped></style>
