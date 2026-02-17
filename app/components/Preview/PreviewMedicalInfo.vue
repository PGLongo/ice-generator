<script setup lang="ts">
interface Props {
  conditions?: string[]
  medications?: string[]
  notes?: string
}

defineProps<Props>()
</script>

<template>
  <div class="preview-panel rounded-2xl overflow-hidden">
    <div class="px-5 py-4">
      <div class="flex items-center gap-2 mb-3">
        <UIcon name="i-lucide-heart-pulse" class="w-4 h-4 text-red-500 dark:text-red-400"></UIcon>
        <p class="text-xs font-bold tracking-[0.15em] uppercase text-[var(--ui-text-muted)]">{{ $t('preview.medicalInfo') }}</p>
      </div>

      <div class="space-y-3">
        <div v-if="conditions && conditions.length > 0">
          <p class="text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-dimmed)] mb-1.5">{{ $t('preview.conditions') }}</p>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="condition in conditions"
              :key="condition"
              class="px-2.5 py-1 rounded-lg bg-[var(--ui-bg-elevated)] border border-[var(--ui-border)] text-xs font-medium text-[var(--ui-text)]"
            >{{ condition }}</span>
          </div>
        </div>

        <div v-if="medications && medications.length > 0">
          <p class="text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-dimmed)] mb-1.5">{{ $t('preview.medications') }}</p>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="medication in medications"
              :key="medication"
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-500/8 border border-violet-500/12 text-xs font-medium text-violet-600 dark:text-violet-400"
            >
              <UIcon name="i-lucide-pill" class="w-3 h-3"></UIcon>
              {{ medication }}
            </span>
          </div>
        </div>

        <div v-if="notes">
          <p class="text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-dimmed)] mb-1.5">{{ $t('preview.notes') }}</p>
          <p class="text-sm text-[var(--ui-text-muted)] leading-relaxed whitespace-pre-wrap">{{ notes }}</p>
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
