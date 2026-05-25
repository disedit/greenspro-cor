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
  },
  type: {
    type: String,
    default: 'text'
  }
})

const value = defineModel()
</script>

<template>
  <div class="relative">
    <label :for="name" class="sr-only">
      {{ label }}
    </label>
    <input :type="type" v-model="value" :id="name" v-bind="$attrs" class="w-full appearance-none rounded-full ps-10 pt-2 pb-1.5 bg-primary-soft border-2 border-primary text-primary" />
    <Icon v-if="icon" :name="icon" class="block absolute left-3 top-1/2 -translate-y-1/2 text-primary" aria-hidden="true" />
  </div>
</template>