<script setup lang="ts">
interface Props {
  searchText: string;
}

const updateSearchText = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:searchText', target.value.toLowerCase());
};

const emit = defineEmits<{
  (e: 'update:searchText', value: string): void;
}>();

defineProps<Props>();
</script>

<template>
  <div class="page-content__search search">
    <img class="search__icon" src="/search.svg" width="14" height="`4" />
    <input
      :value="searchText"
      @input="updateSearchText"
      class="search__field"
      type="search"
      placeholder="Поиск"
    />
  </div>
</template>
