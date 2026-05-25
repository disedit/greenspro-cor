<script setup>
const { params } = useRoute()
const settings = await useSettings()
const post = await usePost(params.slug)

/* SEO Metatags */
const siteName = settings.seo.site_name
const title = params.slug && params.slug.length > 0 ? `${post.title} - ${siteName}` : siteName
const ogTitle = title
const description = post.excerpt || settings.seo?.default_description
const ogImage = post.thumbnail?.url || settings.seo?.default_og_image?.url
const keywords = settings.seo?.default_keywords
useServerSeoMeta({
  title,
  ogTitle,
  description,
  ogDescription: description,
  ogImage,
  twitterCard: 'summary_large_image',
  keywords,
  ogSiteName: siteName,
  ogType: 'article'
})
useHead({ title })
</script>

<template>
  <main class="min-h-page pb-20 bg-flower px-base selection-secondary">
    <div class="2xl:container mx-auto">
      <UtilsPageHeader
        :breadcrumbs="[{ title: 'Newsroom', url: '/newsroom' }]"
        class="mt-16 mb-5 text-primary"
      />
      <div class="grid md:grid-cols-12 gap-8">
        <article class="bg-white rounded-xl overflow-clip md:col-span-9">
          <div class="relative">
            <NuxtPicture
              v-if="post.thumbnail?.url"
              :src="post.thumbnail.url"
              :alt="post.thumbnail.alt"
              format="avif,webp"
              :img-attrs="{ class: 'w-full max-h-[40vh] object-cover' }"
              sizes="100vw md:1000px"
            />
            <div class="p-5 md:p-10 flex flex-col gap-6 md:gap-8">
              <h1 class="text-secondary text-2xl md:text-xl font-bold leading-tighter text-balance">
                {{ post.title }}
              </h1>
              <div class="md:hidden primary-purple border-t border-primary">
                <NewsFacts :post="post" />
              </div>
              <div v-html="post.content" class="text-base gutenberg prose" />
              <ClientOnly>
                <UtilsShare :share-text="post.title" size="md" class="md:hidden primary-purple" />
              </ClientOnly>
            </div>
          </div>
        </article>
        <aside class="hidden md:block md:col-span-3 primary-green">
          <div class="sticky top-navbar">
            <NewsFacts :post="post" />
            <ClientOnly>
              <UtilsShare :share-text="post.title" size="md" class="mt-2" />
            </ClientOnly>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>