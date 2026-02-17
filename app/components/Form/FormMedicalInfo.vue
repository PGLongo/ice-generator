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

<template>
  <div class="space-y-6">
    <!-- Grid a 6 colonne: tutte le textarea occupano 6 colonne -->
    <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
      <div class="md:col-span-6">
        <UFormField
          :label="$t('form.allergies')"
          name="allergies"
          :hint="$t('form.allergiesHint')"
          class="w-full"
        >
          <UTextarea
            v-model="allergiesText"
            :placeholder="$t('form.allergiesPlaceholder')"
            :rows="3"
            size="xl"
            class="w-full"
          ></UTextarea>
        </UFormField>
      </div>

      <div class="md:col-span-6">
        <UFormField
          :label="$t('form.medicalConditions')"
          name="medicalConditions"
          :hint="$t('form.medicalConditionsHint')"
          class="w-full"
        >
          <UTextarea
            v-model="conditionsText"
            :placeholder="$t('form.medicalConditionsPlaceholder')"
            :rows="3"
            size="xl"
            class="w-full"
          ></UTextarea>
        </UFormField>
      </div>

      <div class="md:col-span-6">
        <UFormField
          :label="$t('form.currentMedications')"
          name="currentMedications"
          :hint="$t('form.currentMedicationsHint')"
          class="w-full"
        >
          <UTextarea
            v-model="medicationsText"
            :placeholder="$t('form.currentMedicationsPlaceholder')"
            :rows="3"
            size="xl"
            class="w-full"
          ></UTextarea>
        </UFormField>
      </div>

      <div class="md:col-span-6">
        <UFormField
          :label="$t('form.medicalNotes')"
          name="medicalNotes"
          class="w-full"
        >
          <UTextarea
            v-model="iceStore.data.medicalNotes"
            :placeholder="$t('form.medicalNotesPlaceholder')"
            :rows="4"
            size="xl"
            class="w-full"
          ></UTextarea>
        </UFormField>
      </div>
    </div>
  </div>
</template>
