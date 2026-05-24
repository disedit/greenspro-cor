<script setup>
defineProps({
  posts: {
    type: Array,
    required: true
  },
  page: {
    type: Number,
    default: 1
  },
  perPage: {
    type: Number,
    default: 6
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
  <section>
    <div v-if="posts.length > 0" class="grid md:grid-cols-2 gap-8">
      <NewsItem v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div class="w-full bg-white rounded-xl p-5 md:p-8 text-primary text-lg text-center text-balance leading-tight max-w-[40ch]" v-else>
      <div>
        <Icon name="ri:search-line" class="text-2xl mb-4" />
      </div>
      <strong>No publications found</strong>. Try adjusting your filters to find what you're looking for.
    </div>
    <div>
      <NewsPagination
        :total="posts.length"
        :page="page"
        :per-page="perPage"
        :categories="categories"
        :tags="tags"
        :commissions="commissions"
      />
    </div>
  </section>
</template>

<style>

</style>