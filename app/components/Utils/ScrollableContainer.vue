<script setup>
const props = defineProps({
  scrollClass: {
    type: String,
    default: ''
  },
  topGradientClass: {
    type: String,
    default: 'pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-green-soft to-green-soft/0 z-10'
  },
  bottomGradientClass: {
    type: String,
    default: 'pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-green-soft to-green-soft/0 z-10'
  }
})

const scrollEl = ref(null)
const isAtTop = ref(true)
const isAtBottom = ref(false)
const isScrollable = ref(false)

const showTopGradient = computed(() => isScrollable.value && !isAtTop.value)
const showBottomGradient = computed(() => isScrollable.value && !isAtBottom.value)

const updateScrollState = () => {
  const el = scrollEl.value

  if (!el) {
    return
  }

  const threshold = 2
  const maxScrollTop = el.scrollHeight - el.clientHeight

  isScrollable.value = maxScrollTop > threshold
  isAtTop.value = el.scrollTop <= threshold
  isAtBottom.value = maxScrollTop - el.scrollTop <= threshold
}

onMounted(() => {
  const el = scrollEl.value

  if (!el) {
    return
  }

  el.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('resize', updateScrollState)
  nextTick(() => updateScrollState())
})

onUpdated(() => {
  updateScrollState()
})

onBeforeUnmount(() => {
  const el = scrollEl.value

  if (!el) {
    return
  }

  el.removeEventListener('scroll', updateScrollState)
  window.removeEventListener('resize', updateScrollState)
})
</script>

<template>
  <div class="relative">
    <div ref="scrollEl" :class="['overflow-y-auto', scrollClass]">
      <slot />
    </div>
    <Transition name="fade">
      <div v-if="showTopGradient" :class="topGradientClass" />
    </Transition>
    <Transition name="fade">
      <div v-if="showBottomGradient" :class="bottomGradientClass" />
    </Transition>
  </div>
</template>
