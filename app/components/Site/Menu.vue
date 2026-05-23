<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})

const { link, isActive } = useUtils()

// Handle submeus
const hovering = ref(null)

function toggleHover (id) {
  if (hovering.value === id) {
    hovering.value = null
  } else {
    hovering.value = id
  }
}

function hover(id) {
  hovering.value = id
}

function unhover() {
  hovering.value = null
}
</script>

<template>
  <ul aria-label="Main navigation" class="font-bold text-base">
    <li
      v-for="(item, i) in items"
      :key="i"
      :class="['menu-item', {
        open: hovering === i,
        'primary-green': item.color !== 'purple',
        'primary-purple': item.color === 'purple',
      }]"
      @mouseenter="hover(i)"
      @mouseleave="unhover"
    >
      <NuxtLink
        v-if="item.acf_fc_layout === 'submenu'"
        :to="link(item.top_level_link)"
        class="menu-link has-submenu flex items-center gap-1 py-1 px-3 rounded-md transition-colors text-primary hover:bg-primary-soft/20"
        :class="{ 'active': isActive(item.top_level_link) }"
        :aria-expanded="hovering === i ? 'true' : 'false'"
        @click.prevent="toggleHover(i)"
        @keydown.down.prevent="toggleHover(i)"
      >
        {{ item.top_level_link.title }}
        <Icon name="ri:arrow-down-s-line" class="" aria-hidden="true" />
      </NuxtLink>
      <NuxtLink v-else :to="link(item.url)" :class="{ active: isActive(item.link) }">
        {{ item.title }}
      </NuxtLink>

      <ul v-if="item.acf_fc_layout === 'submenu'" class="submenu">
        <li v-for="(subitem, s) in item.items" :key="s">
          <NuxtLink
            :to="link(subitem.link)"
            @click="unhover"
            class="submenu-link px-3 py-1 block transition-colors hover:bg-primary-soft/20 active:bg-primary active:text-white"
          >
            {{ subitem.link?.title }}
          </NuxtLink>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
.submenu {
  position: absolute;
  visibility: hidden;
  transition: visibility 0s linear .2s, transform .2s ease;
  transform: translateY(calc(var(--border-width) * -1)) scaleY(0);
  transform-origin: 0 0;
  will-change: visibility, opacity, transform;
  background-color: var(--color-white);
  border: var(--border-width) solid var(--color-primary);
  min-width: 250px;
  border-radius: 0.5rem;
  overflow: hidden;

  &:has(li:first-child .submenu-link:hover) {
    z-index: 1200;
  }
}

.open {
  .submenu {
    visibility: visible;
    transition-delay: 0s;
    transform: translateY(calc(var(--border-width) * -1)) scaleY(1);
    z-index: 1000;
  }
}
</style>