<script setup>
defineProps({
  profile: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <NuxtLink
    :to="`/who-we-are/our-members/?name=${profile.name}`"
    class="group bg-primary-soft/40 xl:bg-white grid grid-cols-[auto_1fr_auto] rounded-lg gap-3 p-3"
  >
    <NuxtImg
      v-if="profile.photo"
      :src="profile.photo"
      :alt="profile.name"
      class="rounded-full w-15 h-15 object-cover self-center"
    />
    <div v-else class="w-15 aspect-square bg-primary-soft/20 rounded-full grid items-center justify-center self-center">
      <Icon name="ri:user-line" class="text-primary text-lg" />
    </div>
    <div class="leading-tight self-center">
      <p class="leading-tight font-bold underline decoration-primary/0 group-hover:decoration-primary/50 transition-colors duration-300">{{ profile.name }}</p>
      <ProfilesMemberType v-if="profile.type" :type="profile.type" class="py-1" />
    </div>
    <ProfilesCountry :country="profile.country" class="self-start" />
    <p v-if="profile.description" class="text-left text-xs text-primary/75 col-span-3">
      {{ profile.description }}
    </p>
  </NuxtLink>
</template>
