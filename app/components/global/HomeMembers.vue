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
    HOME MEMBERS
    <pre>{{ block }}</pre>
  </div>
</template>

<style>

</style>