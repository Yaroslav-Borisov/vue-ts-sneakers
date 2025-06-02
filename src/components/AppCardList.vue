<script setup lang="ts">
import AppCard from './AppCard.vue';
import type { Card } from '../types/Card.ts';

interface Props {
  cards: Card[];
}

const toggleFavCard = (id: number) => {
  emit('toggleFavCard', id);
};

const toggleCartCard = (id: number) => {
  emit('toggleCartCard', id);
};

const emit = defineEmits<{
  (e: 'toggleFavCard', id: number): void;
  (e: 'toggleCartCard', id: number): void;
}>();

defineProps<Props>();
</script>

<template>
  <div class="page-content__list card-list">
    <AppCard
      v-for="card in cards"
      :card="card"
      @toggleFavCard="toggleFavCard"
      @toggleCartCard="toggleCartCard"
    />
  </div>
</template>
