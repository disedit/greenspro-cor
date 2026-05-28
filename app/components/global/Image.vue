<script setup>
defineProps({
  block: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <NuxtPicture
    format="avif,webp"
    :src="block.image"
    class="page-image -mx-(--page-padding)"
  />
</template>
