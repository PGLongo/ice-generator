<script setup lang="ts">
import { useIceStore } from '@/stores/ice'

definePageMeta({
  layout: 'fullscreen'
})

const iceStore = useIceStore()

const iceData = computed(() => iceStore.data)
const hasData = computed(() => !!iceData.value?.name)

const initials = computed(() => {
  if (!iceData.value?.name) return '?'
  return iceData.value.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const bloodTypeDisplay = computed(() => {
  if (!iceData.value?.bloodType) return ''
  const bt = iceData.value.bloodType as string | { label?: string, value?: string }
  return typeof bt === 'object' && bt.label ? bt.label : bt
})

const hasMedicalInfo = computed(() => {
  if (!iceData.value) return false
  return !!(
    (iceData.value.allergies && iceData.value.allergies.length > 0)
    || (iceData.value.medicalConditions && iceData.value.medicalConditions.length > 0)
    || (iceData.value.currentMedications && iceData.value.currentMedications.length > 0)
    || iceData.value.medicalNotes
  )
})

const hasAdditionalInfo = computed(() => {
  if (!iceData.value) return false
  return !!(
    iceData.value.primaryDoctor
    || iceData.value.insuranceInfo
    || iceData.value.specialInstructions
  )
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const contactInitial = (name: string) => {
  return name.length > 0 ? name.charAt(0).toUpperCase() : '?'
}

const contactColors = ['blue', 'rose', 'violet', 'amber', 'cyan', 'emerald'] as const
const getContactColor = (index: number) => contactColors[index % contactColors.length]
</script>

<template>
  <div class="preview-page min-h-screen py-8 md:py-12">
    <UContainer>
      <div class="max-w-lg mx-auto">
        <!-- No Data State -->
        <div v-if="!hasData" class="text-center py-20">
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

        <!-- Emergency Card Display -->
        <div v-else class="space-y-3">
          <!-- Main panel -->
          <div class="preview-panel rounded-2xl overflow-hidden">
            <!-- Top edge shine -->
            <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-20"></div>

            <!-- Header bar -->
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

            <!-- Divider -->
            <div class="h-px bg-[var(--ui-border)] mx-4"></div>

            <!-- Person identity -->
            <div class="px-5 pt-4 pb-3">
              <div class="flex items-center gap-4">
                <div class="preview-avatar w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span class="text-xl font-extrabold text-white/90 tracking-tight">{{ initials }}</span>
                </div>
                <div class="min-w-0">
                  <h1 class="text-xl font-extrabold text-[var(--ui-text-highlighted)] tracking-tight leading-tight">{{ iceData.name }}</h1>
                  <div class="flex flex-wrap items-center gap-1.5 mt-1.5">
                    <span v-if="bloodTypeDisplay" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-500/10 border border-red-500/15 text-[10px] font-bold text-red-500 dark:text-red-400">
                      <UIcon name="i-lucide-droplets" class="w-2.5 h-2.5"></UIcon>
                      {{ bloodTypeDisplay }}
                    </span>
                    <span v-if="iceData.age" class="inline-flex items-center px-2 py-0.5 rounded-md bg-[var(--ui-bg-elevated)] border border-[var(--ui-border)] text-[10px] font-bold text-[var(--ui-text-muted)]">
                      {{ iceData.age }} {{ $t('preview.years') }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Location -->
              <div v-if="iceData.city || iceData.address" class="flex items-center gap-1.5 mt-3 text-[var(--ui-text-dimmed)]">
                <UIcon name="i-lucide-map-pin" class="w-3 h-3 flex-shrink-0"></UIcon>
                <span class="text-xs">{{ [iceData.address, iceData.city].filter(Boolean).join(', ') }}</span>
              </div>
            </div>

            <!-- Emergency contacts -->
            <div v-if="iceData.emergencyContacts.length > 0" class="px-5 pb-3">
              <div class="h-px bg-[var(--ui-border)] mb-3"></div>
              <p class="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--ui-text-dimmed)] mb-2">{{ $t('preview.emergencyContacts') }}</p>
              <div class="space-y-1.5">
                <div
                  v-for="(contact, index) in iceData.emergencyContacts"
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
                      <p class="text-[11px] text-[var(--ui-text-dimmed)] font-medium">{{ contact.relationship }}</p>
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

            <!-- Medical alerts (allergies shown prominently) -->
            <div v-if="iceData.allergies && iceData.allergies.length > 0" class="px-5 pb-3">
              <div class="flex flex-wrap gap-1.5">
                <div
                  v-for="allergy in iceData.allergies"
                  :key="allergy"
                  class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/8 border border-amber-500/15"
                >
                  <UIcon name="i-lucide-triangle-alert" class="w-3 h-3 text-amber-500 dark:text-amber-400 flex-shrink-0"></UIcon>
                  <span class="text-[11px] font-bold text-amber-600 dark:text-amber-400/80">{{ allergy }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Medical Information panel -->
          <div v-if="hasMedicalInfo" class="preview-panel rounded-2xl overflow-hidden">
            <div class="px-5 py-4">
              <div class="flex items-center gap-2 mb-3">
                <UIcon name="i-lucide-heart-pulse" class="w-4 h-4 text-red-500 dark:text-red-400"></UIcon>
                <p class="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-muted)]">{{ $t('preview.medicalInfo') }}</p>
              </div>

              <div class="space-y-3">
                <!-- Conditions -->
                <div v-if="iceData.medicalConditions && iceData.medicalConditions.length > 0">
                  <p class="text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-dimmed)] mb-1.5">{{ $t('preview.conditions') }}</p>
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="condition in iceData.medicalConditions"
                      :key="condition"
                      class="px-2.5 py-1 rounded-lg bg-[var(--ui-bg-elevated)] border border-[var(--ui-border)] text-xs font-medium text-[var(--ui-text)]"
                    >{{ condition }}</span>
                  </div>
                </div>

                <!-- Medications -->
                <div v-if="iceData.currentMedications && iceData.currentMedications.length > 0">
                  <p class="text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-dimmed)] mb-1.5">{{ $t('preview.medications') }}</p>
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="medication in iceData.currentMedications"
                      :key="medication"
                      class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-500/8 border border-violet-500/12 text-xs font-medium text-violet-600 dark:text-violet-400"
                    >
                      <UIcon name="i-lucide-pill" class="w-3 h-3"></UIcon>
                      {{ medication }}
                    </span>
                  </div>
                </div>

                <!-- Notes -->
                <div v-if="iceData.medicalNotes">
                  <p class="text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-dimmed)] mb-1.5">{{ $t('preview.notes') }}</p>
                  <p class="text-sm text-[var(--ui-text-muted)] leading-relaxed whitespace-pre-wrap">{{ iceData.medicalNotes }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Information panel -->
          <div v-if="hasAdditionalInfo" class="preview-panel rounded-2xl overflow-hidden">
            <div class="px-5 py-4">
              <div class="flex items-center gap-2 mb-3">
                <UIcon name="i-lucide-info" class="w-4 h-4 text-primary"></UIcon>
                <p class="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-muted)]">{{ $t('preview.additionalInfo') }}</p>
              </div>

              <div class="space-y-3">
                <div v-if="iceData.primaryDoctor" class="flex items-start gap-3">
                  <div class="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <UIcon name="i-lucide-stethoscope" class="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400"></UIcon>
                  </div>
                  <div>
                    <p class="text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-dimmed)]">{{ $t('preview.doctor') }}</p>
                    <p class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ iceData.primaryDoctor }}</p>
                  </div>
                </div>

                <div v-if="iceData.insuranceInfo" class="flex items-start gap-3">
                  <div class="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <UIcon name="i-lucide-shield-check" class="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400"></UIcon>
                  </div>
                  <div>
                    <p class="text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-dimmed)]">{{ $t('preview.insurance') }}</p>
                    <p class="text-sm font-semibold text-[var(--ui-text-highlighted)]">{{ iceData.insuranceInfo }}</p>
                  </div>
                </div>

                <div v-if="iceData.specialInstructions" class="flex items-start gap-3">
                  <div class="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <UIcon name="i-lucide-file-warning" class="w-3.5 h-3.5 text-amber-500 dark:text-amber-400"></UIcon>
                  </div>
                  <div>
                    <p class="text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-dimmed)]">{{ $t('preview.instructions') }}</p>
                    <p class="text-sm text-[var(--ui-text-muted)] leading-relaxed whitespace-pre-wrap">{{ iceData.specialInstructions }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="text-center pt-2 pb-4">
            <p class="text-[10px] text-[var(--ui-text-dimmed)]">{{ $t('preview.footer') }}</p>
            <p v-if="iceData.lastUpdated" class="text-[10px] text-[var(--ui-text-dimmed)] mt-0.5">
              {{ $t('preview.lastUpdated') }}: {{ formatDate(iceData.lastUpdated) }}
            </p>
          </div>
        </div>
      </div>
    </UContainer>
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

.preview-panel-header {
  background: rgba(0, 0, 0, 0.02);
}

.dark .preview-panel-header {
  background: rgba(255, 255, 255, 0.02);
}

.preview-avatar {
  background: linear-gradient(135deg, #0066ff 0%, #00bbff 100%);
  box-shadow: 0 4px 16px -4px rgba(0, 102, 255, 0.4);
}

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
