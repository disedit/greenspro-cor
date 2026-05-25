<script setup>
const settings = await useSettings()
const route = useRoute()
const { $wp } = useNuxtApp()

const asQueryString = value => {
  if (Array.isArray(value)) {
    return value.join(',')
  }
  return typeof value === 'string' ? value : null
}

const page = computed(() => route.params.page || 1)
const categories = computed(() => asQueryString(route.query.categories))
const tags = computed(() => asQueryString(route.query.tags))
const commissions = computed(() => asQueryString(route.query.commissions))
const search = computed(() => route.query.search || '')

const { data } = await useAsyncData(
  () => `news-${page.value}-${categories.value}-${tags.value}-${commissions.value}-${search.value}`,
  () => $wp.news()
    .param('categories', categories.value)
    .param('tags', tags.value)
    .param('commissions', commissions.value)
    .param('page', page.value)
    .param('search', search.value),
  {
    watch: [page, categories, tags, commissions, search]
  }
)

/* SEO Metatags */
const siteName = settings.seo.site_name
const title = `News - ${siteName}`
const ogTitle = title
const description = ''
const ogImage = settings.seo?.default_og_image?.url
const keywords = settings.seo?.default_keywords
const twitterSite = settings.seo?.xtwitter_user
useServerSeoMeta({
  title,
  ogTitle,
  description,
  ogDescription: description,
  ogImage,
  twitterCard: 'summary_large_image',
  keywords,
  ogSiteName: siteName,
  twitterSite,
  ogType: 'website'
})
useHead({ title })

const categoryIds = computed(() => data.value?.categories?.map(category => category.id).join(',') || '')
const tagIds = computed(() => data.value?.tags?.map(tag => tag.id).join(',') || '')
const commissionIds = computed(() => data.value?.commissions?.map(commission => commission.id).join(',') || '')
</script>

<template>
  <main class="min-h-page pb-20 px-base">
    <div class="2xl:container mx-auto">
      <UtilsPageHeader title="Newsroom" class="mt-10 mb-5 text-primary" />
      <section class="grid md:grid-cols-12 gap-8">
        <NewsPosts
          :posts="data.posts"
          :per-page="data.per_page"
          :page="data.page"
          :categories="categoryIds"
          :tags="tagIds"
          :commissions="commissionIds"
          class="md:col-span-9"
        />
        <NewsFilters
          :all="data.all"
          :filters="{
            categories: data.categories,
            tags: data.tags,
            commissions: data.commissions
          }"
          class="md:col-span-3"
        />
      </section>
    </div>
  </main>
</template>
