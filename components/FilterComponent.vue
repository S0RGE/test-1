<template>
  <div class="apartments-filter">
    <div class="apartments-filter__rooms">
      <app-button rounded>1к</app-button>
      <app-button append-icon="cross">2к</app-button>
      <app-button rounded icon="arrow-up"></app-button>
    </div>
    <div class="apartments-filter__price"></div>
    <div class="apartments-filter__area"></div>
    <div class="apartments-filter__actions"></div>
  </div>
</template>

<script setup lang="ts">
import AppButton from "~/components/ui/Buttons/AppButton.vue";
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
