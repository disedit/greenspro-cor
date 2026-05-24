<script setup>
import countryLabels from "@/data/countries.js"

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const { link } = useUtils()
const { $wp } = useNuxtApp()
const { data: profiles } = await useAsyncData(`profiles-homepage`, () =>
  $wp.profiles()
    .param('populate', props.block.profiles.join(','))
    .param('brief', true)
    .param('order_by', props.block.order_by || 'menu_order')
)

const countries = computed(() => {
  return profiles.value.map(profile => profile.country)
})

const selectedCountry = ref(null)

const {
  hoveredCountry,
  hoveredCountryName,
  hoveredCountryMembers,
  hoveredCountryAlternates
} = useMap(profiles)
</script>

<template>
  <section class="px-base">
    <h2 class="2xl:container mx-auto flex justify-between items-baseline gap-2 mt-5 mb-1">
      <NuxtLink :to="link(block.link)" class="text-primary text-xl md:text-lg font-bold">
        {{ block.header }}
      </NuxtLink>
      <UtilsArrowLink :to="link(block.link)" class="text-primary text-base underlined transition-opacity duration-300">
        See more
      </UtilsArrowLink>
    </h2>
    <div class="2xl:container mx-auto rounded-xl grid md:grid-cols-12 gap-8">
      <UtilsScrollableContainer class="md:col-span-5 row-2 md:row-auto" scroll-class="flex md:flex-col gap-4 -mx-base px-base md:mx-0 md:px-0 max-w-screen md:max-w-auto md:max-h-[60vh] scrollbar-none md:scrollbar-gutter-stable md:scrollbar-thin md:scrollbar-thumb-green md:scrollbar-track-green-soft">
        <ProfilesHomeProfile
          v-for="profile in profiles"
          :key="profile.id"
          :profile="profile"
          :page="block.link"
          @mouseenter="selectedCountry = profile.country; hoveredCountry = profile.country"
          @mouseleave="selectedCountry = null; hoveredCountry = null"
        />
      </UtilsScrollableContainer>
      <div class="relative md:col-span-7 bg-white rounded-xl flex justify-end primary-purple">
        <Transition name="fadeUpSlight" mode="out-in">
          <div v-if="hoveredCountry" class="absolute top-0 left-0 p-5 text-primary text-base">
            <h2 class="font-bold text-md flex items-center gap-2">
              <ProfilesCountry :country="hoveredCountry" class="text-base py-1 px-2" />
              {{ hoveredCountryName }}
            </h2>
            <p v-if="hoveredCountryMembers">{{ hoveredCountryMembers }} members</p>
            <p v-if="hoveredCountryAlternates">{{ hoveredCountryAlternates }} alternates</p>
          </div>
        </Transition>
        <UtilsMap
          class="h-full max-h-[60vh] w-auto"
          :selectable="countries"
          :selected="selectedCountry"
          @hover="(country) => hoveredCountry = country"
          :on-click-go-to="block.link"
        />
      </div>
    </div>
  </section>
</template>

<style>

</style>