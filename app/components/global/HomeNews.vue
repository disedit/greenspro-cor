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
    HOME NEWS
    <pre>{{ block }}</pre>
  </div>
</template>

<style>

</style>