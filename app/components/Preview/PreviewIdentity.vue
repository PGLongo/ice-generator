<script setup lang="ts">
interface Props {
  name: string
  initials: string
  bloodType: string
  age: number | null
  city?: string
  address?: string
}

defineProps<Props>()
</script>

<template>
  <div class="px-5 pt-4 pb-3">
    <div class="flex items-center gap-4">
      <div class="preview-avatar w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
        <span class="text-xl font-extrabold text-white/90 tracking-tight">{{ initials }}</span>
      </div>
      <div class="min-w-0">
        <h1 class="text-2xl font-extrabold text-[var(--ui-text-highlighted)] tracking-tight leading-tight">{{ name }}</h1>
        <div class="flex flex-wrap items-center gap-1.5 mt-1.5">
          <span v-if="bloodType" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-500/10 border border-red-500/15 text-xs font-bold text-red-500 dark:text-red-400">
            <UIcon name="i-lucide-droplets" class="w-3 h-3"></UIcon>
            {{ bloodType }}
          </span>
          <span v-if="age" class="inline-flex items-center px-2 py-0.5 rounded-md bg-[var(--ui-bg-elevated)] border border-[var(--ui-border)] text-xs font-bold text-[var(--ui-text-muted)]">
            {{ age }} {{ $t('preview.years') }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="city || address" class="flex items-center gap-1.5 mt-3 text-[var(--ui-text-dimmed)]">
      <UIcon name="i-lucide-map-pin" class="w-3 h-3 flex-shrink-0"></UIcon>
      <span class="text-sm">{{ [address, city].filter(Boolean).join(', ') }}</span>
    </div>
  </div>
</template>

<style scoped>
.preview-avatar {
  background: linear-gradient(135deg, #0066ff 0%, #00bbff 100%);
  box-shadow: 0 4px 16px -4px rgba(0, 102, 255, 0.4);
}
</style>
