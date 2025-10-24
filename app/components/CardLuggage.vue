<script setup lang="ts">
import type { Owner, Address } from '@/types/luggage'

const props = defineProps<{
  owner?: Owner
  address?: Address
}>()

const { tel } = useHref()
const { generatePhoneQR } = useQRCode()

// Format links
const phoneLink = computed(() => tel(props.owner?.phone))

// Generate QR codes (reactive)
const phoneRef = computed(() => props.owner?.phone || '')
const phoneQR = generatePhoneQR(phoneRef)

// Check if we have data to display
const hasOwnerData = computed(() => {
  return props.owner && (
    props.owner.firstName ||
    props.owner.lastName ||
    props.owner.phone
  )
})

const hasAddressData = computed(() => {
  return props.address && (
    props.address.street ||
    props.address.city ||
    props.address.province ||
    props.address.postalCode ||
    props.address.country
  )
})

const hasData = computed(() => hasOwnerData.value || hasAddressData.value)

const fullName = computed(() => {
  if (!props.owner) return ''
  return [props.owner.firstName, props.owner.lastName].filter(Boolean).join(' ')
})

const fullAddress = computed(() => {
  if (!props.address) return ''
  const parts = []
  if (props.address.street) parts.push(props.address.street)
  if (props.address.city) parts.push(props.address.city)
  if (props.address.province) parts.push(props.address.province)
  if (props.address.postalCode) parts.push(props.address.postalCode)
  if (props.address.country) parts.push(props.address.country)
  return parts.join(', ')
})
</script>

<template>
  <UCard v-if="hasData" class="luggage-card">
    <div class="h-[400px] flex flex-col">
      <!-- Header -->
      <div class="text-center border-b border-gray-200 dark:border-gray-700 pb-3">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
          {{ $t('luggage.title') || 'Luggage Tag' }}
        </h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {{ $t('luggage.subtitle') || 'If found, please contact owner' }}
        </p>
      </div>

      <!-- Content -->
      <div class="flex-1 flex flex-col justify-center space-y-4 py-4">
        <!-- Full Name - Con icona -->
        <div v-if="fullName" class="flex items-center gap-4">
          <UIcon name="i-heroicons-user" class="text-3xl text-gray-400 flex-shrink-0" />
          <p class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ fullName }}
          </p>
        </div>

        <!-- Phone - Con icona e QR Code -->
        <div v-if="owner?.phone" class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4 flex-1">
            <UIcon name="i-heroicons-phone" class="text-3xl text-primary" />
            <a :href="phoneLink" class="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary">
              {{ owner.phone }}
            </a>
          </div>
          <img :src="phoneQR" alt="Phone QR" class="w-24 h-24 border-2 border-gray-300 rounded flex-shrink-0" />
        </div>

        <!-- Address - Con icona -->
        <div v-if="hasAddressData" class="flex items-start gap-4">
          <UIcon name="i-heroicons-map-pin" class="text-3xl text-gray-400 flex-shrink-0" />
          <p class="text-base text-gray-600 dark:text-gray-300 leading-snug">
            {{ fullAddress }}
          </p>
        </div>
      </div>
    </div>
  </UCard>

  <!-- No data message -->
  <UCard v-else>
    <div class="text-center py-12">
      <UIcon name="i-heroicons-briefcase" class="text-6xl text-gray-300 dark:text-gray-600 mb-4 mx-auto" />
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {{ $t('luggage.noData') || 'No luggage data' }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        {{ $t('luggage.noDataDescription') || 'Add owner and address information to create a luggage tag' }}
      </p>
    </div>
  </UCard>
</template>

<style scoped>
.luggage-card {
  max-width: 600px;
  margin: 0 auto;
}
</style>
