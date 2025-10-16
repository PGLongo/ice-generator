<script setup lang="ts">
const { locale, setLocale } = useI18n()

const availableLocales = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' }
]

const currentLocale = computed(() => {
  return availableLocales.find(l => l.code === locale.value)
})

const switchLocale = (code: string) => {
  setLocale(code)
}
</script>

<template>
  <UPopover>
    <UButton
      color="gray"
      variant="ghost"
      trailing-icon="i-heroicons-chevron-down-20-solid"
    >
      <span class="flex items-center gap-2">
        <span>{{ currentLocale?.flag }}</span>
        <span>{{ currentLocale?.name }}</span>
      </span>
    </UButton>

    <template #panel>
      <div class="p-2 min-w-[150px]">
        <UButton
          v-for="loc in availableLocales"
          :key="loc.code"
          color="gray"
          :variant="locale === loc.code ? 'soft' : 'ghost'"
          block
          class="justify-start"
          @click="switchLocale(loc.code)"
        >
          <span class="flex items-center gap-2">
            <span>{{ loc.flag }}</span>
            <span>{{ loc.name }}</span>
          </span>
        </UButton>
      </div>
    </template>
  </UPopover>
</template>
