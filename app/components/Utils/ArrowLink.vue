<script setup>
defineProps({
  to: {
    type: String,
    required: true
  }
})
</script>

<template>
  <NuxtLink :to="to" class="group inline-flex items-center gap-2">
    <slot />
    <span class="w-0 overflow-clip group-hover:w-5 transition-all duration-200 flex items-center shrink-0">
      <Icon name="ri:arrow-right-line" />
    </span>
  </NuxtLink>
</template>