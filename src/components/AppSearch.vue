<script setup lang="ts">
interface Props {
  modelValue: string;
}

const updateSearchText = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value.toLowerCase());
};

const resetInput = () => {
  emit('update:modelValue', '');
};

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

defineProps<Props>();
</script>

<template>
  <div class="page-content__search search">
    <img class="search__icon" src="/search.svg" width="14" height="`4" />
    <input
      :value="modelValue"
      @input="updateSearchText"
      @blur="resetInput"
      class="search__field"
      type="search"
      placeholder="Поиск"
    />
  </div>
</template>
