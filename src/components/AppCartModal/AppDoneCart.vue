<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>

<template>
  <div class="drawer__message message-block message-block--success">
    <img class="message-block__image" src="/order.jpg" width="83" height="120" />
    <h3 class="message-block__title">Заказ оформлен!</h3>
    <span class="message-block__desc">Ваш заказ скоро будет передан курьерской доставке</span>
    <button class="message-block__button button button--back" @click="emit('close')">
      <span class="button__text">Вернуться назад</span>
      <img class="button__icon" src="/arrow.svg" width="14" height="12" />
    </button>
  </div>
</template>
