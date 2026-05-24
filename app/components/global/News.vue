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

const { $wp } = useNuxtApp()
const { data } = await useAsyncData(
  `news-${props.block.categories.join('-')}`, () => $wp.news()
    .param('categories', props.block.categories.join(','))
    .param('per_page', 10)
)
</script>

<template>
  <section class="px-base">
    <div class="2xl:container mx-auto">
      <UtilsPageHeader :title="context.title" :breadcrumbs="context.breadcrumbs" class="mt-10 mb-5" />
      <div class="grid grid-cols-12 gap-8">
        <NewsPosts
          :posts="data.posts"
          class="col-span-9"
          :per-page="10"
          :categories="props.block.categories.join(',')"
        />
        <NewsFilter class="col-span-3" />
      </div>
    </div>
  </section>
</template>

<style>

</style>