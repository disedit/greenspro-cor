<script setup>
defineProps({
  country: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="inline-block bg-yellow text-green font-bold px-1 text-xs rounded ms-2">
    <span class="adjust-baseline">{{ country }}</span>
  </div>
</template>
