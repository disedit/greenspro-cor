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
  <div>
    <div class="grid md:grid-cols-2 gap-8">
      <NewsItem v-for="post in posts" :key="post.id" :post="post" />
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
  </div>
</template>

<style>

</style>