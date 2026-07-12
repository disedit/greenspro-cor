<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false
  },
  menu: {
    type: Array,
    required: true
  },
  socials: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['hide'])

const { link } = useUtils()

/* Menu animations */
const { $gsap } = useNuxtApp()
let timeline

function beforeEnter(el) {
  $gsap.set(el, { scaleY: 0, scaleX: 0, transformOrigin: 'top right' })
}

function onEnter(el, done) {
  $gsap.set('.mobile-menu .animate', { y: '150%' })
  timeline = $gsap.timeline()

  timeline.to(el, {
    scaleY: 1,
    scaleX: 1,
    transformOrigin: 'top right',
    duration: .5,
    ease: 'power4.out',
  }).to('.mobile-menu .animate', {
    y: 0,
    duration: .25,
    ease: 'power4.out',
    stagger: .1
  })
}

function onLeave (el, done) {
  timeline = $gsap.timeline()
  timeline.to('.mobile-menu .animate', {
    y: '150%',
    duration: .25,
    stagger: {
      amount: .25,
      from: 'end'
    },
  }).to(el, {
    scaleY: 0,
    scaleX: 0,
    transformOrigin: 'top right',
    duration: .5,
    ease: 'power4.in'
  })
}

function onEnterCancelled() {
  timeline && timeline.kill()
}

function onLeaveCancelled() {
  timeline && timeline.kill()
}
</script>

<template>
  <Transition
    @before-enter="beforeEnter"
    @enter="onEnter"
    @enter-cancelled="onEnterCancelled"
    @leave="onLeave"
    @leave-cancelled="onLeaveCancelled">
    <nav
      id="mainNav"
      v-if="open"
      class="mobile-menu fixed inset-x-2 top-2 rounded-xl z-2000 bg-primary overflow-auto pt-navbar"
      aria-label="Main navigation"
    >
      <div class="flex flex-col container mx-auto h-full p-8">
        <NuxtLink
          v-for="(item, i) in menu"
          :key="item.top_level_link?.to || item.link?.to || i"
          :to="link(item.top_level_link || item.link)"
          @click="emit('hide', i)"
        >
          <div class="animate">{{ item.top_level_link?.title || item.link?.title }}</div>
        </NuxtLink>
        <div class="menu-socials pt-10 mt-auto overflow-hidden">
          <div class="animate">
            <SiteSocials :socials="socials" class="flex text-xl text-white" />
          </div>
        </div>
      </div>
    </nav>
  </Transition>
</template>

<style scoped>
.mobile-menu {
  --color-focus: var(--color-yellow);
  -webkit-overflow-scrolling: touch;

  a {
    display: block;
    position: relative;
    color: var(--color-white);
    text-decoration: none;
    font-size: var(--text-2xl);
    overflow: hidden;
    font-weight: 800;
    z-index: 5;
    line-height: 1;
    padding-block: .25em;
    text-wrap: balance;

    &:hover {
      color: var(--color-yellow);
    }

    &:active {
      color: var(--color-white);
    }
  }
}

.menu-socials {
  :deep(a) {
    color: var(--color-white);
  }
}

@media (max-width: 46rem) {
  .mobile-menu {
    display: flex;
  }

  .menu-open {
    .nav {
      --text-color: var(--color-white);
      --border-color: transparent;
      background: transparent,
    }
  }
}
</style>