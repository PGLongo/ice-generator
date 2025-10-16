<script setup lang="ts">
const { locale, setLocale } = useI18n()

// Define locales in the format expected by ULocaleSelect
const availableLocales = [
  { code: 'en', name: 'English' },
  { code: 'it', name: 'Italiano' }
]
</script>

<template>
  <USelectMenu
    v-model="locale"
    :items="availableLocales"
    value-attribute="code"
    option-attribute="name"
    @update:model-value="setLocale($event)"
  >
    <UButton
      color="gray"
      variant="ghost"
      :label="availableLocales.find(l => l.code === locale)?.name"
      trailing-icon="i-heroicons-chevron-down-20-solid"
    />
  </USelectMenu>
</template>
