<script setup>
defineProps({
  events: {
    type: Array,
    required: true
  },
  page: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div>
    <div class="flex flex-col gap-site md:gap-20">
      <EventsEvent
        v-for="event in events"
        :key="event.id"
        :event="event"
      />
    </div>
    <EventsPagination
      :total="events.length"
      :page="page"
      :per-page="perPage"
    />
  </div>
</template>

