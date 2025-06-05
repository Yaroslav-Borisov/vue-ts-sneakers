<script setup lang="ts">
import { OrderState } from "../composables/useCart";
import type { Card } from "../types/Card";
import AppDoneCart from "./AppCartModal/AppDoneCart.vue";
import AppEmptyCart from "./AppCartModal/AppEmptyCart.vue";
import AppProcessingCart from "./AppCartModal/AppProcessingCart.vue";

interface Props {
  orderState: OrderState;
  cards: Card[];
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "removeCardFromCart", id: number): void;
  (e: "makeOrder"): void;
}>();
</script>

<template>
  <div class="page-drawer drawer drawer--active">
    <div class="drawer__overlay"></div>
    <div class="drawer__body">
      <div class="drawer__header">
        <h2 class="drawer__title">Корзина</h2>
        <button class="drawer__close" @click="emit('close')">
          <img
            class="card__close-icon"
            src="/btn-remove.svg"
            width="32"
            height="32"
          />
        </button>
      </div>

      <AppDoneCart
        v-if="orderState === OrderState.Done"
        @close="emit('close')"
      />

      <template v-else>
        <AppProcessingCart
          v-if="cards.length > 0"
          :cards="cards"
          @close="emit('close')"
          @removeCardFromCart="emit('removeCardFromCart', $event)"
          @makeOrder="emit('makeOrder')"
        />

        <AppEmptyCart v-else @close="emit('close')" />
      </template>
    </div>
  </div>
</template>
