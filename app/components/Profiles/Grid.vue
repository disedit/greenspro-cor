<script setup>
defineProps({
  profiles: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="grid gap-base md:gap-10 md:grid-cols-2">
    <div v-if="!profiles.length" class="text-center text-primary text-lg py-20 col-span-2">
      No members found matching your filter.
    </div>
    <ProfilesItem v-else v-for="profile in profiles" :key="profile.id" :profile="profile" />
  </div>
</template>
