<script setup>
defineProps({
  block: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div v-html="block.embed" class="page-embed -mx-(--page-padding)" />
</template>
