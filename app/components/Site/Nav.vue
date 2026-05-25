<script setup>
defineProps({
  settings: {
    type: Object,
    required: true
  }
})

const { y, navbarHidden, setMenuOpen, unsetMenuOpen } = useNav()

/* Mobile menu */
const menuOpen = ref(false)
const showMenu = () => {
  menuOpen.value = true
  setMenuOpen()
}

const hideMenu = () => {
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
  <div class="py-4 2xl:py-5 px-base fixed top-0 left-0 right-0 duration-500 ease-out z-5000" :class="{ '-translate-y-full': navbarHidden }">
    <nav class="bg-white text-green 2xl:container mx-auto px-4 py-2 flex items-center justify-between rounded-xl transition-all duration-300" :class="{ 'shadow-xl shadow-pine/20': y > 100 }">
      <NuxtLink to="/" aria-label="The Greens & Progressives in the European Committee of the Regions - Home">
        <SiteLogo class="h-10 2xl:h-13" />
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
  <div class="nav-filler h-navbar"></div>
</template>
