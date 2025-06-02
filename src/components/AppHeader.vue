<script setup lang="ts">
interface Props {
  favFilterState: boolean;
  totalCartPrice: number;
}

const emit = defineEmits<{
  (e: 'openCartModal'): void;
  (e: 'changeFavFilterState'): void;
}>();

defineProps<Props>();
</script>

<template>
  <header class="page-header">
    <a class="page-header__logo logo" href="#">
      <img class="logo__image" src="/logo.png" width="40" height="40" />
      <span class="logo__title">Vue Sneakers</span>
      <span class="logo__desc">Магазин брендовых кроссовок</span>
    </a>
    <nav class="page-header__nav main-nav">
      <a class="main-nav__link" href="#" @click="emit('openCartModal')">
        <img class="main-nav__icon" src="/cart.svg" width="20" height="19" />
        <span class="main-nav__text">{{ totalCartPrice }} руб.</span>
      </a>
      <a class="main-nav__link" href="#" @click="emit('changeFavFilterState')">
        <img
          class="main-nav__icon"
          :src="favFilterState ? '/fav-active.svg' : '/fav.svg'"
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
