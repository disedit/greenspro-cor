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
  },
  categories: {
    type: String,
    default: null
  },
  tags: {
    type: String,
    default: null
  },
  commissions: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div class="flex items-center justify-between gap-site text-lg md:text-md md:mt-20 mb-20">
    <NuxtLink
      v-if="page > 1"
      :to="`/news/page/${page - 1}/?categories=${categories || ''}&tags=${tags || ''}&commissions=${commissions || ''}`"
      class="font-bold underlined-on-hover flex items-center gap-2"
    >
      <Icon name="ri:arrow-left-line" />
      Previous
    </NuxtLink>
    <span v-else-if="page > 1" />
    <NuxtLink
      v-if="total >= perPage"
      :to="`/news/page/${page + 1}/?categories=${categories || ''}&tags=${tags || ''}&commissions=${commissions || ''}`"
      class="font-bold underlined-on-hover flex items-center gap-2"
    >
      {{ page === 1 ? 'More news' : 'Next' }}
      <Icon name="ri:arrow-right-line" />
    </NuxtLink>
    <span v-else />
  </div>
</template>
