<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  breadcrumbs: {
    type: Array,
    required: false,
    default: () => []
  }
})

const { page } = useUtils()
</script>

<template>
  <div>
    <ul class="text-md font-bold leading-tighter">
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.url">
        <NuxtLink :to="page(breadcrumb.url)" class="text-primary hover:underline">
          {{ breadcrumb.title }}
        </NuxtLink>
        <span v-if="index < breadcrumbs.length - 1" class="mx-2 text-primary/50">/</span>
      </li>
    </ul>
    <h1 v-if="title" class="text-primary font-bold text-3xl leading-tighter">
      {{ title }}
    </h1>
  </div>
</template>

<style>

</style>