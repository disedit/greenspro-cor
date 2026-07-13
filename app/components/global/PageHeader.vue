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
  <header class="px-base" :class="{ 'md:hidden': block.mobile_only }">
    <div class="mx-auto" :class="{ 'max-w-300': block.narrow, '2xl:container': !block.narrow }">
      <UtilsPageHeader
        :title="block.title || context.title"
        :breadcrumbs="block.show_breadcrumbs ? context.breadcrumbs : null"
        class="mt-10 text-primary"
      />
    </div>
  </header>
</template>
