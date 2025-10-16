<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const currentLocale = computed(() => {
  return locales.value.find(l => l.code === locale.value)
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
      :label="currentLocale?.code.toUpperCase()"
      trailing-icon="i-heroicons-chevron-down-20-solid"
    />

    <template #panel>
      <div class="p-2 space-y-1">
        <UButton
          v-for="loc in locales"
          :key="loc.code"
          color="gray"
          variant="ghost"
          :label="loc.name"
          block
          :class="{ 'bg-gray-100 dark:bg-gray-800': locale === loc.code }"
          @click="switchLocale(loc.code)"
        />
      </div>
    </template>
  </UPopover>
</template>
