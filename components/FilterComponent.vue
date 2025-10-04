<template>
  <div class="apartments-filter">
    <div class="apartments-filter__rooms">
      <ui-button rounded plain>1к</ui-button>
      <ui-button append-icon="cross" plain text>Сбросить параметры</ui-button>
      <ui-button>Загрузить еще</ui-button>
      <ui-button rounded plain icon="arrow-up" classes="app-button--up" />
      <ui-range-selector
        title="Стоимость квартиры, ₽"
        :min="0"
        :max="100"
        :model-value="rangeValue"
      />
    </div>
    <div class="apartments-filter__price" />
    <div class="apartments-filter__area" />
    <div class="apartments-filter__actions" />
  </div>
</template>

<script setup lang="ts">
import type { IRangeSelection } from '~/components/ui/RangeSelector';

const rangeValue = ref<IRangeSelection>([30, 40]);
</script>

<style lang="scss">
.apartments-filter {
  padding: 40px;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    rgba(174, 228, 178, 0.3) 0%,
    rgba(149, 208, 161, 0.3) 100%
  );
}
</style>
