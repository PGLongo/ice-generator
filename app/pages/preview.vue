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

const bloodTypeDisplay = computed((): string => {
  if (!iceData.value?.bloodType) return ''
  const bt = iceData.value.bloodType as string | { label?: string, value?: string }
  if (typeof bt === 'object' && bt.label) return bt.label
  return String(bt)
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
</script>

<template>
  <div class="preview-page min-h-screen py-8 md:py-12">
    <UContainer>
      <div class="max-w-lg mx-auto">
        <PreviewEmptyState v-if="!hasData"></PreviewEmptyState>

        <div v-else class="space-y-3">
          <!-- Main panel -->
          <div class="preview-panel rounded-2xl overflow-hidden">
            <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-20"></div>

            <PreviewHeader></PreviewHeader>

            <PreviewIdentity
              :name="iceData.name"
              :initials="initials"
              :blood-type="bloodTypeDisplay"
              :age="iceData.age"
              :city="iceData.city"
              :address="iceData.address"
            ></PreviewIdentity>

            <PreviewContacts :contacts="iceData.emergencyContacts"></PreviewContacts>

            <PreviewAllergies :allergies="iceData.allergies ?? []"></PreviewAllergies>
          </div>

          <PreviewMedicalInfo
            v-if="hasMedicalInfo"
            :conditions="iceData.medicalConditions"
            :medications="iceData.currentMedications"
            :notes="iceData.medicalNotes"
          ></PreviewMedicalInfo>

          <PreviewAdditionalInfo
            v-if="hasAdditionalInfo"
            :doctor="iceData.primaryDoctor"
            :insurance="iceData.insuranceInfo"
            :instructions="iceData.specialInstructions"
          ></PreviewAdditionalInfo>

          <PreviewFooter :last-updated="iceData.lastUpdated"></PreviewFooter>
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
</style>
