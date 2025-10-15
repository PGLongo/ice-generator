<template>
  <UContainer class="py-12">
    <div class="max-w-4xl mx-auto">
      <UPageHeader
        :title="$t('app.title')"
        :description="$t('form.subtitle')"
      />

      <UCard class="mt-8">
        <form @submit.prevent="onSubmit" class="space-y-8">
          <FormPersonalInfo />

          <UDivider />

          <FormMedicalInfo />

          <UDivider />

          <FormEmergencyContacts v-model="iceStore.data.emergencyContacts" />

          <UDivider />

          <FormAdditionalInfo />

          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <UButton
              type="submit"
              size="xl"
              block
              icon="i-heroicons-arrow-down-tray"
            >
              {{ $t('form.save') }}
            </UButton>

            <UButton
              type="button"
              size="xl"
              color="primary"
              variant="outline"
              icon="i-heroicons-eye"
              block
              @click="goToPreview"
            >
              {{ $t('form.preview') }}
            </UButton>

            <UButton
              type="button"
              size="xl"
              color="blue"
              variant="outline"
              icon="i-heroicons-link"
              block
              @click="generateShareLink"
              :disabled="!iceStore.hasData"
            >
              {{ $t('form.shareLink') }}
            </UButton>

            <UButton
              type="button"
              size="xl"
              color="neutral"
              variant="outline"
              icon="i-heroicons-arrow-path"
              @click="resetForm"
            >
              {{ $t('form.cancel') }}
            </UButton>
          </div>
        </form>
      </UCard>

      <div class="mt-6 text-center">
        <p class="text-sm text-muted">
          {{ $t('form.footer') }}
        </p>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { useIceStore } from '@/stores/ice'
import type { EmergencyContact } from '@/stores/ice'

const { t } = useI18n()
const toast = useToast()
const iceStore = useIceStore()
const { downloadHTML } = useIceExport()
const { copyShareableUrl, getEncodedSize } = useIceUrlShare()

// Form submission - just download HTML
const onSubmit = () => {
  if (!iceStore.data.name || !iceStore.data.age) {
    toast.add({
      id: 'error',
      title: t('form.error'),
      description: t('form.errorMessage'),
      color: 'red',
      timeout: 3000
    })
    return
  }

  try {
    // Download HTML file
    downloadHTML(iceStore.data)

    toast.add({
      id: 'success',
      title: t('form.success'),
      description: t('form.successMessage', { name: iceStore.data.name }),
      color: 'green',
      timeout: 3000
    })
  } catch (error) {
    toast.add({
      id: 'error',
      title: t('form.error'),
      description: t('form.errorMessageServer'),
      color: 'red',
      timeout: 3000
    })
  }
}

// Generate and copy shareable link
const generateShareLink = async () => {
  if (!iceStore.hasData) {
    toast.add({
      title: t('form.error'),
      description: t('form.errorMessage'),
      color: 'red',
      timeout: 3000
    })
    return
  }

  try {
    const success = await copyShareableUrl(iceStore.data)
    const size = getEncodedSize(iceStore.data)
    const sizeKB = (size / 1024).toFixed(2)

    if (success) {
      toast.add({
        title: t('form.shareLinkSuccess'),
        description: t('form.shareLinkSuccessMessage', { size: sizeKB }),
        color: 'green',
        timeout: 5000
      })
    } else {
      throw new Error('Copy failed')
    }
  } catch (error) {
    toast.add({
      title: t('form.error'),
      description: t('form.shareLinkError'),
      color: 'red',
      timeout: 3000
    })
  }
}

// Reset form - clear store
const resetForm = () => {
  iceStore.clearData()
}

// Go to preview page
const goToPreview = () => {
  navigateTo('/preview')
}
</script>
