<script setup lang="ts">
import type { IceData } from '@/types/ice'

const route = useRoute()
const { decodeData } = useIceUrlShare()

const iceData = ref<IceData | null>(null)

onMounted(() => {
  // Try to get data from URL query params
  const dataParam = route.query.data as string
  if (dataParam) {
    try {
      // Use the compressed decoding from useIceUrlShare
      const decodedIceData = decodeData(dataParam)
      if (decodedIceData) {
        iceData.value = decodedIceData
      }
    } catch (error) {
      console.error('Failed to parse ICE data from URL:', error)
    }
  }
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
</script>

<template>
  <UContainer class="py-12">
    <div class="max-w-4xl mx-auto">
      <!-- No Data State -->
      <div v-if="!iceData" class="text-center py-12">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-16 h-16 mx-auto text-gray-400 mb-4"></UIcon>
        <h1 class="text-2xl font-bold mb-2">{{ $t('preview.noData') }}</h1>
        <p class="text-gray-500 mb-6">{{ $t('preview.noDataDescription') }}</p>
        <UButton
          icon="i-heroicons-plus"
          size="lg"
          @click="navigateTo('/')"
        >
          {{ $t('preview.createCard') }}
        </UButton>
      </div>

      <!-- ICE Card Display -->
      <div v-else class="space-y-6">
        <!-- Header Card with Name -->
        <UCard>
          <div class="text-center py-6">
            <div class="flex items-center justify-center gap-3 mb-4">
              <UIcon name="i-heroicons-identification" class="w-8 h-8 text-primary"></UIcon>
              <h1 class="text-4xl font-bold">{{ iceData.name }}</h1>
            </div>

            <div class="flex items-center justify-center gap-8 text-gray-900 dark:text-gray-100 mt-6">
              <div v-if="iceData.age" class="flex items-center gap-2">
                <UIcon name="i-heroicons-cake" class="w-5 h-5 text-primary"></UIcon>
                <div class="flex flex-col items-start">
                  <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{{ $t('preview.age') }}</span>
                  <span class="font-bold text-lg">{{ iceData.age }} {{ $t('preview.years') }}</span>
                </div>
              </div>

              <div v-if="bloodTypeDisplay" class="flex items-center gap-2">
                <UIcon name="i-heroicons-heart" class="w-5 h-5 text-error"></UIcon>
                <div class="flex flex-col items-start">
                  <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{{ $t('preview.bloodType') }}</span>
                  <span class="font-bold text-lg">{{ bloodTypeDisplay }}</span>
                </div>
              </div>
            </div>

            <div v-if="iceData.city || iceData.address" class="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mt-4">
              <UIcon name="i-heroicons-map-pin" class="w-4 h-4"></UIcon>
              <span class="text-sm">{{ [iceData.address, iceData.city].filter(Boolean).join(', ') }}</span>
            </div>
          </div>
        </UCard>

        <!-- Emergency Contacts -->
        <UCard v-if="iceData.emergencyContacts.length > 0">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-phone" class="w-6 h-6 text-error"></UIcon>
              <h2 class="text-xl font-semibold">{{ $t('preview.emergencyContacts') }}</h2>
            </div>
          </template>

          <div class="space-y-4">
            <div
              v-for="(contact, index) in iceData.emergencyContacts"
              :key="contact.id"
              class="p-6 border-2 rounded-lg"
              :class="index === 0 ? 'border-error bg-error/5' : 'border-gray-200'"
            >
              <div class="mb-4">
                <div class="flex items-center gap-2 mb-2">
                  <UBadge v-if="index === 0" color="error" size="lg">
                    {{ $t('preview.primary') }}
                  </UBadge>
                  <UBadge v-else color="neutral" size="lg">
                    {{ $t('preview.secondary') }}
                  </UBadge>
                </div>
                <h3 class="text-2xl font-bold mb-1">{{ contact.name }}</h3>
                <p class="text-lg text-gray-800 dark:text-gray-200 font-medium">{{ contact.relationship }}</p>
              </div>
              <div class="space-y-3">
                <UButton
                  v-if="contact.phone"
                  :to="`tel:${contact.phone}`"
                  color="success"
                  size="xl"
                  block
                  icon="i-heroicons-phone"
                  external
                  class="text-lg font-semibold"
                >
                  {{ contact.phone }}
                </UButton>
                <UButton
                  v-if="contact.email"
                  :to="`mailto:${contact.email}`"
                  color="primary"
                  size="xl"
                  block
                  variant="outline"
                  icon="i-heroicons-envelope"
                  external
                  class="text-lg"
                >
                  {{ contact.email }}
                </UButton>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Medical Information -->
        <UCard v-if="hasMedicalInfo">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-heart" class="w-6 h-6 text-error"></UIcon>
              <h2 class="text-xl font-semibold">{{ $t('preview.medicalInfo') }}</h2>
            </div>
          </template>

          <div class="space-y-3">
            <div v-if="iceData.allergies && iceData.allergies.length > 0" class="p-4 border-2 border-primary rounded-lg bg-primary/5">
              <h3 class="font-semibold text-base text-gray-900 dark:text-gray-100 mb-3">{{ $t('preview.allergies') }}</h3>
              <div class="space-y-2">
                <div
                  v-for="allergy in iceData.allergies"
                  :key="allergy"
                  class="text-base text-gray-800 dark:text-gray-200"
                >
                  {{ allergy }}
                </div>
              </div>
            </div>

            <div v-if="iceData.medicalConditions && iceData.medicalConditions.length > 0" class="p-4 border-2 border-primary rounded-lg bg-primary/5">
              <h3 class="font-semibold text-base text-gray-900 dark:text-gray-100 mb-3">{{ $t('preview.conditions') }}</h3>
              <div class="space-y-2">
                <div
                  v-for="condition in iceData.medicalConditions"
                  :key="condition"
                  class="text-base text-gray-800 dark:text-gray-200"
                >
                  {{ condition }}
                </div>
              </div>
            </div>

            <div v-if="iceData.currentMedications && iceData.currentMedications.length > 0" class="p-4 border-2 border-primary rounded-lg bg-primary/5">
              <h3 class="font-semibold text-base text-gray-900 dark:text-gray-100 mb-3">{{ $t('preview.medications') }}</h3>
              <div class="space-y-2">
                <div
                  v-for="medication in iceData.currentMedications"
                  :key="medication"
                  class="text-base text-gray-800 dark:text-gray-200"
                >
                  {{ medication }}
                </div>
              </div>
            </div>

            <div v-if="iceData.medicalNotes" class="p-4 border-2 border-primary rounded-lg bg-primary/5">
              <h3 class="font-semibold text-base text-gray-900 dark:text-gray-100 mb-3">{{ $t('preview.notes') }}</h3>
              <p class="text-base text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ iceData.medicalNotes }}</p>
            </div>
          </div>
        </UCard>

        <!-- Additional Information -->
        <UCard v-if="hasAdditionalInfo">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-information-circle" class="w-6 h-6 text-info"></UIcon>
              <h2 class="text-xl font-semibold">{{ $t('preview.additionalInfo') }}</h2>
            </div>
          </template>

          <div class="space-y-4">
            <div v-if="iceData.primaryDoctor">
              <h3 class="font-semibold text-base text-gray-900 dark:text-gray-100 mb-1">{{ $t('preview.doctor') }}</h3>
              <p class="text-gray-800 dark:text-gray-200">{{ iceData.primaryDoctor }}</p>
            </div>

            <div v-if="iceData.insuranceInfo">
              <h3 class="font-semibold text-base text-gray-900 dark:text-gray-100 mb-1">{{ $t('preview.insurance') }}</h3>
              <p class="text-gray-800 dark:text-gray-200">{{ iceData.insuranceInfo }}</p>
            </div>

            <div v-if="iceData.specialInstructions">
              <h3 class="font-semibold text-base text-gray-900 dark:text-gray-100 mb-1">{{ $t('preview.instructions') }}</h3>
              <p class="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ iceData.specialInstructions }}</p>
            </div>
          </div>
        </UCard>

        <!-- Footer with timestamp -->
        <div class="text-center text-sm text-gray-500">
          <p>{{ $t('preview.footer') }}</p>
          <p v-if="iceData.lastUpdated" class="mt-1">
            {{ $t('preview.lastUpdated') }}: {{ formatDate(iceData.lastUpdated) }}
          </p>
        </div>
      </div>
    </div>
  </UContainer>
</template>
