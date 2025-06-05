<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { PageRoute } from '../enums/PageRoute';

interface Props {
  totalCartPrice: number;
}

const { path } = useRoute();

const emit = defineEmits<{
  (e: 'openCartModal'): void;
}>();

defineProps<Props>();
</script>

<template>
  <header class="page-header">
    <RouterLink :to="PageRoute.Main" class="page-header__logo logo" href="#">
      <img class="logo__image" src="/logo.png" width="40" height="40" />
      <span class="logo__title">Vue Sneakers</span>
      <span class="logo__desc">Магазин брендовых кроссовок</span>
    </RouterLink>

    <nav class="page-header__nav main-nav">
      <a class="main-nav__link" href="#" @click="emit('openCartModal')">
        <img class="main-nav__icon" src="/cart.svg" width="20" height="19" />
        <span class="main-nav__text">{{ totalCartPrice }} руб.</span>
      </a>
      <RouterLink :to="PageRoute.Favorites" class="main-nav__link" href="#">
        <img
          class="main-nav__icon"
          :src="path === PageRoute.Favorites ? '/fav-active.svg' : '/fav.svg'"
          width="20"
          height="19"
        />
      </RouterLink>
      <a class="main-nav__link" href="#">
        <img class="main-nav__icon" src="/user.svg" width="20" height="20" />
      </a>
    </nav>
  </header>
</template>
