<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

const memberTypes = {
  full_member: 'Member',
  alternate_member: 'Alternate'
}

const memberType = computed(() => {
  return memberTypes[props.type] || null
})
</script>

<template>
  <span class="bg-primary-soft/25 text-primary rounded px-2 text-xs">
    <span class="adjust-baseline">{{ memberType }}</span>
  </span>
</template>
