<script setup>
const socials = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/greenspro_cor/',
    icon: 'fa7-brands:instagram'
  },
  {
    name: 'Bluesky',
    url: 'https://bsky.app/profile/greensprocor.bsky.social',
    icon: 'fa7-brands:bluesky'
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/channel/UCQ0muyprNCqgK9k1tNLlj2w',
    icon: 'fa7-brands:youtube'
  },
  {
    name: 'Flickr',
    url: 'https://www.flickr.com/photos/200058085@N07/albums',
    icon: 'fa7-brands:flickr'
  }
]
</script>

<template>
  <ul class="flex gap-4 md:gap-6 flex-wrap justify-between md:justify-start">
    <li v-for="social in socials" :key="social.name">
      <a :href="social.url" target="_blank" rel="noopener noreferrer" class="text-purple bg-yellow rounded-full flex items-center justify-center p-3 hover:bg-purple hover:text-white">
        <Icon :name="social.icon" class="text-2xl" />
        <span class="sr-only">{{ social.name }}</span>
      </a>
    </li>
  </ul>
</template>
