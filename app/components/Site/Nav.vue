<script setup>
import { breakpointsTailwind } from '@vueuse/core'

defineProps({
  settings: {
    type: Object,
    required: true
  }
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('xl')
const { y } = useWindowScroll()
const showNavbar = ref(true)
const lastScrollPosition = ref(0)

watch(y, (currentScrollPosition) => {
  if (currentScrollPosition < 0 || Math.abs(currentScrollPosition - lastScrollPosition.value) < 60) {
    return
  }
  showNavbar.value = currentScrollPosition < lastScrollPosition.value
  lastScrollPosition.value = currentScrollPosition
})

const navCanHide = computed(() => {
  return !isMobile.value
})

/* Mobile menu */
const { setMenuOpen, unsetMenuOpen } = useColorMode()
const menuOpen = ref(false)
const showMenu = () => {
  menuOpen.value = true
  setMenuOpen()
}

const hideMenu = (index) => {
  menuOpen.value = false
  unsetMenuOpen()
}

function toggleMenu () {
  if (menuOpen.value) {
    hideMenu()
  } else {
    showMenu()
  }
}
</script>

<template>
  <div class="p-4 fixed top-0 left-0 right-0 duration-500 ease-out z-5000" :class="{ '-translate-y-full': !showNavbar && navCanHide }">
    <nav class="bg-white text-green 2xl:container mx-auto px-4 py-2 flex items-center justify-between rounded-xl">
      <NuxtLink to="/" aria-label="The Greens & Progressives in the European Committee of the Regions - Home">
        <SiteLogo class="h-10 md:h-13" />
      </NuxtLink>
      <SiteMenu :items="settings.menu" class="hidden lg:flex" />
      <SiteSocials :socials="settings.socials" class="hidden lg:flex text-md" />
      <button
        @click="toggleMenu"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        aria-controls="mainNav"
        :aria-expanded="menuOpen ? 'true' : 'false'"
        class="flex lg:hidden text-primary p-2 -m-2 text-lg"
      >
        <Icon name="ri:menu-fill" v-if="!menuOpen" />
        <Icon name="ri:close-fill" v-else />
      </button>
    </nav>
  </div>
  <SiteMobileMenu
    :open="menuOpen"
    :menu="settings.menu"
    :socials="settings.socials"
    @hide="hideMenu"
  />
  <div class="h-navbar"></div>
</template>
