<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useSchoolFormStore } from '@/stores/school-form'

const { t } = useI18n()
const toast = useToast()
const schoolFormStore = useSchoolFormStore()

// Reset dialog reference
const resetDialog = ref()

// Open reset confirmation modal
const openResetModal = () => {
  resetDialog.value?.show()
}

// Reset form - clear store (after confirmation)
const handleResetConfirm = () => {
  schoolFormStore.clearAll()
  resetDialog.value?.hide()
  toast.add({
    title: t('form.success'),
    description: t('schoolForm.allPeopleRemoved'),
    color: 'success'
  })
}

// Generate cards for all people
const generateCardsForAll = () => {
  if (!schoolFormStore.hasPeople) {
    toast.add({
      title: t('form.error'),
      description: t('schoolForm.errorNoPeople'),
      color: 'error'
    })
    return
  }

  // TODO: Implement card generation logic
  toast.add({
    title: t('schoolForm.featureComingSoon'),
    description: t('schoolForm.cardGenerationComingSoon'),
    color: 'info'
  })
}
</script>

<template>
  <UContainer class="py-12">
    <div class="max-w-4xl mx-auto">
      <UCard>
        <div class="space-y-8">
          <div class="text-center space-y-2">
            <h1 class="text-3xl font-bold">{{ $t('schoolForm.title') }}</h1>
            <p class="text-gray-600">{{ $t('schoolForm.subtitle') }}</p>
          </div>

          <USeparator ></USeparator>

          <!-- School Information Section -->
          <FormSchoolInfo v-model="schoolFormStore.data.school" ></FormSchoolInfo>

          <USeparator ></USeparator>

          <!-- People List Section -->
          <FormPeopleList v-model="schoolFormStore.data.people" ></FormPeopleList>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            <!-- Primary Action -->
            <UButton
              type="button"
              size="xl"
              block
              icon="i-heroicons-document-duplicate"
              :disabled="!schoolFormStore.hasPeople"
              @click="generateCardsForAll"
              class="col-span-full md:col-span-1"
            >
              {{ $t('schoolForm.generateCards', { count: schoolFormStore.peopleCount }) }}
            </UButton>

            <!-- Secondary Actions -->
            <UButton
              type="button"
              size="xl"
              color="neutral"
              variant="outline"
              icon="i-heroicons-arrow-path"
              block
              @click="openResetModal"
              class="col-span-full md:col-span-1"
            >
              {{ $t('schoolForm.resetAll') }}
            </UButton>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Reset Confirmation Modal -->
    <DialogCancel
      ref="resetDialog"
      @confirm="handleResetConfirm"
    >
      <template #title>
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-amber-500" ></UIcon>
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
