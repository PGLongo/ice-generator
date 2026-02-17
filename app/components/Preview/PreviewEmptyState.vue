<script setup lang="ts">
</script>

<template>
  <div class="text-center py-20">
    <div class="w-16 h-16 rounded-2xl bg-[var(--ui-bg-elevated)] border border-[var(--ui-border)] flex items-center justify-center mx-auto mb-5">
      <UIcon name="i-lucide-file-question" class="w-8 h-8 text-[var(--ui-text-dimmed)]"></UIcon>
    </div>
    <h1 class="text-xl font-bold text-[var(--ui-text-highlighted)] mb-2">{{ $t('preview.noData') }}</h1>
    <p class="text-sm text-[var(--ui-text-muted)] mb-8 max-w-xs mx-auto">{{ $t('preview.noDataDescription') }}</p>
    <UButton
      icon="i-lucide-plus-circle"
      size="lg"
      to="/form"
    >
      {{ $t('preview.createCard') }}
    </UButton>
  </div>
</template>
