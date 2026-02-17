<script setup lang="ts">
import { useIceStore } from '@/stores/ice'

const iceStore = useIceStore()
</script>

<template>
  <div class="space-y-6">
    <!-- Grid a 6 colonne: input singolo occupa tutte le 6 colonne, textareas anche -->
    <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
      <div class="md:col-span-6">
        <UFormField
          :label="$t('form.primaryDoctor')"
          name="primaryDoctor"
          class="w-full"
        >
          <UInput
            v-model="iceStore.data.primaryDoctor"
            :placeholder="$t('form.primaryDoctorPlaceholder')"
            size="xl"
            icon="i-heroicons-user-circle"
            class="w-full"
          ></UInput>
        </UFormField>
      </div>

      <div class="md:col-span-6">
        <UFormField
          :label="$t('form.insuranceInfo')"
          name="insuranceInfo"
          class="w-full"
        >
          <UTextarea
            v-model="iceStore.data.insuranceInfo"
            :placeholder="$t('form.insuranceInfoPlaceholder')"
            :rows="3"
            size="xl"
            class="w-full"
          ></UTextarea>
        </UFormField>
      </div>

      <div class="md:col-span-6">
        <UFormField
          :label="$t('form.specialInstructions')"
          name="specialInstructions"
          class="w-full"
        >
          <UTextarea
            v-model="iceStore.data.specialInstructions"
            :placeholder="$t('form.specialInstructionsPlaceholder')"
            :rows="4"
            size="xl"
            class="w-full"
          ></UTextarea>
        </UFormField>
      </div>
    </div>
  </div>
</template>
