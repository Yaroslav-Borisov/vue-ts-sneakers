<script setup lang="ts">
import type { Card } from '../types/Card';

interface Props {
  card: Card;
}
const emit = defineEmits<{
  (e: 'toggleFavCard', id: number): void;
  (e: 'toggleCartCard', id: number): void;
}>();

defineProps<Props>();
</script>

<template>
  <div class="card-list__item card">
    <button class="card__button card__button--fav" @click="emit('toggleFavCard', card.id)">
      <img
        class="card__button-icon"
        :src="card.isFavorite ? '/btn-fav-active.svg' : '/btn-fav.svg'"
        width="32"
        height="32"
      />
    </button>
    <img class="card__image" :src="card.image" width="133" height="112" />
    <span class="card__title">{{ card.title }}</span>
    <div class="card__price-block">
      <span class="card__price-label">Цена:</span>
      <span class="card__price-value">{{ card.price }}</span>
    </div>
    <button class="card__button card__button--cart" @click="emit('toggleCartCard', card.id)">
      <img
        class="card__button-icon"
        :src="card.isCart ? '/btn-plus-active.svg' : '/btn-plus.svg'"
        width="32"
        height="32"
      />
    </button>
  </div>
</template>
