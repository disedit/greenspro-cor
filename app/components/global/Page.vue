<script setup>
defineProps({
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
  <div class="px-base md:mb-20" :class="{ 'md:mt-20': block.show_page_title }">
    <div class="page-content flex flex-col gap-8 max-w-300 mx-auto p-(--page-padding) bg-white rounded-xl md:rounded-3xl overflow-clip">
      <UtilsPageHeader
        v-if="block.show_page_title"
        :title="block.title || context.title"
        :breadcrumbs="block.show_breadcrumbs ? context.breadcrumbs : null"
        class="text-secondary"
      />
      <div v-html="context.content" class="prose gutenberg text-base" />
    </div>
  </div>
</template>
