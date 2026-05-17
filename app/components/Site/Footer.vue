<script setup>
const settings = await useSettings()
</script>

<template>
  <footer class="bg-green text-white p-3">
    Footer
    <pre>{{ settings }}</pre>
  </footer>
</template>
