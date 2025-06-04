<script setup lang="ts">
import AppCard from './AppCard.vue';
import type { Card } from '../types/Card.ts';

interface Props {
  cards: Card[];
}

const toggleFavoritesCard = (id: number | string) => {
  emit('toggleFavoritesCard', id);
};

const toggleCartCard = (id: number | string) => {
  emit('toggleCartCard', id);
};

const emit = defineEmits<{
  (e: 'toggleFavoritesCard', id: number | string): void;
  (e: 'toggleCartCard', id: number | string): void;
}>();

defineProps<Props>();
</script>

<template>
  <div class="page-content__list card-list">
    <AppCard
      v-if="cards.length > 0"
      v-for="card in cards"
      :card="card"
      @toggleFavoritesCard="toggleFavoritesCard"
      @toggleCartCard="toggleCartCard"
    />
    <h2 v-else>Пусто</h2>
  </div>
</template>
