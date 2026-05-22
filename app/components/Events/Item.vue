<script setup>
defineProps({
  event: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <NuxtLink  class="block bg-white rounded-xl p-5">
    {{ event }}
  </NuxtLink>
</template>