<template>
  <div class="space-y-6">
    <div class="flex items-center gap-2 mb-6">
      <div class="w-1 h-6 bg-primary rounded-full" />
      <h3 class="text-lg font-semibold">
        {{ $t('form.additionalInfo') }}
      </h3>
    </div>

    <UFormField
      :label="$t('form.primaryDoctor')"
      name="primaryDoctor"
    >
      <UInput
        v-model="iceStore.data.primaryDoctor"
        :placeholder="$t('form.primaryDoctorPlaceholder')"
        size="xl"
        icon="i-heroicons-user-circle"
      />
    </UFormField>

    <UFormField
      :label="$t('form.insuranceInfo')"
      name="insuranceInfo"
    >
      <UTextarea
        v-model="iceStore.data.insuranceInfo"
        :placeholder="$t('form.insuranceInfoPlaceholder')"
        :rows="3"
        size="xl"
      />
    </UFormField>

    <UFormField
      :label="$t('form.specialInstructions')"
      name="specialInstructions"
    >
      <UTextarea
        v-model="iceStore.data.specialInstructions"
        :placeholder="$t('form.specialInstructionsPlaceholder')"
        :rows="4"
        size="xl"
      />
    </UFormField>
  </div>
</template>

<script setup lang="ts">
import { useIceStore } from '@/stores/ice'

const iceStore = useIceStore()
</script>
