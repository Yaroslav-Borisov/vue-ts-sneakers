<script setup lang="ts">
import { computed, inject, type Ref } from "vue";
import type { Card } from "../../types/Card";

interface Props {
  cards: Card[];
}

const totalCartPrice = inject<Ref<number>>("totalCartPrice");

const totalCartPriceTax = computed<number>(() => {
  if (totalCartPrice) {
    return Math.ceil(totalCartPrice.value * 0.05);
  }
  return 0;
});

const emit = defineEmits<{
  (e: "close"): void;
  (e: "removeCardFromCart", id: number): void;
  (e: "makeOrder"): void;
}>();

const props = defineProps<Props>();
</script>

<template>
  <div class="drawer__main">
    <div class="drawer__card-list">
      <div
        v-for="card in cards"
        :key="card.id"
        class="drawer__card-item card card--cart"
      >
        <img class="card__image" :src="card.image" width="133" height="112" />
        <span class="card__title">{{ card.title }}</span>
        <div class="card__price-block">
          <span class="card__price-value">{{ card.price }} руб.</span>
        </div>
        <button
          class="card__button card__button--remove"
          @click="emit('removeCardFromCart', card.id)"
        >
          <img
            class="card__button-icon"
            src="/btn-remove.svg"
            width="32"
            height="32"
          />
        </button>
      </div>
    </div>
    <div class="drawer__info-list">
      <div class="drawer__info-item">
        <span class="drawer__info-label">Итого:</span>
        <span class="drawer__info-separator"></span>
        <span class="drawer__info-value">{{ totalCartPrice }} руб.</span>
      </div>
      <div class="drawer__info-item">
        <span class="drawer__info-label">Налог 5%:</span>
        <span class="drawer__info-separator"></span>
        <span class="drawer__info-value">{{ totalCartPriceTax }} руб.</span>
      </div>
    </div>
    <button class="drawer__button button" @click="emit('makeOrder')">
      <span class="button__text">Оформить заказ</span>
      <img class="button__icon" src="/arrow.svg" width="14" height="12" />
    </button>
  </div>
</template>
