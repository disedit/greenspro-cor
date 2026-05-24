<script setup>
defineProps({
  country: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="inline-block bg-yellow text-primary font-bold px-1 text-xs rounded">
    <span class="adjust-baseline">{{ country }}</span>
  </div>
</template>
