<script setup lang="ts">
</script>

<template>
  <div>
    <div class="preview-panel-header flex items-center justify-between px-5 py-3">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-heart-pulse" class="w-4 h-4 text-primary"></UIcon>
        <span class="text-[11px] font-extrabold tracking-[0.12em] uppercase text-[var(--ui-text-muted)]">CareCard</span>
      </div>
      <UButton
        to="/form"
        variant="ghost"
        size="xs"
        icon="i-lucide-pencil"
        class="text-[var(--ui-text-dimmed)]"
      >
        {{ $t('preview.back') }}
      </UButton>
    </div>
    <div class="h-px bg-[var(--ui-border)] mx-4"></div>
  </div>
</template>

<style scoped>
.preview-panel-header {
  background: rgba(0, 0, 0, 0.02);
}

.dark .preview-panel-header {
  background: rgba(255, 255, 255, 0.02);
}
</style>
