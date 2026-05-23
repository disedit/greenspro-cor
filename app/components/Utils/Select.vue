<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: null
  }
})

const value = defineModel()
</script>

<template>
  <div class="relative rounded-full border-2 border-primary overflow-hidden">
    <label :for="name" class="sr-only">
      {{ label }}
    </label>
    <select v-model="value" :id="name" class="w-full appearance-none rounded-full px-10 pt-2 pb-1.5 bg-primary-soft/75 text-primary">
      <slot />
    </select>
    <Icon v-if="icon" :name="icon" class="block absolute left-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none" aria-hidden="true" />
    <Icon name="ri:arrow-down-s-line" class="block absolute z-2 right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none" aria-hidden="true" />
    <div class="absolute right-10 top-0 bottom-0 z-1 w-20 bg-linear-to-l from-primary-soft to-primary-soft/0 pointer-events-none" />
  </div>
</template>