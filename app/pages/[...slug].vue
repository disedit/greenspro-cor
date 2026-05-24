<script setup>
const { params } = useRoute()
const settings = await useSettings()
const page = await usePage(params.slug)

/* SEO Metatags */
const siteName = settings.seo.site_name
const title = params.slug && params.slug.length > 0 ? `${page.title} - ${siteName}` : siteName
const ogTitle = page.fields?.seo?.title || title
const description = page.fields?.seo?.description || settings.seo?.default_description
const ogImage = page.fields?.seo?.og_image?.url || settings.seo?.default_og_image?.url
const keywords = page.fields?.seo?.keywords || settings.seo?.default_keywords
useServerSeoMeta({
  title,
  ogTitle,
  description,
  ogDescription: description,
  ogImage,
  twitterCard: 'summary_large_image',
  keywords,
  ogSiteName: siteName,
  ogType: 'website'
})
useHead({
  title,
  htmlAttrs: {
    class: `primary-${page.fields?.primary_color}`
  }
})
</script>

<template>
  <main class="grid gap-8 min-h-page pb-20" :class="{ 'bg-flower': page.fields?.show_background_logo }">
    <UtilsBlocks :blocks="page.fields?.blocks" :context="page" />
  </main>
</template>