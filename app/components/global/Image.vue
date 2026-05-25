<script setup>
defineProps({
  block: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <NuxtPicture :src="block.image" class="page-image -mx-(--page-padding)" />
</template>
