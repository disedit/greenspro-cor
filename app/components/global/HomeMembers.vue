<script setup>
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
)

const countries = computed(() => {
  return profiles.value.map(profile => profile.country)
})

const selectedCountry = ref(null)
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
    <div class="2xl:container mx-auto rounded-xl grid md:grid-cols-12 gap-base">
      <UtilsScrollableContainer class="md:col-span-5 row-2 md:row-auto" scroll-class="flex md:flex-col gap-base -mx-base px-base md:mx-0 md:px-0 max-w-screen md:max-w-auto md:max-h-[60vh] scrollbar-none md:scrollbar-gutter-stable md:scrollbar-thin md:scrollbar-thumb-green md:scrollbar-track-green-soft">
        <ProfilesHomeProfile
          v-for="profile in profiles"
          :key="profile.id"
          :profile="profile"
          :page="block.link"
          @mouseenter="selectedCountry = profile.country"
          @mouseleave="selectedCountry = null"
        />
      </UtilsScrollableContainer>
      <div class="md:col-span-7 bg-white rounded-xl flex justify-end primary-purple">
        <UtilsMap
          class="h-full max-h-[60vh] w-auto"
          :selectable="countries"
          :selected="selectedCountry"
          :on-click-go-to="block.link"
        />
      </div>
    </div>
  </section>
</template>

<style>

</style>