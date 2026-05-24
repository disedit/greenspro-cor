<script lang="ts" setup>
const props = defineProps({
  all: {
    type: Object,
    required: true
  },
  filters: {
    type: Object,
    required: true
  }
})

const { toggleFilter, selected, search, searchTerm } = useNewsFilter(props.filters)
const { commissions } = useCommissions(props.all.commissions)
</script>

<template>
  <aside>
    <div class="sticky top-navbar max-h-[calc(100vh-theme(space.navbar))] overflow-y-auto p-3 -m-3 md:scrollbar-gutter-stable md:scrollbar-thin md:scrollbar-thumb-green md:scrollbar-track-green-soft">
      <h2 class="sr-only">Filters</h2>
      <form @submit.prevent="search">
        <UtilsInput
          v-model="searchTerm"
          name="name"
          label="Search"
          type="search"
          placeholder="Search"
          icon="ri:search-line"
        />
        <button type="submit" class="sr-only">Search</button>
      </form>
      <NewsFilter
        label="Publication type"
        icon="ri:archive-line"
      >
      <ul class="flex flex-wrap gap-3 text-base">
        <li v-for="category in all.categories" :key="category.id">
          <NuxtLink
            :to="toggleFilter('categories', category.id)"
            class="font-bold text-sm py-1 px-3 rounded-full hover:scale-[1.05] flex gap-2 items-center transition-transform duration-300"
            :class="[`bg-${category.bg_color} text-${category.text_color}`, {
              'font-bold group outline-2 outline-offset-1 outline-primary': selected('categories', category.id),
            }]"
            :aria-pressed="selected('categories', category.id) ? true : false"
          >
            {{ category.name }}
            <span v-if="selected('categories', category.id)" class="group-hover:opacity-75 flex items-center">
              <Icon name="ri:close-circle-fill" />
            </span>
          </NuxtLink>
        </li>
      </ul>
      </NewsFilter>
      <NewsFilter
        label="Topics"
        icon="ri:price-tag-3-line"
      >
        <ul class="text-base flex flex-wrap gap-3 max-h-100 md:scrollbar-gutter-stable md:scrollbar-thin md:scrollbar-thumb-green md:scrollbar-track-green-soft">
          <li v-for="tag in all.tags" :key="tag.id">
            <NuxtLink
              :to="toggleFilter('tags', tag.id)"
              class="flex items-center gap-2 font-bold rounded-md px-3 py-0.5 transition-colors duration-200"
              :class="{
                'group bg-primary text-white': selected('tags', tag.id),
                'bg-primary/25 hover:bg-primary/35': !selected('tags', tag.id)
              }"
              :aria-pressed="selected('tags', tag.id) ? true : false"
            >
              {{ tag.name }}
              <span v-if="selected('tags', tag.id)" class="group-hover:opacity-75 flex items-center">
                <Icon name="ri:close-circle-fill" />
              </span>
            </NuxtLink>
          </li>
        </ul>
      </NewsFilter>
      <NewsFilter
        label="Commissions"
        icon="ri:price-tag-3-line"
      >
        <ul class="flex flex-col gap-2">
          <li v-for="commission in commissions" :key="commission.id">
            <NuxtLink
              :to="toggleFilter('commissions', commission.id)"
              class="group flex items-baseline gap-3 transition-colors duration-200"
              :class="{
                'font-bold': selected('commissions', commission.id)
              }"
              :aria-pressed="selected('commissions', commission.id) ? true : false"
            >
              <span
                class="font-bold text-xs rounded-md px-2 py-1 no-underline! w-17 text-center shrink-0 transition-colors duration-200"
                :class="{
                  'bg-primary text-white': selected('commissions', commission.id),
                  'bg-primary/25 group-hover:bg-primary/35': !selected('commissions', commission.id)
                }"
              >
                {{ commission.acronym }}
              </span>
              <span class="group-hover:underline decoration-2 underline-offset-2">{{ commission.name }}</span>
              <span v-if="selected('commissions', commission.id)" class="group-hover:opacity-75 translate-y-0.5 ms-auto">
                <Icon name="ri:close-circle-fill" />
              </span>
            </NuxtLink>
          </li>
        </ul>
      </NewsFilter>
    </div>
  </aside>
</template>