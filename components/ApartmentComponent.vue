<template>
  <div class="apartment-component">
    <h1 class="apartment-component__title">Apartments</h1>
    <ui-table :data="displayedApartments" :columns="columns" />
    <ui-button v-if="hasMore" @click="loadMore">Загрузить еще</ui-button>
  </div>
</template>

<script setup lang="ts">
import type { IApartment } from '~/api';

interface IProps {
  apartments: IApartment[];
}

const props = defineProps<IProps>();

const columns = [
  { key: 'imageLink', label: 'Планировка' },
  { key: 'name', label: 'Квартира' },
  { key: 'square', label: 'S, м²', sortable: true },
  { key: 'flor', label: 'Этаж', sortable: true },
  { key: 'price', label: 'Цена ₽', sortable: true },
];

const currentPage = ref(1);
const itemsPerPage = 5;

const displayedApartments = computed(() => {
  return props.apartments.slice(0, currentPage.value * itemsPerPage);
});

const hasMore = computed(() => {
  return displayedApartments.value.length < props.apartments.length;
});

const loadMore = () => {
  currentPage.value++;
};
</script>

<style lang="scss">
.apartment-component {
  &__title {
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary, #1a1a1a);
  }

  &__load-more {
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    background: var(--primary-color, #007bff);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      background: var(--primary-color-hover, #0056b3);
    }
  }
}
</style>
