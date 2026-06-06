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

const showContent = ref(false)
const uniqueId = useId()
</script>

<template>
  <div class="px-base">
    <div class="page-content flex flex-col gap-8 max-w-300 mx-auto p-(--page-padding) bg-white rounded-xl md:rounded-3xl overflow-clip">
      <button
        @click="showContent = !showContent"
        class="group w-full text-left cursor-pointer text-base flex items-center leading-none gap-2 font-bold text-secondary"
        :aria-expanded="showContent.toString()"
        :aria-controls="'accordion-content-' + uniqueId"
      >
        <Icon name="ri:arrow-right-s-line" class="transition text-md" :class="{ 'rotate-90': showContent }" />
        <h2 class="text-[1.25em]">{{ block.title }}</h2>
        <span v-if="!showContent" class="ms-auto text-sm group-hover:underline font-normal">Read more</span>
      </button>
      <Transition name="grow">
        <div v-if="showContent" :id="'accordion-content-' + uniqueId">
          <UtilsBlocks :blocks="block.content" :context="context" />
        </div>
      </Transition>
    </div>
  </div>
</template>
