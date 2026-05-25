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
    <ul class="text-md font-bold leading-tighter flex flex-wrap items-center">
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.url">
        <NuxtLink :to="page(breadcrumb.url)" class="text-current hover:underline">
          {{ breadcrumb.title }}
        </NuxtLink>
        <span v-if="index < breadcrumbs.length - 1" class="mx-2 text-current/50">/</span>
      </li>
    </ul>
    <h1 v-if="title" class="font-bold text-3xl leading-tighter" v-html="title" />
  </div>
</template>

<style>

</style>