<script setup>
const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const month = computed(() => {
  const date = new Date(props.event.fields.date_and_time)
  return date.toLocaleString('en-US', { month: 'short' })
})
const day = computed(() => {
  const date = new Date(props.event.fields.date_and_time)
  return date.getDate()
})
const year = computed(() => {
  const date = new Date(props.event.fields.date_and_time)
  return date.getFullYear()
})
const time = computed(() => {
  if (props.event.fields.manual_time) return props.event.fields.manual_time
  const date = new Date(props.event.fields.date_and_time)
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
})
</script>

<template>
  <NuxtLink :to="`/events/${event.slug}`" class="group bg-white rounded-xl flex">
    <div class="text-center text-base flex flex-col justify-center font-bold gap-1 md:gap-0 md:leading-none border-r-3 border-primary-soft py-5 px-8">
      <div class="uppercase">{{ month }}</div>
      <div class="text-2xl md:text-xl font-bold -my-2">{{ day }}</div>
      <div>{{ year }}</div>
    </div>
    <div class="flex flex-col w-full justify-between gap-2 md:gap-1 p-5">
      <h3 class="font-bold text-[1.2rem] md:text-md leading-tighter text-balance underline decoration-primary/0 group-hover:decoration-primary/50 transition-colors duration-300">
        {{ event.title }}
      </h3>
      <p class="text-sm text-balance">{{ event.fields.short_description }}</p>
      <div class="flex items-center gap-4 text-sm">
        <div class="flex items-center gap-1">
          <Icon name="ri:map-pin-2-line" class="inline-block me-1" />
          <span v-if="event.fields.manual_date" class="adjust">{{ event.fields.manual_date }}</span>
          <span class="adjust">
            {{ event.fields.venue }}
          </span>
        </div>
        <div v-if="!event.fields.full_day" class="flex items-center gap-1">
          <Icon name="ri:time-line" class="inline-block me-1" />
          <span class="adjust">{{ time }}</span>
        </div>
        <Icon name="ri:arrow-right-line" class="ms-auto text-md group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </div>
  </NuxtLink>
</template>