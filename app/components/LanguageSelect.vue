<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

// Map our locales to the format expected by ULocaleSelect
const mappedLocales = computed(() =>
  locales.value.map((loc) => ({
    code: loc.code,
    name: loc.name || (loc.code === 'en' ? 'English' : 'Italiano')
  }))
)
</script>

<template>
  <ULocaleSelect
    v-model="locale"
    :locales="mappedLocales"
    @update:model-value="setLocale($event)"
  />
</template>
