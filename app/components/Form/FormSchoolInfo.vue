<script setup lang="ts">
import type { SchoolData } from '@/types/school'

const props = defineProps<{
  modelValue: SchoolData
}>()

const emit = defineEmits<{
  'update:modelValue': [value: SchoolData]
}>()

const localData = ref<SchoolData>(props.modelValue || {})

const emitUpdate = () => {
  emit('update:modelValue', { ...localData.value })
}

watch(() => props.modelValue, (newValue) => {
  localData.value = newValue || {}
}, { deep: true })
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <div class="w-1 h-6 bg-primary rounded-full"></div>
      <h3 class="text-lg font-semibold">{{ $t('form.schoolInfo') }}</h3>
    </div>

    <!-- Nome Scuola -->
    <UFormField :label="$t('form.schoolName')" name="schoolName" class="w-full">
      <UInput
        v-model="localData.name"
        :placeholder="$t('form.schoolNamePlaceholder')"
        icon="i-heroicons-academic-cap"
        class="w-full"
        @input="emitUpdate"
      ></UInput>
    </UFormField>

    <!-- Telefono Scuola -->
    <UFormField :label="$t('form.schoolPhone')" name="schoolPhone" class="w-full">
      <UInput
        v-model="localData.phone"
        :placeholder="$t('form.schoolPhonePlaceholder')"
        icon="i-heroicons-phone"
        class="w-full"
        @input="emitUpdate"
      ></UInput>
    </UFormField>

    <!-- Città + Indirizzo -->
    <div class="grid grid-cols-2 gap-3">
      <UFormField :label="$t('form.schoolCity')" name="schoolCity" class="w-full">
        <UInput
          v-model="localData.city"
          :placeholder="$t('form.schoolCityPlaceholder')"
          icon="i-heroicons-map"
          class="w-full"
          @input="emitUpdate"
        ></UInput>
      </UFormField>

      <UFormField :label="$t('form.schoolAddress')" name="schoolAddress" class="w-full">
        <UInput
          v-model="localData.address"
          :placeholder="$t('form.schoolAddressPlaceholder')"
          icon="i-heroicons-map-pin"
          class="w-full"
          @input="emitUpdate"
        ></UInput>
      </UFormField>
    </div>

    <!-- Referente + Telefono -->
    <div class="grid grid-cols-2 gap-3">
      <UFormField :label="$t('form.schoolReferentName')" name="schoolReferentName" class="w-full">
        <UInput
          v-model="localData.referentName"
          :placeholder="$t('form.schoolReferentNamePlaceholder')"
          icon="i-heroicons-user"
          class="w-full"
          @input="emitUpdate"
        ></UInput>
      </UFormField>

      <UFormField :label="$t('form.schoolReferentPhone')" name="schoolReferentPhone" class="w-full">
        <UInput
          v-model="localData.referentPhone"
          :placeholder="$t('form.schoolReferentPhonePlaceholder')"
          icon="i-heroicons-phone"
          class="w-full"
          @input="emitUpdate"
        ></UInput>
      </UFormField>
    </div>

    <!-- Sezione -->
    <UFormField :label="$t('school.section')" name="schoolSection" class="w-full">
      <UInput
        v-model="localData.section"
        :placeholder="$t('school.sectionPlaceholder')"
        icon="i-heroicons-rectangle-group"
        class="w-full"
        @input="emitUpdate"
      ></UInput>
    </UFormField>

    <!-- Logo URL -->
    <UFormField :label="$t('form.schoolLogoUrl')" name="schoolLogoUrl" class="w-full">
      <UInput
        v-model="localData.logoUrl"
        :placeholder="$t('form.schoolLogoUrlPlaceholder')"
        icon="i-heroicons-photo"
        class="w-full"
        @input="emitUpdate"
      ></UInput>
    </UFormField>
  </div>
</template>
