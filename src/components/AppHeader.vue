<script setup lang="ts">
import { PageState } from '../enums/PageState.ts';

interface Props {
  pageState: PageState;
  totalCartPrice: number;
}

const resetPageState = (): PageState => {
  return PageState.All;
};

const toggleFavoritesFilter = (): PageState => {
  return props.pageState === PageState.Favorite ? PageState.All : PageState.Favorite;
};

const emit = defineEmits<{
  (e: 'openCartModal'): void;
  (e: 'changePageState', newPageState: PageState): void;
}>();

const props = defineProps<Props>();
</script>

<template>
  <header class="page-header">
    <a class="page-header__logo logo" href="#" @click="emit('changePageState', resetPageState())">
      <img class="logo__image" src="/logo.png" width="40" height="40" />
      <span class="logo__title">Vue Sneakers</span>
      <span class="logo__desc">Магазин брендовых кроссовок</span>
    </a>
    <nav class="page-header__nav main-nav">
      <a class="main-nav__link" href="#" @click="emit('openCartModal')">
        <img class="main-nav__icon" src="/cart.svg" width="20" height="19" />
        <span class="main-nav__text">{{ totalCartPrice }} руб.</span>
      </a>
      <a class="main-nav__link" href="#" @click="emit('changePageState', toggleFavoritesFilter())">
        <img
          class="main-nav__icon"
          :src="pageState === PageState.Favorite ? '/fav-active.svg' : '/fav.svg'"
          width="20"
          height="19"
        />
      </a>
      <a class="main-nav__link" href="#">
        <img class="main-nav__icon" src="/user.svg" width="20" height="20" />
      </a>
    </nav>
  </header>
</template>
