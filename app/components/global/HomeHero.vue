<script setup>
defineProps({
  block: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div>
    HOME HERO
    <pre>{{ block }}</pre>
  </div>
</template>

<style>

</style>