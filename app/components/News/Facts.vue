<script lang="ts" setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

/* Post */
const { formatDate } = useDate()
const { commissions } = useCommissions(props.post.commissions)
</script>

<template>
  <NewsFact icon="ri:calendar-line" label="Posted on">
    {{ formatDate(post.date) }}
  </NewsFact>
  <NewsFact icon="ri:archive-line" label="Type">
    <div class="flex flex-wrap gap-2">
      <NuxtLink
        :to="`/news/page/1/?categories=${category.id}`"
        v-for="category in post.categories"
        :key="category.id"
        class="font-bold text-sm py-1 px-3 rounded-full hover:scale-[1.05] transition-transform duration-300"
        :class="`bg-${category.bg_color} text-${category.text_color}`"
      >
        {{ category.name }}
      </NuxtLink>
    </div>
  </NewsFact>
  <NewsFact v-if="post.tags?.length" icon="ri:price-tag-3-line" label="Topics">
    <div class="flex flex-wrap gap-2">
    <NuxtLink
      :to="`/news/page/1/?tags=${tag.id}`"
      v-for="tag in post.tags"
      :key="tag.id"
      class="underlined-on-hover"
    >
      {{ tag.name }}
    </NuxtLink>
    </div>
  </NewsFact>
  <NewsFact v-if="post.commissions?.length" icon="ri:price-tag-3-line" label="Commissions">
    <div class="flex flex-wrap gap-2">
    <NuxtLink
      :to="`/news/page/1/?commissions=${commission.id}`"
      v-for="commission in commissions"
      :key="commission.id"
      class="underlined-on-hover leading-tight"
    >
      {{ commission.name }}
      <span class="bg-primary/25 font-bold text-xs rounded-md px-2 py-1 no-underline!">{{ commission.acronym }}</span>
    </NuxtLink>
    </div>
  </NewsFact>
</template>
