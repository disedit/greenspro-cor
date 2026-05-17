<script setup>
defineProps({
  socials: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <ul class="flex">
    <li v-for="(platform, i) in socials" :key="i">
      <a
        :href="platform.link"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center p-2"
        :title="platform.label"
      >
        <Icon :name="platform.icon" class="h-5 w-5" />
      </a>
    </li>
  </ul>
</template>