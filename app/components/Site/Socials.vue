<script setup>
defineProps({
  socials: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <ul aria-label="Social media profiles" class="items-center">
    <li v-for="social in socials" :key="social.icon">
      <a :href="social.url" target="_blank" rel="noopener" class="flex items-center text-purple rounded-full p-1.5 hover:bg-purple/20 transition-colors">
        <Icon :name="social.icon" aria-hidden="true" />
        <span class="sr-only">{{ social.label }}</span>
      </a>
    </li>
  </ul>
</template>
