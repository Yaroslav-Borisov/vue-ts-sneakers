<script setup lang="ts">
import AppCard from './AppCard.vue';
import type { Card } from '../types/Card.ts';

interface Props {
  cards: Card[];
}

const toggleFavoritesCard = (id: number) => {
  emit('toggleFavoritesCard', id);
};

const toggleCartCard = (id: number) => {
  emit('toggleCartCard', id);
};

const emit = defineEmits<{
  (e: 'toggleFavoritesCard', id: number): void;
  (e: 'toggleCartCard', id: number): void;
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
