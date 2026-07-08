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
    .param('order_by', props.block.order_by || 'menu_order')
)

const {
  country,
  commission,
  name,
  memberType,
  countryOptions,
  commissionOptions,
  memberTypeOptions,
  filteredProfiles
} = useProfileFilters(profiles)
</script>

<template>
  <section class="px-base">
    <div id="profiles" class="2xl:container mx-auto">
      <h3 v-if="block.heading" class="text-primary text-xl font-bold my-2 mb-4">
        {{ block.heading }}
      </h3>
      <ProfilesFilter
        v-if="block.filters && block.filters.length > 0"
        v-model:country="country"
        v-model:commission="commission"
        v-model:member-type="memberType"
        v-model:name="name"
        :country-options="countryOptions"
        :commission-options="commissionOptions"
        :member-type-options="memberTypeOptions"
        :show="block.filters"
        class="-mt-4"
      />
      <ProfilesGrid :profiles="filteredProfiles" />
    </div>
  </section>
</template>
