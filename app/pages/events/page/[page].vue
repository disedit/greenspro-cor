<script setup>
const settings = await useSettings()
const route = useRoute()
const page = route.params.page || 1

const { $wp } = useNuxtApp()

const { data: events } = await useAsyncData(
  `events-${page}`, () => $wp.events()
    .param('page', page)
)

/* SEO Metatags */
const siteName = settings.seo.site_name
const title = `Events - ${siteName}`
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
useHead({
  title,
    htmlAttrs: {
    class: `primary-purple`
  }
})
</script>

<template>
  <UtilsPageHeader title="Events" />
  <EventsList
    :events="events"
    :page="page"
    :per-page="perPage"
    class="page-container"
  />
</template>
