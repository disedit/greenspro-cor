<script setup>
defineProps({
  block: {
    type: Object,
    required: true
  }
})

const { link } = useUtils()
const { $wp } = useNuxtApp()
const { data } = await useAsyncData(`posts-homepage`, () =>
  $wp.news()
    .param('per_page', 3)
    .param('brief', true)
)
</script>

<template>
  <section class="px-base">
    <h2 class="2xl:container mx-auto flex justify-between items-baseline gap-2 mt-5 mb-1">
      <NuxtLink :to="link(block.link)" class="text-primary text-xl md:text-lg font-bold">
        {{ block.header }}
      </NuxtLink>
      <UtilsArrowLink :to="link(block.link)" class="text-primary text-sm md:text-base underlined transition-opacity duration-300">
        See more
      </UtilsArrowLink>
    </h2>
    <div class="2xl:container mx-auto grid md:grid-cols-3 gap-base md:gap-8">
      <NewsItem v-for="post in data.posts" :key="post.id" :post="post" />
    </div>
  </section>
</template>
