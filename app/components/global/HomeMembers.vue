<script setup>
defineProps({
  block: {
    type: Object,
    required: true
  }
})

const { link } = useUtils()
</script>

<template>
  <section class="px-base">
    <h2 class="2xl:container mx-auto flex justify-between items-baseline gap-2 mt-5 mb-1">
      <NuxtLink :to="link(block.link)" class="text-primary text-xl md:text-lg font-bold">
        {{ block.header }}
      </NuxtLink>
      <UtilsArrowLink :to="link(block.link)" class="text-primary text-base underlined transition-opacity duration-300">
        See more
      </UtilsArrowLink>
    </h2>
    <div class="2xl:container mx-auto rounded-xl grid md:grid-cols-12 gap-base">
      <div class="md:col-span-5 bg-white rounded-xl p-5">
        <pre>{{ block }}</pre>
      </div>
      <div class="md:col-span-7 bg-white rounded-xl p-5">
        Map
      </div>
    </div>
  </section>
</template>

<style>

</style>