<script setup lang="ts">
import { useIceStore } from '@/stores/ice'

const iceStore = useIceStore()

const bloodTypes = [
  { label: 'A+', value: 'A+' },
  { label: 'A-', value: 'A-' },
  { label: 'B+', value: 'B+' },
  { label: 'B-', value: 'B-' },
  { label: 'AB+', value: 'AB+' },
  { label: 'AB-', value: 'AB-' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' }
]

// Computed to handle undefined bloodType
const selectedBloodType = computed({
  get: () => {
    const bloodType = iceStore.data.bloodType
    if (!bloodType) return undefined
    return bloodTypes.find(bt => bt.value === bloodType)
  },
  set: (value: { label: string; value: string } | undefined) => {
    iceStore.data.bloodType = value?.value || undefined
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-2 mb-6">
      <div class="w-1 h-6 bg-primary rounded-full"></div>
      <h3 class="text-lg font-semibold">
        {{ $t('form.personalInfo') }}
      </h3>
    </div>

    <!-- Grid a 6 colonne: Nome (3), Età (2), Gruppo Sanguigno (1) -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
      <div class="md:col-span-6">
        <UFormField
          :label="$t('form.name')"
          name="name"
          required
          class="w-full"
        >
          <UInput
            v-model="iceStore.data.name"
            :placeholder="$t('form.namePlaceholder')"
            size="xl"
            icon="i-heroicons-user"
            class="w-full"
          ></UInput>
        </UFormField>
      </div>

      <div class="md:col-span-3">
        <UFormField
          :label="$t('form.age')"
          name="age"
          required
          class="w-full"
        >
          <UInput
            v-model.number="iceStore.data.age"
            type="number"
            :placeholder="$t('form.agePlaceholder')"
            size="xl"
            icon="i-heroicons-calendar"
            class="w-full"
          ></UInput>
        </UFormField>
      </div>

      <div class="md:col-span-3">
        <UFormField
          :label="$t('form.bloodType')"
          name="bloodType"
          class="w-full"
        >
          <USelectMenu
            v-model="selectedBloodType"
            :items="bloodTypes"
            :placeholder="$t('form.bloodTypePlaceholder')"
            size="xl"
            value-attribute="value"
            label-attribute="label"
            class="w-full"
          ></USelectMenu>
        </UFormField>
      </div>
    </div>

    <!-- Città (4 col), Indirizzo (8 col) -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div class="md:col-span-4">
        <UFormField
          :label="$t('form.city')"
          name="city"
          class="w-full"
        >
          <UInput
            v-model="iceStore.data.city"
            :placeholder="$t('form.cityPlaceholder')"
            size="xl"
            icon="i-heroicons-map"
            class="w-full"
          ></UInput>
        </UFormField>
      </div>

      <div class="md:col-span-8">
        <UFormField
          :label="$t('form.address')"
          name="address"
          class="w-full"
        >
          <UInput
            v-model="iceStore.data.address"
            :placeholder="$t('form.addressPlaceholder')"
            size="xl"
            icon="i-heroicons-map-pin"
            class="w-full"
          ></UInput>
        </UFormField>
      </div>
    </div>
  </div>
</template>
