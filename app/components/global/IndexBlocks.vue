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

const { link } = useUtils()
</script>

<template>
  <section class="px-base" :class="{ 'md:hidden': block.mobile_only }">
    <div class="2xl:container mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-8">
      <NuxtLink
        v-for="item in context.menu"
        :key="item.id"
        :to="link(item)"
        class="flex bg-white rounded-xl p-6 font-weight aspect-3/1 md:aspect-2/1 w-full text-primary text-xl md:text-lg font-bold hover:outline-4 outline-primary"
      >
        <span v-html="item.title" />
      </NuxtLink>
    </div>
  </section>
</template>
