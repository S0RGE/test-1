<template>
  <div class="apartment-component">
    <h1 class="apartment-component__title">Квартиры</h1>
    <div v-if="!displayedApartments.length">
      <h3>Нет квартир с заданным фильтром</h3>
    </div>
    <ui-table v-else :data="displayedApartments" :columns="columns" />
    <div class="apartment-component__load-more">
      <ui-button
        v-if="hasMore"
        class="apartment-component__load-more-btn"
        @click="loadMore"
        >Загрузить еще</ui-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const apartmentStore = useApartmentStore();
const { hasMore, currentPage, displayedApartments } =
  storeToRefs(apartmentStore);

const columns = [
  { key: 'imageLink', label: 'Планировка' },
  { key: 'name', label: 'Квартира' },
  { key: 'square', label: 'S, м²', sortable: true },
  { key: 'floor', label: 'Этаж', sortable: true },
  { key: 'price', label: 'Цена ₽', sortable: true },
];

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
    margin-top: 48px;
  }

  &__load-more-btn {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
  }
}
</style>
