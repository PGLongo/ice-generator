<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useIceStore } from '@/stores/ice'

const iceStore = useIceStore()

// The load-from-url.client.ts plugin handles loading data from URL into the store
// We just need to use the store data directly

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

      <!-- Card biglietto scuola -->
      <CardSchool
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
      ></CardSchool>
    </div>
  </UContainer>
</template>
