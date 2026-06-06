<script setup>
defineProps({
  block: {
    type: Object,
    required: true
  }
})

const settings = await useSettings()
</script>

<template>
  <div>
    <SiteSocials :socials="settings.socials" class="hidden lg:flex text-xl" />
  </div>
</template>
