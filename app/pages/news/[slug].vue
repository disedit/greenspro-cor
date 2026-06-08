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
      <div class="grid xl:grid-cols-12 gap-8">
        <article class="bg-white rounded-xl overflow-clip xl:col-span-9">
          <div class="relative">
            <NuxtPicture
              v-if="post.thumbnail?.url"
              :src="post.thumbnail.url"
              :alt="post.thumbnail.alt"
              format="avif,webp"
              :img-attrs="{ class: 'w-full max-h-[40vh] object-cover' }"
            />
            <div class="p-5 md:p-10 flex flex-col gap-6 md:gap-8">
              <h1 class="text-secondary text-2xl md:text-xl font-bold leading-tighter text-balance">
                {{ post.title }}
              </h1>
              <div class="xl:hidden primary-purple border-t border-primary">
                <NewsFacts :post="post" />
              </div>
              <div v-html="post.content" class="text-base gutenberg prose" />
              <NewsFact v-if="post.thumbnail.caption" icon="ri:information-line" label="Photo credit" class="text-secondary xl:border-b-0 border-t text-xs">
                {{ post.thumbnail.caption }}
              </NewsFact>
              <ClientOnly>
                <UtilsShare :share-text="post.title" size="md" class="xl:hidden primary-purple" />
              </ClientOnly>
            </div>
          </div>
        </article>
        <aside class="hidden xl:block xl:col-span-3 primary-green">
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