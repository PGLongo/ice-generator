<script setup lang="ts">
import { useIceStore } from '@/stores/ice'
import type { IceData } from '@/types/ice'

const iceStore = useIceStore()
const { isLoading, data, loadData } = useDataLoader<IceData>()

// Load data from URL query params on mount
onMounted(async () => {
  await loadData()
  // If data was loaded from URL, update the store
  if (data.value) {
    iceStore.data = data.value
  }
})

const printCard = () => {
  window.print()
}
</script>

<template>
  <UContainer class="py-12">
    <div class="max-w-6xl mx-auto">
      <!-- Header con pulsanti (solo su schermo, nascosto nella stampa) -->
      <div class="mb-8 flex justify-between items-center print:hidden">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ $t('school.title') }}
          </h1>
          <p class="text-gray-500 dark:text-gray-400 mt-2">
            {{ $t('school.subtitle') }}
          </p>
        </div>
        <div class="flex gap-3">
          <UButton
            to="/form"
            color="neutral"
            variant="outline"
            icon="i-heroicons-arrow-left"
            size="lg"
          >
            {{ $t('preview.back') }}
          </UButton>
          <UButton
            icon="i-heroicons-printer"
            color="primary"
            size="lg"
            @click="printCard"
          >
            {{ $t('school.print') }}
          </UButton>
        </div>
      </div>

      <!-- Loading state -->
      <LoadingState v-if="isLoading" />

      <!-- Card biglietto scuola -->
      <CardSchool
        v-else
        :school="{
          name: iceStore.data.school.name,
          address: iceStore.data.school.address,
          city: iceStore.data.school.city,
          phone: iceStore.data.school.phone,
          logoUrl: iceStore.data.school.logoUrl
        }"
        :student="{
          name: iceStore.data.name,
          section: iceStore.data.section
        }"
        :referent="{
          name: iceStore.data.school.referentName,
          phone: iceStore.data.school.referentPhone
        }"
      />
    </div>
  </UContainer>
</template>
