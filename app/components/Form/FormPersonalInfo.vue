<template>
  <div class="space-y-6">
    <div class="flex items-center gap-2 mb-6">
      <div class="w-1 h-6 bg-primary rounded-full" />
      <h3 class="text-lg font-semibold">
        {{ $t('form.personalInfo') }}
      </h3>
    </div>

    <!-- Prima riga: Nome, Età, Gruppo Sanguigno -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        />
      </UFormField>

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
        />
      </UFormField>

      <UFormField
        :label="$t('form.bloodType')"
        name="bloodType"
        class="w-full"
      >
        <USelectMenu
          v-model="iceStore.data.bloodType"
          :items="bloodTypes"
          :placeholder="$t('form.bloodTypePlaceholder')"
          size="xl"
          value-attribute="value"
          label-attribute="label"
          class="w-full"
        />
      </UFormField>
    </div>

    <!-- Seconda riga: Città (1 col), Indirizzo (2 col) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-1">
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
          />
        </UFormField>
      </div>

      <div class="md:col-span-2">
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
          />
        </UFormField>
      </div>
    </div>
  </div>
</template>

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
</script>
