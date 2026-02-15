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

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  localData.value = newValue || {}
}, { deep: true })
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
            v-model="localData.name"
            :placeholder="$t('form.schoolNamePlaceholder')"
            size="xl"
            icon="i-heroicons-academic-cap"
            class="w-full"
            @input="emitUpdate"
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
            v-model="localData.phone"
            :placeholder="$t('form.schoolPhonePlaceholder')"
            size="xl"
            icon="i-heroicons-phone"
            class="w-full"
            @input="emitUpdate"
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
            v-model="localData.city"
            :placeholder="$t('form.schoolCityPlaceholder')"
            size="xl"
            icon="i-heroicons-map"
            class="w-full"
            @input="emitUpdate"
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
            v-model="localData.address"
            :placeholder="$t('form.schoolAddressPlaceholder')"
            size="xl"
            icon="i-heroicons-map-pin"
            class="w-full"
            @input="emitUpdate"
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
            v-model="localData.referentName"
            :placeholder="$t('form.schoolReferentNamePlaceholder')"
            size="xl"
            icon="i-heroicons-user"
            class="w-full"
            @input="emitUpdate"
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
            v-model="localData.referentPhone"
            :placeholder="$t('form.schoolReferentPhonePlaceholder')"
            size="xl"
            icon="i-heroicons-phone"
            class="w-full"
            @input="emitUpdate"
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
            v-model="localData.section"
            :placeholder="$t('school.sectionPlaceholder')"
            size="xl"
            icon="i-heroicons-rectangle-group"
            class="w-full"
            @input="emitUpdate"
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
            v-model="localData.logoUrl"
            :placeholder="$t('form.schoolLogoUrlPlaceholder')"
            size="xl"
            icon="i-heroicons-photo"
            class="w-full"
            @input="emitUpdate"
          ></UInput>
        </UFormField>
      </div>
    </div>
  </div>
</template>
