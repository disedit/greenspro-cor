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
  <div class="px-base my-20">
    <div class="page-content flex flex-col gap-8 max-w-300 mx-auto p-(--page-padding) bg-white rounded-3xl overflow-clip">
      <UtilsPageHeader
        :title="block.title || context.title"
        :breadcrumbs="block.show_breadcrumbs ? context.breadcrumbs : null"
        class="text-secondary"
      />
      <div v-html="context.content" class="prose gutenberg text-base" />
      <UtilsBlocks :blocks="block.content" :context="context" />
    </div>
  </div>
</template>
