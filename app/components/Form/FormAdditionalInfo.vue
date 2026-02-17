<script setup lang="ts">
export interface AdditionalInfoData {
  primaryDoctor?: string
  insuranceInfo?: string
  specialInstructions?: string
}

const props = defineProps<{
  modelValue: AdditionalInfoData
}>()

const emit = defineEmits<{
  'update:modelValue': [value: AdditionalInfoData]
}>()

const localData = ref<AdditionalInfoData>(props.modelValue || {})

watch(() => props.modelValue, (newValue) => {
  localData.value = newValue || {}
}, { deep: true })

watch(localData, () => {
  emit('update:modelValue', { ...localData.value })
}, { deep: true })
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
      <div class="md:col-span-6">
        <UFormField
          :label="$t('form.primaryDoctor')"
          name="primaryDoctor"
          class="w-full"
        >
          <UInput
            v-model="localData.primaryDoctor"
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
            v-model="localData.insuranceInfo"
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
            v-model="localData.specialInstructions"
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
