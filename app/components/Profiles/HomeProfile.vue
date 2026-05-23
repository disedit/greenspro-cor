<script setup>
const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  page: {
    type: Object,
    required: true
  }
})

const { link } = useUtils()

const memberTypes = {
  full_member: 'Member',
  alternate_member: 'Alternate member'
}

const memberType = computed(() => {
  return memberTypes[props.profile.type] || null
})
</script>

<template>
  <NuxtLink :to="`${link(page)}?slug=${profile.slug}#profiles`" class="group bg-white rounded-xl p-5 grid grid-rows-[auto_1fr] md:grid-rows-[auto] md:grid-cols-6 gap-3 items-center min-w-[50vw] md:min-w-0">
    <div class="self-start md:self-center flex justify-center">
      <img v-if="profile.photo" :src="profile.photo" :alt="`Profile picture of ${profile.name}`" class="w-30 md:w-full aspect-square object-cover rounded-full" />
      <div v-else class="w-30 md:w-full aspect-square bg-primary-soft/20 rounded-full" />
    </div>
    <div class="self-start md:self-center md:col-span-5 flex flex-col gap-1">
      <div class="flex flex-col md:flex-row items-center gap-2">
        <h3 class="inline text-[1.2rem] leading-tight font-bold underline decoration-primary/0 group-hover:decoration-primary/50 transition-colors duration-300">{{ profile.name }}</h3>
        <div class="flex gap-1 items-center mb-3 md:mb-0 -translate-y-0.5">
          <span class="bg-primary-soft/20 text-green rounded px-2 text-xs">
            <span class="adjust-baseline">{{ memberType }}</span>
          </span>
          <ProfilesCountry :country="profile.country" />
        </div>
      </div>
      <p class="leading-tight text-xs md:text-[.95rem] text-center md:text-left text-balance">{{ profile.description }}</p>
    </div>
  </NuxtLink>
</template>

<style>

</style>