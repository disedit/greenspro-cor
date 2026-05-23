<script setup>
const props =defineProps({
  socials: {
    type: Array,
    required: true
  }
})

const { platforms } = useUtils()
const socialLinks = props.socials ? props.socials.map(({ platform, url: link }) => {
  return {
    name: platforms[platform].name,
    link,
    icon: platforms[platform].icon,
  }
}) : null
</script>

<template>
  <UtilsSocials :socials="socialLinks" class="text-md" />
</template>
