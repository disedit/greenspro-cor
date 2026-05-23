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
(props.block.ordered_profiles && props.block.ordered_profiles.length > 0) ?
  $wp.profiles()
    .param('ids', props.block.ordered_profiles.join(','))
    : $wp.profiles()
    .param('populate', props.block.populate_with.join(','))
)

const {
  country,
  name,
  countryOptions,
  filteredProfiles
} = useProfileFilters(profiles)
</script>

<template>
  <section>
    <div id="profiles" class="2xl:container mx-auto px-base">
      <UtilsPageHeader
        :title="context.title"
        :breadcrumbs="context.breadcrumbs"
        class="mt-10"
      />
      <ProfilesFilter
        v-model:country="country"
        v-model:name="name"
        :country-options="countryOptions"
        :show="block.filters"
      />
      <ProfilesGrid :profiles="filteredProfiles" />
    </div>
  </section>
</template>
