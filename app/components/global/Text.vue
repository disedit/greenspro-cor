<script setup>
defineProps({
  block: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div v-html="block.text" class="prose text-base" />
</template>
