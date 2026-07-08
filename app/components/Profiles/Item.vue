<script setup>
const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})

const { commissions } = useCommissions(props.profile.commissions)

const showMore = ref(false)
const summaryRef = ref(null)
const toggleRef = ref(null)
const showSummaryToggle = ref(false)

let summaryResizeObserver

const updateSummaryToggle = async () => {
  await nextTick()

  const summaryElement = summaryRef.value

  if (!summaryElement) {
    showSummaryToggle.value = false
    return
  }

  const wasExpanded = showMore.value

  if (wasExpanded) {
    summaryElement.classList.add('line-clamp-2')
  }

  showSummaryToggle.value = summaryElement.scrollHeight > summaryElement.clientHeight + 1

  if (wasExpanded) {
    summaryElement.classList.remove('line-clamp-2')
  }
}

onMounted(async () => {
  await updateSummaryToggle()

  if (!summaryRef.value || typeof ResizeObserver === 'undefined') {
    return
  }

  summaryResizeObserver = new ResizeObserver(() => {
    updateSummaryToggle()
  })

  summaryResizeObserver.observe(summaryRef.value)
})

onBeforeUnmount(() => {
  summaryResizeObserver?.disconnect()
})

watch(() => props.profile.summary, () => {
  showMore.value = false
  updateSummaryToggle()
})
</script>

<template>
  <article class="bg-white rounded-xl p-6 primary-purple">
    <div class="profile-grid grid grid-cols-[auto_1fr] gap-4">
      <div class="shrink-0 profile-picture">
        <NuxtImg
          v-if="profile.photo"
          :src="profile.photo"
          :alt="`Profile picture of ${profile.name}`"
          class="w-20 md:w-30 aspect-square object-cover rounded-full"
        />
        <div v-else class="w-20 md:w-30 aspect-square bg-primary-soft/20 rounded-full grid items-center justify-center">
          <Icon name="ri:user-line" class="text-primary text-2xl" />
        </div>
      </div>
      <div class="profile-basic text-primary flex flex-col gap-2 flex-1">
        <div class="flex flex-wrap items-center gap-2 justify-between">
          <h3 class="inline text-md leading-tight font-bold underline decoration-primary/0 group-hover:decoration-primary/50 transition-colors duration-300">{{ profile.name }}</h3>
          <div class="flex gap-1 items-center">
            <ProfilesMemberType v-if="profile.type" :type="profile.type" class="py-1" />
            <ProfilesCountry v-if="profile.country" :country="profile.country" class="py-1 px-2 ms-2" />
          </div>
        </div>
        <p class="leading-tight text-xs text-left text-balance">{{ profile.description }}</p>
        <div v-if="profile.email" class="text-xs">
          <a :href="`mailto:${profile.email}`" class="flex items-center gap-1 text-primary underlined-on-hover transition wrap-anywhere leading-tight">
            <Icon name="ri:mail-line" class="shrink-0" />
            <span>{{ profile.email }}</span>
          </a>
        </div>
        <div v-if="profile.phone" class="text-xs">
          <a :href="`tel:${profile.phone}`" class="flex items-center gap-1 text-primary underlined-on-hover transition wrap-anywhere leading-tight">
            <Icon name="ri:phone-line" class="shrink-0" />
            <span>{{ profile.phone }}</span>
          </a>
        </div>
        <div v-if="profile.languages" class="text-xs">
          <span class="flex items-center gap-1 text-primary leading-tight">
            <Icon name="ri:speak-line" class="shrink-0" />
            <span class="flex flex-wrap gap-2 items-center">
              <abbr v-for="lang in profile.languages" :key="lang.language_code" class="bg-primary/25 font-bold rounded px-1 text-center shrink-0 cursor-default" :title="lang.language_name">
                <span class="adjust">{{ lang.language_code }}</span>
              </abbr>
            </span>
          </span>
        </div>
        <ProfilesSocials :socials="profile.socials" :email="profile.email" v-if="profile.socials && profile.socials.length" />
      </div>
      <div class="profile-details text-primary flex flex-col gap-4 flex-1">
        <div v-if="commissions && commissions.length" class="mb-2">
          <ul class="flex flex-col gap-2 text-xs">
            <li v-for="commission in commissions" :key="commission.slug" class="flex items-center gap-2">
              <span class="bg-primary/25 font-bold w-17 rounded px-2 py-.5 text-center shrink-0">
                <span class="adjust">{{ commission.acronym }}</span>
              </span>
              <span class="leading-none text-balance">{{ commission.name }}</span>
            </li>
          </ul>
        </div>
        <div v-if="profile.summary" class="relative group" :class="{ 'cursor-pointer': showSummaryToggle }" @click="toggleRef?.click()">
          <div
            ref="summaryRef"
            v-html="profile.summary"
            class="text-black text-xs leading-normal [&>p]:mb-2 [&>p]:last:mb-0"
            :class="{ 'line-clamp-2': !showMore }"
          />
          <button
            ref="toggleRef"
            v-if="showSummaryToggle"
            type="button"
            class="underlined cursor-pointer group-hover:font-bold transition bg-white"
            :class="{ 'absolute right-0 bottom-0': !showMore }"
            @click.stop="showMore = !showMore"
          >
            {{ showMore ? 'Show less' : 'Read more' }}
            <div v-if="!showMore" class="absolute left-0 inset-y-0 w-15 bg-linear-to-r from-white/0 via-white/75 to-white -translate-x-full"></div>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.profile-grid {
  grid-template-areas: 
    "picture basic"
    "details details";
}

.profile-picture {
  grid-area: picture;
}

.profile-basic {
  grid-area: basic;
}

.profile-details {
  grid-area: details;
}

@media (width >= 48rem) {
  .profile-grid {
    grid-template-areas: 
      "picture basic"
      "picture details";
  }
}
</style>