<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useSchoolFormStore } from '@/stores/school-form'

const { t } = useI18n()
const toast = useToast()
const schoolFormStore = useSchoolFormStore()

const resetDialog = ref()

const openResetModal = () => {
  resetDialog.value?.show()
}

const handleResetConfirm = () => {
  schoolFormStore.clearAll()
  resetDialog.value?.hide()
  toast.add({
    title: t('form.success'),
    description: t('schoolForm.allPeopleRemoved'),
    color: 'success'
  })
}

const generateCardsForAll = () => {
  if (!schoolFormStore.data.people.length) {
    toast.add({
      title: t('form.error'),
      description: t('schoolForm.errorNoPeople'),
      color: 'error'
    })
    return
  }

  toast.add({
    title: t('schoolForm.featureComingSoon'),
    description: t('schoolForm.cardGenerationComingSoon'),
    color: 'info'
  })
}
</script>

<template>
  <UContainer class="py-10">
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ $t('schoolForm.title') }}</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ $t('schoolForm.subtitle') }}</p>
      </div>
      <UButton
        type="button"
        size="sm"
        color="neutral"
        variant="ghost"
        icon="i-heroicons-arrow-path"
        @click="openResetModal"
      >
        {{ $t('schoolForm.resetAll') }}
      </UButton>
    </div>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
      <!-- Left: School Info -->
      <div class="lg:col-span-2 flex">
        <UCard class="flex-1">
          <FormSchoolInfo v-model="schoolFormStore.data.school"></FormSchoolInfo>
        </UCard>
      </div>

      <!-- Right: People List + Generate CTA -->
      <div class="lg:col-span-3 flex flex-col gap-4">
        <UCard class="flex-1">
          <FormPeopleList v-model="schoolFormStore.data.people"></FormPeopleList>
        </UCard>

        <UButton
          type="button"
          size="xl"
          block
          icon="i-heroicons-document-duplicate"
          :disabled="!schoolFormStore.data.people.length"
          @click="generateCardsForAll"
        >
          {{ $t('schoolForm.generateCards', { count: schoolFormStore.peopleCount }) }}
        </UButton>
      </div>
    </div>

    <!-- Reset Confirmation Modal -->
    <DialogCancel
      ref="resetDialog"
      @confirm="handleResetConfirm"
    >
      <template #title>
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-amber-500"></UIcon>
          <span>{{ $t('schoolForm.confirmReset') }}</span>
        </div>
      </template>

      <template #message>
        <div class="space-y-2">
          <p>{{ $t('schoolForm.resetMessage') }}</p>
          <p class="text-sm text-gray-500">{{ $t('schoolForm.resetWarning') }}</p>
        </div>
      </template>
    </DialogCancel>
  </UContainer>
</template>
