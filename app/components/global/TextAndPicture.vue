<script setup>
const props = defineProps({
  block: {
    type: Object,
    required: true
  },
  context: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="px-base">
    <div class="2xl:container grid md:grid-cols-12 gap-base mx-auto text-sm md:text-base text-primary-dark">
      <div class="md:col-span-7 prose" v-html="block.text" />
      <NuxtPicture
        v-if="block.picture?.url"
        :src="block.picture.sizes.large || block.picture.url"
        :alt="block.picture.alt"
        format="avif,webp"
        :img-attrs="{ class: 'w-full object-cover rounded-xl' }"
        class="md:col-span-5"
        :class="{
          'hidden md:block': block.hide_picture_on_mobile
        }"
      />
    </div>
  </section>
</template>
