<script setup lang="ts">
interface Props {
  lastUpdated?: string
}

defineProps<Props>()

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="text-center pt-2 pb-4">
    <p class="text-[10px] text-[var(--ui-text-dimmed)]">{{ $t('preview.footer') }}</p>
    <p v-if="lastUpdated" class="text-[10px] text-[var(--ui-text-dimmed)] mt-0.5">
      {{ $t('preview.lastUpdated') }}: {{ formatDate(lastUpdated) }}
    </p>
  </div>
</template>
