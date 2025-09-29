<template>
  <div class="apartments-filter">
    <div class="apartments-filter__rooms">
      <app-button rounded plain>1к</app-button>
      <app-button append-icon="cross" plain>Сбросить параметры</app-button>
      <app-button>Загрузить еще</app-button>
      <app-button
        rounded
        plain
        icon="arrow-up"
        classes="app-button--up"
      ></app-button>
      <app-range-selection :min="0" :max="100" :model-value="rangeValue" />
    </div>
    <div class="apartments-filter__price"></div>
    <div class="apartments-filter__area"></div>
    <div class="apartments-filter__actions"></div>
  </div>
</template>

<script setup lang="ts">
import AppButton from "~/components/ui/Buttons/AppButton.vue";
import AppRangeSelection, {
  type IRangeSelection,
} from "~/components/ui/AppRangeSelection.vue";

const rangeValue = ref<IRangeSelection>([30, 60]);
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
