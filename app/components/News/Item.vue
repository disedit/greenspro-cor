<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const hasThumbnail = computed(() => props.post.thumbnail && props.post.thumbnail.url)
const { formatDate } = useDate()
const link = ref(null)
// bg-green bg-green-soft bg-yellow bg-yellow-soft bg-purple bg-purple-soft bg-black bg-white
// text-green text-yellow text-purple text-green-soft text-yellow-soft text-purple-soft text-black text-white
</script>


<template>
  <article class="group flex flex-col bg-white rounded-xl overflow-clip">
    <div class="relative">
      <div class="flex flex-wrap gap-1 lg:gap-3" :class="{ 'absolute top-5 left-5 z-2': hasThumbnail, 'p-5 pb-0': !hasThumbnail }">
        <span class="bg-primary text-white font-bold text-sm py-1 px-3 rounded-full">
          {{ formatDate(post.date) }}
        </span>
        <NuxtLink
          :to="`/news/page/1/?categories=${category.id}`"
          v-for="category in post.categories"
          :key="category.id"
          class="font-bold text-sm py-1 px-3 rounded-full hover:scale-[1.05] transition-transform duration-300"
          :class="`bg-${category.bg_color} text-${category.text_color}`"
        >
          {{ category.name }}
        </NuxtLink>
      </div>
      <NuxtImg
        v-if="post.thumbnail"
        :src="post.thumbnail.url"
        :alt="post.thumbnail.alt"
        class="w-full aspect-[1.7] object-cover cursor-pointer"
        @click="navigateTo(`/news/${post.slug}`)"
      />
    </div>
    <div class="p-3 h-full flex">
      <NuxtLink :to="`/news/${post.slug}`" class="flex flex-col gap-10 p-2 text-lg md:text-md text-secondary rounded-xl focus-secondary h-full">
        <h3
          class="font-bold leading-tight text-balance underline decoration-secondary/0 group-hover:decoration-secondary/50 transition-colors duration-300"
          :class="{
            'text-[1.5em]': !hasThumbnail,
            'text-[1.1em]': hasThumbnail
          }"
        >
          {{ post.title }}
        </h3>
        <div class="text-base mt-auto inline-flex items-center justify-between gap-2 font-bold w-full leading-none">
          <span>Read more</span>
          <Icon name="ri:arrow-right-line" class="group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </NuxtLink>
    </div>
  </article>
</template>
