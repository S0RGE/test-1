<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <button @click="counter.increment()">Increment</button>
  </div>
</template>

<script setup lang="ts">
const counter = useCounterStore()
</script>
