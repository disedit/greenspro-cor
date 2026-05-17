<script setup>
const { params } = useRoute()
const settings = await useSettings()
const post = await usePost(params.slug)

/* Load related posts */
const { $wp } = useNuxtApp()
const tagIds = post.tags ? post.tags.map(tag => tag.id) : []
const categoyIds = !post.tags && post.categories ? post.categories.map(tag => tag.categories) : []
const { data: morePosts } = await useAsyncData(
  `news-${categoyIds.join('-')}-${tagIds.join('-')}`, () => $wp.news()
    .param('tags', tagIds.join(','))
    .param('categories', categoyIds.join(','))
    .param('per_page', 4)
)
const relatedPosts = morePosts.value.posts.filter(p => p.id !== post.id)

/* Post */
const { humanDate } = useDate()
const { category } = useUtils()
const mainCategory = category(post)

/* SEO Metatags */
const siteName = settings.seo.site_name
const title = params.slug && params.slug.length > 0 ? `${post.title} - ${siteName}` : siteName
const ogTitle = title
const description = post.excerpt || settings.seo?.default_description
const ogImage = post.thumbnail?.url || settings.seo?.default_og_image?.url
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
  ogType: 'article'
})
useHead({ title })
</script>

<template>
  <main class="min-h-page">
    <div class="bg-white relative z-1 contained p-0">
      Page header
      <article class="page-container grid lg:grid-cols-[1fr_28rem] gap-site md:gap-inner">
        <div>
          <NuxtPicture
            v-if="post.thumbnail?.url"
            :src="post.thumbnail.url"
            :alt="post.thumbnail.alt"
            :img-attrs="{ class: 'w-full mb-6' }"
            sizes="100vw md:1600px"
          />

          <div v-html="post.content" class="text-base prose max-w-[85ch] my-8 lg:my-0" />

          <div v-if="post.tags || post.categories" class="flex gap-2 text-sm text-primary mt-8 font-medium">
            <Icon name="ri:price-tag-3-line" class="text-base relative translate-y-(--border-width)" />
            <ul class="flex flex-wrap gap-2">
              <li v-for="category in post.categories" :key="category.id">
                <NuxtLink :to="`/news/page/1/?categories=${category.id}`" class="hover:underline">
                  <NewsCategory :category="category" />
                </NuxtLink>
              </li>
              <li v-for="tag in post.tags" :key="tag.id">
                <NuxtLink :to="`/news/page/1/?tags=${tag.id}`" class="hover:underline">
                  <NewsCategory :category="tag" />
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <aside>
          <div>
            <ClientOnly>
              <UtilsShare :share-text="post.title" size="md" class="order-1 lg:order-3" />
            </ClientOnly>
          </div>
        </aside>
      </article>
    </div>
  </main>
</template>