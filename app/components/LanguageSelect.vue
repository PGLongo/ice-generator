<script setup lang="ts">
const { locale, setLocale } = useI18n()

const languages = ref([
  { label: 'English', value: 'en', icon: 'i-circle-flags-us' },
  { label: 'Italiano', value: 'it', icon: 'i-circle-flags-it' }
  // Facile aggiungere: { label: 'Español', value: 'es', icon: 'i-circle-flags-es' },
  // { label: 'Français', value: 'fr', icon: 'i-circle-flags-fr' },
  // { label: 'Deutsch', value: 'de', icon: 'i-circle-flags-de' }
])

const selectedLanguage = ref([])

const currentLanguageIcon = computed(() =>
  languages.value.find(lang => lang.value === locale.value)?.icon ?? 'i-circle-flags-us'
)

const handleLanguageSelect = (items: unknown) => {
  // Cast the item to our expected type since UCommandPalette has different typing
  const item = items as { value?: string }
  if (item?.value && (item.value === 'en' || item.value === 'it')) {
    setLocale(item.value)
  }
}
</script>

<template>
  <UPopover>
    <UButton variant="ghost" color="neutral" :icon="currentLanguageIcon">
    </UButton>

    <template #content>
      <UCommandPalette
        v-model="selectedLanguage"
        placeholder="Select language..."
        :groups="[{ id: 'languages', items: languages }]"
        :ui="{ input: '[&>input]:h-8 [&>input]:text-sm' }"
        @update:model-value="handleLanguageSelect"
      ></UCommandPalette>
    </template>
  </UPopover>
</template>
