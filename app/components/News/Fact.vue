<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="text-primary text-base py-2 border-b flex gap-2 items-baseline">
    <Icon :name="icon" class="shrink-0 translate-y-0.75" />
    <span>{{ label }}</span>
    <span class="ms-auto ps-2 text-right">
      <slot />
    </span>
  </div>
</template>
