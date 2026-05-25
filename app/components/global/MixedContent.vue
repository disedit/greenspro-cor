<script setup>
defineProps({
  block: {
    type: Object,
    required: true
  },
  context: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div v-html="context.content" class="prose gutenberg text-base" />
</template>
