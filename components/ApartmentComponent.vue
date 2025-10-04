<template>
  <div>
    <h1>Apartment</h1>
    <div>
      <pre>
        {{ apartments }}
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IApartment } from "~/api";

interface IProps {
  apartments: IApartment[];
}

defineProps<IProps>();
</script>

<style lang="scss"></style>
