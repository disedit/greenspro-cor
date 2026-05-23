<script setup>
const settings = await useSettings()
</script>

<template>
  <footer class="footer focus-yellow bg-primary text-white py-8 px-base selection-yellow">
    <div class="2xl:container mx-auto grid md:grid-cols-12 gap-12 md:gap-4">
      <div class="md:col-span-5">
        <div class="flex gap-3 mb-6">
          <SiteFlower class="h-11 w-auto" />
          <h2 class="text-base font-bold leading-tighter text-balance max-w-[50vh]">
          {{ settings.footer.name }}
          </h2>
        </div>
        <address v-html="settings.footer.address" class="not-italic text-xs prose" />
      </div>
      <div class="md:col-span-2">
        <h2 class="text-base font-bold mb-2 leading-tighter">Follow us</h2>
        <ul class="text-xs">
          <li v-for="social in settings.socials" :key="social.icon">
            <a :href="social.url" target="_blank" rel="noopener" class="flex w-fit items-center gap-2 text-white rounded-full px-3 py-1.5 -mx-3 hover:bg-black/20 hover:text-yellow transition-colors">
              <Icon :name="social.icon" aria-hidden="true" />
              <span>{{ social.label }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="md:col-span-3">
        <h2 class="text-base font-bold mb-2 leading-tighter">Useful Links</h2>
        <ul class="text-xs">
          <li v-for="item in settings.footer.useful_links" :key="item.link.url">
            <a :href="item.link.url" target="_blank" rel="noopener" class="flex items-center w-fit text-white rounded-2xl px-3 py-1.5 -mx-3 hover:bg-black/20 hover:text-yellow transition-colors">
              <span>{{ item.link.title }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="md:col-span-2 flex justify-center md:items-end md:justify-end">
        <a href="https://cor.europa.eu/" v-if="settings.footer?.cor_logo?.url">
          <img :src="settings.footer.cor_logo.url" alt="European Committee of the Regions" class="w-full max-w-40" />
        </a>
      </div>
    </div>
  </footer>
</template>
