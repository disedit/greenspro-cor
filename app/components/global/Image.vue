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
    sizes="100vw md:900px"
  />
</template>
