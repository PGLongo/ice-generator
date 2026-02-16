<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useSchoolFormStore } from '@/stores/school-form'

const { t } = useI18n()
const toast = useToast()
const schoolFormStore = useSchoolFormStore()
const { generateSchoolPDF, previewSchoolPDF } = useSchoolPDF()

const hasPeople = ref(false)
watchEffect(() => {
  hasPeople.value = schoolFormStore.data.people.length > 0
})

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

const previewCards = async () => {
  if (!hasPeople.value) {
    toast.add({
      title: t('form.error'),
      description: t('schoolForm.errorNoPeople'),
      color: 'error'
    })
    return
  }

  try {
    await previewSchoolPDF(schoolFormStore.data)
  } catch {
    toast.add({
      title: t('form.error'),
      description: t('schoolForm.pdfError'),
      color: 'error'
    })
  }
}

const generateCardsForAll = async () => {
  if (!hasPeople.value) {
    toast.add({
      title: t('form.error'),
      description: t('schoolForm.errorNoPeople'),
      color: 'error'
    })
    return
  }

  try {
    await generateSchoolPDF(schoolFormStore.data)
    toast.add({
      title: t('form.success'),
      description: t('schoolForm.pdfGenerated', { count: schoolFormStore.data.people.length }),
      color: 'success'
    })
  } catch {
    toast.add({
      title: t('form.error'),
      description: t('schoolForm.pdfError'),
      color: 'error'
    })
  }
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

        <div class="flex gap-3">
          <UButton
            type="button"
            size="xl"
            color="neutral"
            variant="outline"
            icon="i-heroicons-eye"
            :disabled="!hasPeople"
            class="flex-1"
            @click="previewCards"
          >
            {{ $t('schoolForm.previewCards') }}
          </UButton>
          <UButton
            type="button"
            size="xl"
            icon="i-heroicons-document-duplicate"
            :disabled="!hasPeople"
            class="flex-1"
            @click="generateCardsForAll"
          >
            {{ $t('schoolForm.generateCards', { count: schoolFormStore.peopleCount }) }}
          </UButton>
        </div>
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
