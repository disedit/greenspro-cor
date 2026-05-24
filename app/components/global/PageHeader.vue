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
  <header class="px-base">
    <div class="2xl:container mx-auto">
      <UtilsPageHeader
        :title="block.title || context.title"
        :breadcrumbs="block.show_breadcrumbs ? context.breadcrumbs : null"
        class="mt-10"
      />
    </div>
  </header>
</template>
