<script setup lang="ts">
interface Props {
  doctor?: string
  insurance?: string
  instructions?: string
}

defineProps<Props>()
</script>

<template>
  <div class="preview-panel rounded-2xl overflow-hidden">
    <div class="px-5 py-4">
      <div class="flex items-center gap-2 mb-3">
        <UIcon name="i-lucide-info" class="w-4 h-4 text-primary"></UIcon>
        <p class="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-muted)]">{{ $t('preview.additionalInfo') }}</p>
      </div>

      <div class="space-y-3">
        <div v-if="doctor" class="flex items-start gap-3">
          <div class="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <UIcon name="i-lucide-stethoscope" class="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400"></UIcon>
          </div>
          <div>
            <p class="text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-dimmed)]">{{ $t('preview.doctor') }}</p>
            <p class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ doctor }}</p>
          </div>
        </div>

        <div v-if="insurance" class="flex items-start gap-3">
          <div class="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <UIcon name="i-lucide-shield-check" class="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400"></UIcon>
          </div>
          <div>
            <p class="text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-dimmed)]">{{ $t('preview.insurance') }}</p>
            <p class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ insurance }}</p>
          </div>
        </div>

        <div v-if="instructions" class="flex items-start gap-3">
          <div class="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <UIcon name="i-lucide-file-warning" class="w-3.5 h-3.5 text-amber-500 dark:text-amber-400"></UIcon>
          </div>
          <div>
            <p class="text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-dimmed)]">{{ $t('preview.instructions') }}</p>
            <p class="text-sm text-[var(--ui-text-muted)] leading-relaxed whitespace-pre-wrap">{{ instructions }}</p>
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
