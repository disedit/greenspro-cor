<script setup>
const props = defineProps({
  block: {
    type: Object,
    required: true
  },
  context: {
    type: Object,
    required: true
  }
})

const { $wp } = useNuxtApp()
const route = useRoute()
const { data: profiles } = await useAsyncData(`profiles-${route.path}`, () =>
  $wp.profiles()
    .param('populate', props.block.profiles.join(','))
    .param('order_by', props.block.order_by || 'menu_order')
)

const {
  country,
  commission,
  memberType,
  name,
  countryOptions,
  commissionOptions,
  memberTypeOptions,
  filteredProfiles
} = useProfileFilters(profiles)

const countries = computed(() => {
  return countryOptions.value.map(option => option.value)
})

const handleMapSelect = (selectedCountry) => {
  country.value = selectedCountry
}

const {
  hoveredCountry,
  hoveredCountryName,
  hoveredCountryMembers,
  hoveredCountryAlternates,
  hoveredCountryStyle,
  handleMapMouseMove
} = useMap(profiles)
</script>

<template>
  <section @mousemove="handleMapMouseMove">
    <div class="overflow-clip max-w-screen -mt-25">
      <div class="relative grid 2xl:max-w-400 mx-auto z-100">
        <div class="flex justify-end row-1 col-1 relative 2xl:-mx-20">
          <UtilsMap
            :selectable="countries"
            :selected="country"
            @select="handleMapSelect"
            @hover="(country) => hoveredCountry = country"
            class="h-full min-h-150 2xl:min-h-180 xl:max-h-[75vh] w-auto"
          />
          <div class="bg-linear-to-r from-primary-soft/0 to-primary-soft w-20 absolute top-0 right-0 bottom-0 pointer-events-none" />
        </div>
        <div class="relative z-10 pointer-events-none 2xl:container mx-auto px-base row-1 col-1 pt-navbar w-full flex flex-col">
          <UtilsPageHeader
            :title="context.title"
            :breadcrumbs="context.breadcrumbs"
            class="mt-5 md:mt-20 w-fit text-primary bg-primary-soft shadow-[0_0_100px_75px_var(--color-primary-soft)]"
          />
        </div>
      </div>
    </div>
    <div id="profiles" class="2xl:container mx-auto px-base">
      <ProfilesFilter
        v-model:country="country"
        v-model:commission="commission"
        v-model:member-type="memberType"
        v-model:name="name"
        :country-options="countryOptions"
        :commission-options="commissionOptions"
        :member-type-options="memberTypeOptions"
      />
      <ProfilesGrid :profiles="filteredProfiles" />
    </div>
    <Transition name="fadeUp">
      <div
        v-if="hoveredCountry"
        class="hidden md:block text-primary text-base absolute z-100 bg-white py-3 px-4 rounded-lg pointer-events-none leading-tight shadow-lg"
        :style="hoveredCountryStyle"
      >
        <h2 class="font-bold text-md flex items-center gap-2 mb-1">
          <ProfilesCountry :country="hoveredCountry" class="text-base py-1 px-2" />
          {{ hoveredCountryName }}
        </h2>
        <p v-if="hoveredCountryMembers" class="text-nowrap">{{ hoveredCountryMembers }} members</p>
        <p v-if="hoveredCountryAlternates" class="text-nowrap">{{ hoveredCountryAlternates }} alternates</p>
      </div>
    </Transition>
  </section>
</template>