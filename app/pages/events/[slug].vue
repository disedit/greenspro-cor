<script setup>
const { params } = useRoute()
const settings = await useSettings()
const event = await useEvent(params.slug)
const { humanDate, time } = useDate()

/* SEO Metatags */
const siteName = settings.seo.site_name
const title = params.slug && params.slug.length > 0 ? `${event.title} - ${siteName}` : siteName
const ogTitle = title
const description = event.details || settings.seo?.default_description
const ogImage = event.thumbnail?.url || settings.seo?.default_og_image?.url
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
useHead({
  title,
    htmlAttrs: {
    class: `primary-purple`
  }
})
</script>

<template>
  <main class="min-h-page px-base">
    <header class="max-w-300 mx-auto">
      <UtilsPageHeader
        :breadcrumbs="[
          { title: 'Get involved', url: '/get-involved' },
          { title: 'Our events', url: '/get-involved/our-events' },
        ]"
        class="text-primary mt-10 mb-4"
      />
    </header>
    <article class="max-w-300 mx-auto grid gap-8 bg-white rounded-2xl overflow-clip p-5 md:p-10 mb-10 md:mb-20">
      <div v-if="event.thumbnail?.url">
        <NuxtPicture
          format="avif,webp"
          :src="event.thumbnail.url"
          :alt="event.thumbnail.alt"
          :img-attrs="{ class: 'w-full rounded-lg' }"
          sizes="100vw md:1000px"
        />
      </div>
      <h1 class="text-secondary font-bold text-xl leading-tight">
        {{ event.title }}
      </h1>
      <div :class="['flex flex-col gap-8 text-secondary', { 'md:col-span-2' : event.thumbnail?.url }]">
        <time :datetime="event.fields.date" class="flex gap-12 text-md font-medium leading-none">
          <div class="flex gap-2 items-center">
            <Icon name="ri:calendar-line" />
            {{ event.fields.has_manual_date && event.fields.manual_date ? event.fields.manual_date : humanDate(event.fields.date_and_time)  }}
          </div>
          <div v-if="!event.fields.full_day" class="flex gap-2 items-center">
            <Icon name="ri:time-line" />
            {{ !event.fields.has_manual_date ? time(event.fields.date_and_time) : event.fields.manual_time }}
          </div>
        </time>
        <address v-if="event.fields.city_region || event.fields.venue || event.fields.addres" class="not-italic flex gap-2 text-md leading-none">
          <Icon name="ri:map-pin-2-line" />
          <div>
            <strong class="mb-2">{{ event.fields.venue }}</strong>
            <strong class="block mb-2">{{ event.fields.city_region }}</strong>
            <div class="text-md">{{ event.fields.address }}</div>
          </div>
        </address>
        <div v-if="event.fields.details || event.fields.short_description" class="flex gap-2 text-md leading-none">
          <Icon name="ri:information-2-line" />
          <div>
            <div v-html="event.fields.short_description" class="text-md" />
            <div v-html="event.fields.details" class="text-md" />
          </div>
        </div>
        <div v-if="event.fields.button_link">
          <a
            :href="event.fields.button_link"
            class="text-md"
            target="_blank"
          >
            {{ event.fields.button_label || 'More details' }}
        </a>
        </div>
        <div v-html="event.content" class="text-base text-blackish prose max-w-[85ch]" />
      </div>
    </article>
  </main>
</template>