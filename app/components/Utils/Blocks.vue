<script setup>
defineProps({
  blocks: {
    type: Array,
    required: true
  },
  context: {
    type: Object,
    default: () => null
  },
})

const { componentName } = useUtils()
</script>

<template>
  <Component
    v-for="(block, i) in blocks"
    :key="i"
    :is="componentName(block.acf_fc_layout)"
    :block="block"
    :context="context"
  />
</template>
