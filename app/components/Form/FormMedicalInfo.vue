<template>
  <div class="space-y-6">
    <div class="flex items-center gap-2 mb-6">
      <div class="w-1 h-6 bg-primary rounded-full" />
      <h3 class="text-lg font-semibold">
        {{ $t('form.medicalInfo') }}
      </h3>
    </div>

    <UFormField
      :label="$t('form.allergies')"
      name="allergies"
      :hint="$t('form.allergiesHint')"
    >
      <UTextarea
        v-model="allergiesText"
        :placeholder="$t('form.allergiesPlaceholder')"
        :rows="3"
        size="xl"
      />
    </UFormField>

    <UFormField
      :label="$t('form.medicalConditions')"
      name="medicalConditions"
      :hint="$t('form.medicalConditionsHint')"
    >
      <UTextarea
        v-model="conditionsText"
        :placeholder="$t('form.medicalConditionsPlaceholder')"
        :rows="3"
        size="xl"
      />
    </UFormField>

    <UFormField
      :label="$t('form.currentMedications')"
      name="currentMedications"
      :hint="$t('form.currentMedicationsHint')"
    >
      <UTextarea
        v-model="medicationsText"
        :placeholder="$t('form.currentMedicationsPlaceholder')"
        :rows="3"
        size="xl"
      />
    </UFormField>

    <UFormField
      :label="$t('form.medicalNotes')"
      name="medicalNotes"
    >
      <UTextarea
        v-model="iceStore.data.medicalNotes"
        :placeholder="$t('form.medicalNotesPlaceholder')"
        :rows="4"
        size="xl"
      />
    </UFormField>
  </div>
</template>

<script setup lang="ts">
import { useIceStore } from '@/stores/ice'

const iceStore = useIceStore()

// Computed properties for text representation
const allergiesText = computed({
  get: () => (iceStore.data.allergies || []).join(', '),
  set: (value: string) => {
    iceStore.data.allergies = value
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0)
  }
})

const conditionsText = computed({
  get: () => (iceStore.data.medicalConditions || []).join(', '),
  set: (value: string) => {
    iceStore.data.medicalConditions = value
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0)
  }
})

const medicationsText = computed({
  get: () => (iceStore.data.currentMedications || []).join(', '),
  set: (value: string) => {
    iceStore.data.currentMedications = value
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0)
  }
})
</script>
