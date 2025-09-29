<template>
  <div>
    <h1>Home</h1>
    <apartment-component />
    <filter-component />
  </div>
</template>

<script lang="ts" setup>
import ApartmentComponent from "~/components/ApartmentComponent.vue";
import FilterComponent from "~/components/FilterComponent.vue";

// document.documentElement.setAttribute('data-theme', 'dark');
// document.documentElement.removeAttribute('data-theme'); // back to light
</script>
