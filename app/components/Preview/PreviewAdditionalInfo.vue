<script setup lang="ts">
const props = defineProps<{
  doctor?: string
  insurance?: string
  instructions?: string
}>()

const { t } = useI18n()

const items = computed(() => [
  { value: props.doctor, icon: 'i-lucide-stethoscope', bg: 'bg-cyan-500/10', color: 'text-cyan-500 dark:text-cyan-400', label: t('preview.doctor') },
  { value: props.insurance, icon: 'i-lucide-shield-check', bg: 'bg-emerald-500/10', color: 'text-emerald-500 dark:text-emerald-400', label: t('preview.insurance') },
  { value: props.instructions, icon: 'i-lucide-file-warning', bg: 'bg-amber-500/10', color: 'text-amber-500 dark:text-amber-400', label: t('preview.instructions') }
].filter(item => item.value))
</script>

<template>
  <div class="preview-panel rounded-2xl overflow-hidden">
    <div class="px-5 py-4">
      <div class="flex items-center gap-2 mb-3">
        <UIcon name="i-lucide-info" class="w-4 h-4 text-primary"></UIcon>
        <p class="text-xs font-bold tracking-[0.15em] uppercase text-[var(--ui-text-muted)]">{{ $t('preview.additionalInfo') }}</p>
      </div>

      <div class="space-y-3">
        <div v-for="item in items" :key="item.label" class="flex items-center gap-3">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" :class="item.bg">
            <UIcon :name="item.icon" class="w-3.5 h-3.5" :class="item.color"></UIcon>
          </div>
          <div>
            <p class="text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-dimmed)]">{{ item.label }}</p>
            <p class="text-sm font-semibold text-[var(--ui-text-highlighted)] float-left truncate">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preview-panel {
  position: relative;
  background: var(--ui-bg-elevated);
  border: 1px solid var(--ui-border);
  box-shadow:
    0 8px 32px -8px rgba(0, 0, 0, 0.08),
    0 4px 16px -4px rgba(0, 0, 0, 0.04);
}

.dark .preview-panel {
  background: linear-gradient(165deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 50%,
    rgba(0, 0, 0, 0.08) 100%
  );
  border-color: rgba(255, 255, 255, 0.07);
  box-shadow:
    0 16px 48px -12px rgba(0, 0, 0, 0.4),
    0 8px 24px -8px rgba(0, 30, 80, 0.15);
}
</style>
