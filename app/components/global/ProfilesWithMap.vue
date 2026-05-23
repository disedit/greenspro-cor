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
</script>

<template>
  <section>
    <div class="overflow-clip">
      <div class="grid max-w-400 mx-auto">
        <div class="flex justify-end row-1 col-1 relative -mx-20">
          <UtilsMap
            :selectable="countries"
            :selected="country"
            @select="handleMapSelect"
            class="h-full max-h-[90vh] w-auto"
          />
          <div class="bg-linear-to-r from-primary-soft/0 to-primary-soft w-20 absolute top-0 right-0 bottom-0" />
        </div>
        <div class="relative z-10 pointer-events-none 2xl:container mx-auto px-base row-1 col-1 pt-navbar w-full">
          <UtilsPageHeader
            :title="context.title"
            :breadcrumbs="context.breadcrumbs"
            class="mt-5 md:mt-20 w-fit bg-primary-soft shadow-[0_0_100px_100px_var(--color-primary-soft)]"
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
  </section>
</template>