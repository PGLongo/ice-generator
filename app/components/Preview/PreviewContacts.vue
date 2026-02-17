<script setup lang="ts">
import type { EmergencyContact } from '@/types/ice'

interface Props {
  contacts: EmergencyContact[]
}

defineProps<Props>()

const contactColors = ['blue', 'rose', 'violet', 'amber', 'cyan', 'emerald'] as const

function getContactColor(index: number): string {
  return contactColors[index % contactColors.length] ?? 'blue'
}

function contactInitial(name: string): string {
  return name.length > 0 ? name.charAt(0).toUpperCase() : '?'
}
</script>

<template>
  <div v-if="contacts.length > 0" class="px-5 pb-3">
    <div class="h-px bg-[var(--ui-border)] mb-3"></div>
    <p class="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--ui-text-dimmed)] mb-2">{{ $t('preview.emergencyContacts') }}</p>
    <div class="space-y-1.5">
      <div
        v-for="(contact, index) in contacts"
        :key="contact.id"
        class="preview-contact flex items-center justify-between px-3 py-2.5 rounded-xl"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            :class="{
              'bg-blue-500/15': getContactColor(index) === 'blue',
              'bg-rose-500/15': getContactColor(index) === 'rose',
              'bg-violet-500/15': getContactColor(index) === 'violet',
              'bg-amber-500/15': getContactColor(index) === 'amber',
              'bg-cyan-500/15': getContactColor(index) === 'cyan',
              'bg-emerald-500/15': getContactColor(index) === 'emerald'
            }"
          >
            <span
              class="text-xs font-bold"
              :class="{
                'text-blue-500 dark:text-blue-400': getContactColor(index) === 'blue',
                'text-rose-500 dark:text-rose-400': getContactColor(index) === 'rose',
                'text-violet-500 dark:text-violet-400': getContactColor(index) === 'violet',
                'text-amber-500 dark:text-amber-400': getContactColor(index) === 'amber',
                'text-cyan-500 dark:text-cyan-400': getContactColor(index) === 'cyan',
                'text-emerald-500 dark:text-emerald-400': getContactColor(index) === 'emerald'
              }"
            >{{ contactInitial(contact.name) }}</span>
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <p class="text-sm font-bold text-[var(--ui-text-highlighted)] leading-tight truncate">{{ contact.name }}</p>
              <span v-if="index === 0" class="text-[8px] font-bold tracking-wider uppercase px-1.5 py-px rounded bg-primary/10 text-primary flex-shrink-0">{{ $t('preview.primary') }}</span>
            </div>
            <p class="text-[11px] text-[var(--ui-text-dimmed)] font-medium">
              {{ contact.relationship }}<span v-if="contact.phone" class="text-[var(--ui-text)] font-bold font-mono"> · {{ contact.phone }}</span>
            </p>
          </div>
        </div>
        <div class="flex gap-1.5 flex-shrink-0">
          <a
            v-if="contact.email"
            :href="`mailto:${contact.email}`"
            class="preview-action-btn w-8 h-8 rounded-lg flex items-center justify-center bg-blue-500/15 border border-blue-500/20 hover:bg-blue-500/25 transition-colors"
          >
            <UIcon name="i-lucide-mail" class="w-3.5 h-3.5 text-blue-500 dark:text-blue-400"></UIcon>
          </a>
          <a
            v-if="contact.phone"
            :href="`tel:${contact.phone}`"
            class="preview-action-btn w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-500/15 border border-emerald-500/20 hover:bg-emerald-500/25 transition-colors"
          >
            <UIcon name="i-lucide-phone" class="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400"></UIcon>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preview-contact {
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: background 0.2s, border-color 0.2s;
}

.dark .preview-contact {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.05);
}

.preview-contact:hover {
  background: rgba(0, 0, 0, 0.04);
  border-color: rgba(0, 0, 0, 0.08);
}

.dark .preview-contact:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.08);
}

.preview-action-btn {
  transition: transform 0.15s, background 0.15s;
}

.preview-action-btn:hover {
  transform: scale(1.08);
}
</style>
