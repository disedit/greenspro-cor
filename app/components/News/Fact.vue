<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  layout: {
    type: String,
    default: 'row'
  }
})
</script>

<template>
  <div :class="['text-primary text-base py-2 border-b flex gap-2 items-baseline', { 'flex-col': layout === 'column' }]">
    <span class="shrink-0 flex gap-1 items-baseline">
      <Icon v-if="icon" :name="icon" class="shrink-0 translate-y-0.75" />
      <span v-if="label" class="leading-tight">{{ label }}</span>
    </span>
    <span :class="{ 'ms-auto ps-2 text-right': layout === 'row', 'w-full': layout === 'column' }">
      <slot />
    </span>
  </div>
</template>
