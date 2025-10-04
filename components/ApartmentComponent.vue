<template>
  <div class="apartment-component">
    <h1 class="apartment-component__title">Apartments</h1>
    <ui-table-component 
      :data="apartments" 
      :columns="columns"
    />
  </div>
</template>

<script setup lang="ts">
import type { IApartment } from '~/api'

interface IProps {
  apartments: IApartment[]
}

defineProps<IProps>()

const columns = [
  { key: 'imageLink', label: 'Планировка' },
  { key: 'name', label: 'Квартира' },
  { key: 'square', label: 'S, м²', sortable: true },
  { key: 'flor', label: 'Этаж', sortable: true },
  { key: 'price', label: 'Цена ₽', sortable: true }
]
</script>

<style lang="scss">
.apartment-component {
  &__title {
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary, #1a1a1a);
  }
}
</style>
