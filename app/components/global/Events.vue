<script setup>
const props = defineProps({ block: Object, context: Object })

const { $wp } = useNuxtApp()

const { data: events } = await useAsyncData(
  `events`, () => $wp.events()
)
</script>

<template>
  <section class="px-base">
    <div class="max-w-300 mx-auto">
      <UtilsPageHeader
        :title="context.title"
        :breadcrumbs="context.breadcrumbs"
        class="mt-10 text-primary relative z-100"
      />
      <template v-if="events.upcoming.length > 0">
        <h2 class="text-primary font-extrabold text-md leading-none mt-10 mb-4 flex items-center gap-2">
          Upcoming events
          <Icon name="ri:arrow-right-up-line" />
        </h2>
      <div class="flex flex-col gap-site md:gap-18">
        <EventsEvent
          v-for="event in events.upcoming"
          :key="event.id"
          :event="event"
        />
      </div>

      <h2 class="text-primary font-extrabold text-md leading-none mt-10 mb-4 flex items-center gap-2">
        <Icon name="ri:arrow-left-down-line" />
        Past events
        
      </h2>
    </template>
    <EventsList
      :events="events.past"
      :per-page="10"
      :page="1"
    />

    </div>
  </section>
</template>
