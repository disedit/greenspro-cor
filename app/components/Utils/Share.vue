<script setup>
const props = defineProps({
  title: { type: String, default: 'Share' },
  shareText: { type: String, default: '' },
  size: { type: String, default: 'lg' },
})

const platforms = [
  {
    name: 'WhatsApp',
    icon: 'fa7-brands:whatsapp',
    url: () => {
      const text = encodeURIComponent(props.shareText)
      const url = encodeURIComponent(window.location.href)
      return `https://api.whatsapp.com/send?text=${text}%20${url}`
    }
  },
  {
    name: 'Facebook',
    icon: 'fa7-brands:facebook',
    url: () => {
      const url = encodeURIComponent(window.location.href)
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`
    }
  },
  {
    name: 'LinkedIn',
    icon: 'fa7-brands:linkedin',
    url: () => {
      const url = encodeURIComponent(window.location.href)
      return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    }
  },
]

const copied = ref(false)
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy: ', err)
    alert('Failed to copy link. Please try copying manually.')
  }
}

const canShare = ref(false)
const shareDialog = () => {
  navigator.share({
    title: document.title,
    text: props.shareText,
    url: window.location.href,
  }).catch((error) => console.error('Error sharing', error))
}
onMounted(() => {
  canShare.value = !!navigator.share
})
</script>

<template>
  <div>
    <h4 class="font-bold text-primary mb-4 text-base flex items-center gap-2">
      <Icon name="ri:share-2-line" class="shrink-0" />
      {{ title }}
    </h4>
    <div :class="['flex flex-wrap gap-3 justify-between', size === 'lg' ? 'text-lg' : 'text-md']">
      <a
        v-for="platform in platforms"
        :key="platform.name" :href="platform.url ? platform.url() : '#'"
        class="flex items-center gap-2 text-white bg-primary hover:bg-yellow hover:text-green font-bold p-3 rounded-full transition"
        :title="`Share on ${platform.name}`"
        >
          <Icon :name="platform.icon" />
          <span class="sr-only">Share on {{ platform.name }}</span>
      </a>
      <button
        @click.prevent="copyToClipboard()"
        class="flex items-center gap-2 text-white bg-primary hover:bg-yellow hover:text-green font-bold p-3 rounded-full cursor-pointer aspect-square transition"
        title="Copy link to clipboard"
      >
        <Icon :name="copied ? 'ri:check-fill' : 'ri:link'" />
        <span class="sr-only">Copy link to clipboard</span>
      </button>
      <button
        v-if="canShare"
        @click.prevent="shareDialog()"
        class="flex items-center gap-2 text-white bg-primary hover:bg-yellow hover:text-green font-bold p-3 rounded-full cursor-pointer transition"
        title="More options to share"
      >
        <Icon name="ri:share-2-line" />
        <span class="sr-only">More options to share</span>
      </button>
    </div>
  </div>
</template>
