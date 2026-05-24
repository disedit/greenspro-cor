<script setup>
const props = defineProps({
  country: {
    type: String,
    default: null
  },
  commission: {
    type: String,
    default: null
  },
  memberType: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  countryOptions: {
    type: Array,
    default: () => []
  },
  commissionOptions: {
    type: Array,
    default: () => []
  },
  memberTypeOptions: {
    type: Array,
    default: () => []
  },
  show: {
    type: Array,
    default: () => ['country', 'commission', 'memberType', 'name']
  }
})

const emit = defineEmits([
  'update:country',
  'update:commission',
  'update:memberType',
  'update:name'
])

const normalizeInput = (value) => {
  if (!value) {
    return null
  }

  const normalized = String(value).trim()
  return normalized ? normalized : null
}

const countryModel = computed({
  get: () => props.country || '',
  set: (value) => emit('update:country', normalizeInput(value))
})

const commissionModel = computed({
  get: () => props.commission || '',
  set: (value) => emit('update:commission', normalizeInput(value))
})

const memberTypeModel = computed({
  get: () => props.memberType || '',
  set: (value) => emit('update:memberType', normalizeInput(value))
})

const nameModel = computed({
  get: () => props.name || '',
  set: (value) => emit('update:name', normalizeInput(value))
})

// Check if nav is present
const { navbarHidden } = useNav()
</script>

<template>
  <div
    class="grid gap-2 md:gap-4 grid-cols-2 xl:grid-cols-4 sticky top-17 pt-6 pb-15 -mb-5 filter-gradient z-10 transition-all duration-300 focus-primary-transparent"
    :class="{
      'md:top-21 filter-filler': !navbarHidden,
      'md:top-0': navbarHidden
    }"
  >
    <UtilsSelect
      v-if="show.includes('country')"
      name="country"
      label="Country"
      icon="ri:global-line"
      v-model="countryModel"
    >
      <option value="">All countries</option>
      <option v-for="option in countryOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </UtilsSelect>
    <UtilsSelect
      v-if="show.includes('commission')"
      name="commission"
      label="Commission"
      icon="ri:chat-1-line"
      v-model="commissionModel"
    >
      <option value="">All commissions</option>
      <option v-for="option in commissionOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </UtilsSelect>
    <UtilsSelect
      v-if="show.includes('memberType')"
      name="memberType"
      label="Function"
      icon="ri:user-line"
      v-model="memberTypeModel"
    >
      <option value="">All functions</option>
      <option v-for="option in memberTypeOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </UtilsSelect>
    <UtilsInput
      v-if="show.includes('name')"
      v-model="nameModel"
      name="name"
      label="Search by name"
      type="text"
      placeholder="Filter by name"
      icon="ri:search-2-line"
    />
  </div>
</template>