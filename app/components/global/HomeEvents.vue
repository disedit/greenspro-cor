<script setup>
defineProps({
  block: {
    type: Object,
    required: true
  }
})

const { link } = useUtils()
const { $wp } = useNuxtApp()
const { data: events } = await useAsyncData(`events-homepage`, () =>
  $wp.events()
    .param('per_page', 2)
)

const combinedEvents = computed(() => {
  const upcoming = events.value.upcoming || []
  const past = events.value.past || []
  const combined = [...upcoming, ...past]
  return combined.slice(0, 2)
})
</script>

<template>
  <section class="px-base">
    <h2 class="2xl:container mx-auto flex justify-between items-baseline gap-2 mt-5 mb-1">
      <NuxtLink :to="link(block.link)" class="text-primary text-xl md:text-lg font-bold">
        {{ block.header }}
      </NuxtLink>
      <UtilsArrowLink :to="link(block.link)" class="text-primary text-sm md:text-base underlined transition-opacity duration-300">
        See more
      </UtilsArrowLink>
    </h2>
    <div class="2xl:container mx-auto grid md:grid-cols-2 gap-base md:gap-8">
      <EventsItem v-for="event in combinedEvents" :key="event.id" :event="event" />
    </div>
  </section>
</template>
