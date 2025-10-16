<script setup lang="ts">
import { en, it } from '@nuxt/ui/locale'

const { locale, setLocale } = useI18n()

const handleLocaleChange = (newLocale: string | undefined) => {
  if (newLocale && (newLocale === 'en' || newLocale === 'it')) {
    setLocale(newLocale as 'en' | 'it')
  }
}
</script>

<template>
  <ULocaleSelect
    v-model="locale"
    :locales="[en, it]"
    @update:model-value="handleLocaleChange"
  ></ULocaleSelect>
</template>
