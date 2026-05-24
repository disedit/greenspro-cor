
<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div class="border-b border-primary py-4 text-green">
    <h2 class="text-base font-bold flex items-center gap-2 mb-3">
      <Icon v-if="icon" :name="icon" />
      <span>{{ label }}</span>
    </h2>
    <slot />
  </div>
</template>
