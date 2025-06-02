<script setup lang="ts">
import type { Card } from '../types/Card';

interface Props {
  isVisible: boolean;
  isOrderDone: boolean;
  cards: Card[];
  totalCartPrice: number;
  totalCartPriceTax: number;
}

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'removeCardFromCart', id: number): void;
  (e: 'makeOrder'): void;
}>();

defineProps<Props>();
</script>

<template>
  <div class="page-drawer drawer" :class="{ 'drawer--active': isVisible }">
    <div class="drawer__overlay"></div>
    <div class="drawer__body">
      <div class="drawer__header">
        <h2 class="drawer__title">Корзина</h2>
        <button class="drawer__close" @click="emit('close')">
          <img class="card__close-icon" src="/btn-remove.svg" width="32" height="32" />
        </button>
      </div>
      <div v-if="cards.length > 0 && !isOrderDone" class="drawer__main">
        <div class="drawer__card-list">
          <div v-for="card in cards" :key="card.id" class="drawer__card-item card card--cart">
            <img class="card__image" :src="card.image" width="133" height="112" />
            <span class="card__title">{{ card.title }}</span>
            <div class="card__price-block">
              <span class="card__price-value">{{ card.price }} руб.</span>
            </div>
            <button
              class="card__button card__button--remove"
              @click="emit('removeCardFromCart', card.id)"
            >
              <img class="card__button-icon" src="/btn-remove.svg" width="32" height="32" />
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

      <div v-else-if="isOrderDone" class="drawer__message message-block message-block--success">
        <img class="message-block__image" src="/order.jpg" width="83" height="120" />
        <h3 class="message-block__title">Заказ оформлен!</h3>
        <span class="message-block__desc">Ваш заказ скоро будет передан курьерской доставке</span>
        <button class="message-block__button button button--back" @click="emit('close')">
          <span class="button__text">Вернуться назад</span>
          <img class="button__icon" src="/arrow.svg" width="14" height="12" />
        </button>
      </div>

      <div v-else class="drawer__message message-block">
        <img class="message-block__image" src="/box.jpg" width="120" height="120" />
        <h3 class="message-block__title">Корзина пустая</h3>
        <span class="message-block__desc"
          >Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</span
        >
        <button class="message-block__button button button--back" @click="emit('close')">
          <span class="button__text">Вернуться назад</span>
          <img class="button__icon" src="/arrow.svg" width="14" height="12" />
        </button>
      </div>
    </div>
  </div>
</template>
