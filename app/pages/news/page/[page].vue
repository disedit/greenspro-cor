<script setup>
const settings = await useSettings()
const route = useRoute()
const page = route.params.page || 1
const categories = route.query.categories || null
const tags = route.query.tags || null
const commissions = route.query.commissions || null
const { $wp } = useNuxtApp()

const { data } = await useAsyncData(
  `news-${page}-${categories}-${tags}-${commissions}`, () => $wp.news()
    .param('categories', categories)
    .param('tags', tags)
    .param('commissions', commissions)
    .param('page', page)
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

const categoryIds = data.value.categories.map(category => category.id).join(',')
const tagIds = data.value.tags.map(tag => tag.id).join(',')
const commissionIds = data.value.commissions.map(commission => commission.id).join(',')
</script>

<template>
  <main class="min-h-page pb-20 px-base bg-flower">
    <div class="2xl:container mx-auto">
      <UtilsPageHeader title="Newsroom" class="mt-10 mb-5" />
      <section class="grid grid-cols-12 gap-6">
        <NewsPosts
          :posts="data.posts"
          :per-page="data.per_page"
          :page="data.page"
          :categories="categoryIds"
          :tags="tagIds"
          :commissions="commissionIds"
          class="col-span-9"
        />
        <NewsFilter class="col-span-3" />
      </section>
    </div>
  </main>
</template>
