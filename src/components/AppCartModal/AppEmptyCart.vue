<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>

<template>
  <div class="drawer__message message-block">
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
</template>
