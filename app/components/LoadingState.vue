<script setup lang="ts">
const { t } = useI18n()

interface Props {
  message?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  message: undefined,
  description: undefined
})

// Use props if provided, otherwise use common i18n translations
const displayMessage = computed(() => props.message ?? t('common.loading'))
const displayDescription = computed(() => props.description ?? t('common.loadingDescription'))
</script>

<template>
  <UCard>
    <div class="text-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="text-6xl text-primary mb-4 mx-auto animate-spin" ></UIcon>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {{ displayMessage }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        {{ displayDescription }}
      </p>
    </div>
  </UCard>
</template>
