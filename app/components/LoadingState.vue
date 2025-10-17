<script setup lang="ts">
interface Props {
  message?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  message: 'Loading data...',
  description: 'Decoding data from link'
})
</script>

<template>
  <UCard>
    <div class="text-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="text-6xl text-primary mb-4 mx-auto animate-spin" />
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {{ message }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        {{ description }}
      </p>
    </div>
  </UCard>
</template>
