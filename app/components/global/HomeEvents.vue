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
    HOME EVENTS
    <pre>{{ block }}</pre>
  </div>
</template>

<style>

</style>