<script setup>
const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  page: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="flex items-center justify-between gap-site text-md mt-4 md:mt-20 mb-20">
    <NuxtLink
      v-if="page > 1"
      :to="page > 2 ? `/events/page/${page - 1}` : '/events'"
      class="font-bold underlined-on-hover flex items-center gap-2"
    >
      <Icon name="ri:arrow-left-line" />
      Previous
    </NuxtLink>
    <span v-else-if="page > 1" />
    <NuxtLink
      v-if="total >= perPage"
      :to="`/events/page/${page + 1}/`"
      class="font-bold underlined-on-hover flex items-center gap-2"
    >
      {{ page === 1 ? 'More events' : 'Next' }}
      <Icon name="ri:arrow-right-line" />
    </NuxtLink>
    <span v-else />
  </div>
</template>
