<script setup>
defineProps({
  block: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div v-html="block.html" />
</template>
