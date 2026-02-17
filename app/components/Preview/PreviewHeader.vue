<script setup lang="ts">
</script>

<template>
  <div>
    <div class="preview-panel-header flex items-center justify-between px-5 py-3">
      <div class="flex items-center gap-2">
        <app-icon></app-icon>
        <app-title :text="$t('app.title')"></app-title>
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
