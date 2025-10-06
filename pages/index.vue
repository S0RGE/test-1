<template>
  <main class="main-page">
    <div class="main-page__apartments">
      <apartment-component />
    </div>
    <div class="main-page__filter">
      <filter-component />
    </div>
    <div v-if="showUpButton" class="main-page__up-button">
      <ui-button rounded plain icon="arrow-up" classes="app-button--up" />
    </div>
  </main>
</template>

<script lang="ts" setup>
const appartmentStore = useApartmentStore();
const { getApartments } = appartmentStore;

const showUpButton = ref(false);

const handleScroll = () => {
  showUpButton.value = window.scrollY > 100;
};

onMounted(() => {
  getApartments();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
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

  &__up-button {
    position: fixed;
    bottom: 32px;
    right: 32px;
  }
}
</style>
