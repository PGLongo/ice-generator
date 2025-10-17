<script setup lang="ts">
import { useIceStore } from '@/stores/ice'

const iceStore = useIceStore()

// Inizializza l'oggetto school se non esiste
if (!iceStore.data.school) {
  iceStore.data.school = {}
}

// Computed properties per gestire in modo sicuro i campi opzionali di school
const schoolName = computed({
  get: () => iceStore.data.school?.name ?? '',
  set: (value: string) => {
    if (!iceStore.data.school) iceStore.data.school = {}
    iceStore.data.school.name = value || undefined
  }
})

const schoolPhone = computed({
  get: () => iceStore.data.school?.phone ?? '',
  set: (value: string) => {
    if (!iceStore.data.school) iceStore.data.school = {}
    iceStore.data.school.phone = value || undefined
  }
})

const schoolAddress = computed({
  get: () => iceStore.data.school?.address ?? '',
  set: (value: string) => {
    if (!iceStore.data.school) iceStore.data.school = {}
    iceStore.data.school.address = value || undefined
  }
})

const schoolCity = computed({
  get: () => iceStore.data.school?.city ?? '',
  set: (value: string) => {
    if (!iceStore.data.school) iceStore.data.school = {}
    iceStore.data.school.city = value || undefined
  }
})

const referentName = computed({
  get: () => iceStore.data.school?.referentName ?? '',
  set: (value: string) => {
    if (!iceStore.data.school) iceStore.data.school = {}
    iceStore.data.school.referentName = value || undefined
  }
})

const referentPhone = computed({
  get: () => iceStore.data.school?.referentPhone ?? '',
  set: (value: string) => {
    if (!iceStore.data.school) iceStore.data.school = {}
    iceStore.data.school.referentPhone = value || undefined
  }
})

const schoolSection = computed({
  get: () => iceStore.data.school?.section ?? '',
  set: (value: string) => {
    if (!iceStore.data.school) iceStore.data.school = {}
    iceStore.data.school.section = value || undefined
  }
})

const logoUrl = computed({
  get: () => iceStore.data.school?.logoUrl ?? '',
  set: (value: string) => {
    if (!iceStore.data.school) iceStore.data.school = {}
    iceStore.data.school.logoUrl = value || undefined
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-2 mb-6">
      <div class="w-1 h-6 bg-primary rounded-full"></div>
      <h3 class="text-lg font-semibold">
        {{ $t('form.schoolInfo') }}
      </h3>
    </div>

    <!-- Nome Scuola (8 col), Telefono Scuola (4 col) -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div class="md:col-span-8">
        <UFormField
          :label="$t('form.schoolName')"
          name="schoolName"
          class="w-full"
        >
          <UInput
            v-model="schoolName"
            :placeholder="$t('form.schoolNamePlaceholder')"
            size="xl"
            icon="i-heroicons-academic-cap"
            class="w-full"
          ></UInput>
        </UFormField>
      </div>

      <div class="md:col-span-4">
        <UFormField
          :label="$t('form.schoolPhone')"
          name="schoolPhone"
          class="w-full"
        >
          <UInput
            v-model="schoolPhone"
            :placeholder="$t('form.schoolPhonePlaceholder')"
            size="xl"
            icon="i-heroicons-phone"
            class="w-full"
          ></UInput>
        </UFormField>
      </div>
    </div>

    <!-- Città (4 col), Indirizzo (8 col) -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div class="md:col-span-4">
        <UFormField
          :label="$t('form.schoolCity')"
          name="schoolCity"
          class="w-full"
        >
          <UInput
            v-model="schoolCity"
            :placeholder="$t('form.schoolCityPlaceholder')"
            size="xl"
            icon="i-heroicons-map"
            class="w-full"
          ></UInput>
        </UFormField>
      </div>

      <div class="md:col-span-8">
        <UFormField
          :label="$t('form.schoolAddress')"
          name="schoolAddress"
          class="w-full"
        >
          <UInput
            v-model="schoolAddress"
            :placeholder="$t('form.schoolAddressPlaceholder')"
            size="xl"
            icon="i-heroicons-map-pin"
            class="w-full"
          ></UInput>
        </UFormField>
      </div>
    </div>

    <!-- Nome Referente (4 col), Telefono Referente (4 col), Sezione (4 col) -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div class="md:col-span-4">
        <UFormField
          :label="$t('form.schoolReferentName')"
          name="schoolReferentName"
          class="w-full"
        >
          <UInput
            v-model="referentName"
            :placeholder="$t('form.schoolReferentNamePlaceholder')"
            size="xl"
            icon="i-heroicons-user"
            class="w-full"
          ></UInput>
        </UFormField>
      </div>

      <div class="md:col-span-4">
        <UFormField
          :label="$t('form.schoolReferentPhone')"
          name="schoolReferentPhone"
          class="w-full"
        >
          <UInput
            v-model="referentPhone"
            :placeholder="$t('form.schoolReferentPhonePlaceholder')"
            size="xl"
            icon="i-heroicons-phone"
            class="w-full"
          ></UInput>
        </UFormField>
      </div>

      <div class="md:col-span-4">
        <UFormField
          :label="$t('school.section')"
          name="schoolSection"
          class="w-full"
        >
          <UInput
            v-model="schoolSection"
            :placeholder="$t('school.sectionPlaceholder')"
            size="xl"
            icon="i-heroicons-rectangle-group"
            class="w-full"
          ></UInput>
        </UFormField>
      </div>
    </div>

    <!-- Link Logo (12 col) -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div class="md:col-span-12">
        <UFormField
          :label="$t('form.schoolLogoUrl')"
          name="schoolLogoUrl"
          class="w-full"
        >
          <UInput
            v-model="logoUrl"
            :placeholder="$t('form.schoolLogoUrlPlaceholder')"
            size="xl"
            icon="i-heroicons-photo"
            class="w-full"
          ></UInput>
        </UFormField>
      </div>
    </div>
  </div>
</template>
