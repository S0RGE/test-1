<template>
  <main class="main-page">
    <apartment-component
      :apartments="apartments"
      class="main-page__apartments"
    />
    <filter-component class="main-page__filter" />
  </main>
</template>

<script lang="ts" setup>
import ApartmentComponent from "~/components/ApartmentComponent.vue";
import FilterComponent from "~/components/FilterComponent.vue";

const appartmentStore = useApartmentStore();
const { getApartments } = appartmentStore;
const { apartments } = storeToRefs(appartmentStore);

onMounted(() => {
  getApartments();
});
</script>

<style lang="scss">
.main-page {
  display: flex;
  gap: 20px;
  padding: 20px;

  &__apartments {
    flex-grow: 2;
  }
}
</style>
