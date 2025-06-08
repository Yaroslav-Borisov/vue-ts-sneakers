<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
import AppSearch from '../components/AppSearch.vue';
import AppCardList from '../components/AppCardList.vue';
import AppCartModal from '../components/AppCartModal.vue';
import { provide } from 'vue';
import { useFilteredStore } from '../store/FilteredStore.ts';
import { useFavoritesStore } from '../store/FavoritesStore.ts';
import { useCartStore } from '../store/CartStore.ts';
import { usePageStateStore } from '../store/PageStateStore.ts';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import type { PageRoute } from '../enums/PageRoute';
import { onMounted } from 'vue';
import { watch } from 'vue';

const pageStateStore = usePageStateStore();

const { toggleFavoritesCard } = useFavoritesStore();

const cartStore = useCartStore();
const { isModalVisible, cart, orderState, totalCartPrice } = storeToRefs(cartStore);
const { openCartModal, closeCartModal, toggleCartCard, removeFromCart, makeOrder } = useCartStore();

provide('totalCartPrice', totalCartPrice);

const filteredStore = useFilteredStore();
const { searchText, filteredCards } = storeToRefs(filteredStore);
const { updateSearchText } = useFilteredStore();

const { path } = useRoute();

onMounted(() => {
  filteredStore.setCardsBasedOnRoute(path as PageRoute);
});

watch(
  () => path,
  (newPath) => {
    filteredStore.setCardsBasedOnRoute(newPath as PageRoute);
  },
  { immediate: true }
);
</script>

<template>
  <div class="page-wrapper">
    <AppHeader
      :pageState="pageStateStore.pageState"
      :totalCartPrice="totalCartPrice"
      @openCartModal="openCartModal"
      @changePageState="pageStateStore.changePageState"
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
