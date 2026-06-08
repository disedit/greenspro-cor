<script setup>
const props = defineProps({
  profiles: {
    type: Array,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})

const totalProfiles = computed(() => props.profiles.length)
const totalCountries = computed(() => new Set(props.profiles.map(profile => profile.country)).size)
const totalWomen = computed(() => props.profiles.filter(profile => profile.gender === 'female').length)
const totalMen = computed(() => props.profiles.filter(profile => profile.gender === 'male').length)
const computedText = computed(() => {
  return props.text.replace('{TOTAL_MEMBERS}', totalProfiles.value)
  .replace('{TOTAL_COUNTRIES}', totalCountries.value)
  .replace('{TOTAL_WOMEN}', totalWomen.value)
  .replace('{TOTAL_MEN}', totalMen.value)
})
</script>

<template>
  <div class="flex gap-6 leading-none">
    <div class="w-50">
      <div class="text-xl font-bold">{{ totalProfiles }}</div>
      <div class="text-[1.2em]">members and alternates</div>
    </div>
    <div class="w-50">
      <div class="text-xl font-bold">{{ totalCountries }}</div>
      <div class="text-[1.2em]">countries</div>
    </div>
  </div>
  <div v-html="computedText" class="prose gutenberg text-[.9em] mt-4" />
</template>

<style>

</style>