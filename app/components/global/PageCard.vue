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
  <div class="px-base">
    <div class="page-content flex flex-col gap-8 max-w-300 mx-auto p-(--page-padding) bg-white rounded-xl md:rounded-3xl overflow-clip">
      <UtilsBlocks :blocks="block.content" :context="context" />
    </div>
  </div>
</template>
