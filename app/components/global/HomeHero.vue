<script setup>
defineProps({
  block: {
    type: Object,
    required: true
  }
})

const { link, target } = useUtils()
</script>

<template>
  <header class="px-base">
    <NuxtLink
      :to="link(block.link)"
      :target="target(block.link)"
      class="group relative flex flex-col gap-4 justify-end 2xl:container mx-auto p-base md:p-10 bg-green text-white rounded-xl md:aspect-4/2 h-[70svh] md:h-auto bg-cover bg-center overflow-hidden"
      :style="{
        backgroundImage: `url(${block.image.url})`
      }">
      <h1 class="relative z-2 text-white text-xl font-bold leading-tighter text-balance max-w-[50ch] text-shadow-[0_0_10px_var(--color-green)]">
        {{ block.text }}
      </h1>
      <div v-if="block.call_to_action" class="relative z-2">
        <span class="inline-flex items-center gap-5 border-2 border-white rounded-full px-5 py-1.5 text-base group-hover:bg-white group-hover:text-green transition-colors duration-300">
          {{ block.call_to_action }}
          <Icon name="ri:arrow-right-line" />
        </span>
      </div>
      <div class="absolute top-[40%] bottom-0 left-0 right-0 z-1 green-gradient" />
    </NuxtLink>
  </header>
</template>

<style>

</style>