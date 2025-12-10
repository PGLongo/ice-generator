<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useIceStore } from '@/stores/ice'

const { t } = useI18n()
const toast = useToast()
const iceStore = useIceStore()

const { copyShareableUrl, getEncodedSize, encodeData, generateShareableUrl } = useIceUrlShare()
const { generateQRCode } = useQRCode()
const { generatePDF } = useIcePDF()

// Reset dialog reference
const resetDialog = ref()

// Note: Data loading from URL is handled by the load-from-url.client.ts plugin

// Form submission - generate and download QR code
const onSubmit = async () => {
  if (!iceStore.data.name || !iceStore.data.age) {
    toast.add({
      id: 'error',
      title: t('form.error'),
      description: t('form.errorMessage'),
      color: 'error'
    })
    return
  }

  try {
    // Generate shareable URL
    const shareableUrl = await generateShareableUrl(iceStore.data)

    // Generate QR code as data URL
    const qrCodeDataUrl = await generateQRCode(shareableUrl, {
      margin: 2
    })

    // Create download link
    const link = document.createElement('a')
    link.href = qrCodeDataUrl
    link.download = `ICE-${iceStore.data.name.replace(/\s+/g, '-')}-QRCode.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast.add({
      id: 'success',
      title: t('form.qrSuccess'),
      description: t('form.qrSuccessMessage', { name: iceStore.data.name }),
      color: 'success'
    })
  } catch (_error) {
    console.error('Failed to generate QR code:', _error)
    toast.add({
      id: 'error',
      title: t('form.error'),
      description: t('form.errorMessageServer'),
      color: 'error'
    })
  }
}

// Generate and copy shareable link
const generateShareLink = async () => {
  if (!iceStore.hasData) {
    toast.add({
      title: t('form.error'),
      description: t('form.errorMessage'),
      color: 'error'
    })
    return
  }

  try {
    const success = await copyShareableUrl(iceStore.data)
    const size = await getEncodedSize(iceStore.data)
    const sizeKB = (size / 1024).toFixed(2)

    if (success) {
      toast.add({
        title: t('form.shareLinkSuccess'),
        description: t('form.shareLinkSuccessMessage', { size: sizeKB }),
        color: 'success'
      })
    } else {
      throw new Error('Copy failed')
    }
  } catch {
    toast.add({
      title: t('form.error'),
      description: t('form.shareLinkError'),
      color: 'error'
    })
  }
}

// Open reset confirmation modal
const openResetModal = () => {
  resetDialog.value?.show()
}

// Reset form - clear store (after confirmation)
const handleResetConfirm = () => {
  iceStore.clearData()
  resetDialog.value?.hide()
  toast.add({
    title: t('form.success'),
    description: t('form.resetSuccess'),
    color: 'success'
  })
}

// Go to preview page with data in query params (compressed)
const goToPreview = () => {
  if (!iceStore.hasData) {
    toast.add({
      title: t('form.error'),
      description: t('form.errorMessage'),
      color: 'error'
    })
    return
  }

  const encodedData = encodeData(iceStore.data)
  navigateTo(`/preview?data=${encodedData}`)
}

// Go to school page with data in query params (compressed)
const goToSchool = () => {
  if (!iceStore.hasData) {
    toast.add({
      title: t('form.error'),
      description: t('form.errorMessage'),
      color: 'error'
    })
    return
  }

  const encodedData = encodeData(iceStore.data)
  navigateTo(`/school?data=${encodedData}`)
}

// Generate and download PDF
const generateAndDownloadPDF = async () => {
  if (!iceStore.hasData) {
    toast.add({
      title: t('form.error'),
      description: t('form.errorMessage'),
      color: 'error'
    })
    return
  }

  try {
    toast.add({
      id: 'pdf-generating',
      title: t('form.pdfGenerating'),
      description: t('form.pdfGeneratingMessage'),
      color: 'info'
    })

    await generatePDF(iceStore.data, true)

    toast.add({
      id: 'pdf-success',
      title: t('form.pdfSuccess'),
      description: t('form.pdfSuccessMessage', { name: iceStore.data.name }),
      color: 'success'
    })
  } catch (error) {
    console.error('Failed to generate PDF:', error)
    toast.add({
      id: 'pdf-error',
      title: t('form.error'),
      description: t('form.pdfErrorMessage'),
      color: 'error'
    })
  }
}
</script>

<template>
  <UContainer class="py-12">
    <div class="max-w-4xl mx-auto">
      <UCard>
        <form class="space-y-8" @submit.prevent="onSubmit">
          <FormPersonalInfo></FormPersonalInfo>

          <USeparator></USeparator>

          <FormMedicalInfo></FormMedicalInfo>

          <USeparator></USeparator>

          <FormEmergencyContacts v-model="iceStore.data.emergencyContacts"></FormEmergencyContacts>

          <USeparator></USeparator>

          <FormAdditionalInfo></FormAdditionalInfo>

          <USeparator></USeparator>

          <FormSchoolInfo></FormSchoolInfo>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
            <!-- Primary Actions -->
            <UButton
              type="submit"
              size="xl"
              block
              icon="i-heroicons-qr-code"
              class="col-span-full md:col-span-1"
            >
              {{ $t('form.generateQr') }}
            </UButton>

            <UButton
              type="button"
              size="xl"
              color="info"
              variant="outline"
              icon="i-heroicons-link"
              block
              :disabled="!iceStore.hasData"
              @click="generateShareLink"
              class="col-span-full md:col-span-1"
            >
              {{ $t('form.generateNfcLink') }}
            </UButton>

            <UButton
              type="button"
              size="xl"
              color="warning"
              variant="outline"
              icon="i-heroicons-document-text"
              block
              :disabled="!iceStore.hasData"
              @click="generateAndDownloadPDF"
              class="col-span-full md:col-span-1"
            >
              {{ $t('form.generatePdf') }}
            </UButton>

            <!-- Secondary Actions -->
            <UButton
              type="button"
              size="lg"
              color="primary"
              variant="outline"
              icon="i-heroicons-eye"
              block
              @click="goToPreview"
              :disabled="!iceStore.hasData"
              class="col-span-full lg:col-span-1"
            >
              {{ $t('form.preview') }}
            </UButton>

            <UButton
              type="button"
              size="lg"
              color="primary"
              variant="outline"
              icon="i-heroicons-academic-cap"
              block
              :disabled="!iceStore.hasData"
              @click="goToSchool"
              class="col-span-full lg:col-span-1"
            >
              {{ $t('form.schoolCard') }}
            </UButton>

            <UButton
              type="button"
              size="lg"
              color="neutral"
              variant="outline"
              icon="i-heroicons-arrow-path"
              @click="openResetModal"
              class="col-span-full lg:col-span-1"
            >
              {{ $t('form.cancel') }}
            </UButton>
          </div>
        </form>
      </UCard>
    </div>

    <!-- Reset Confirmation Modal -->
    <DialogCancel
      ref="resetDialog"
      @confirm="handleResetConfirm"
    >
      <template #title>
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-amber-500"></UIcon>
          <span>{{ $t('form.resetConfirmTitle') }}</span>
        </div>
      </template>

      <template #message>
        <div class="space-y-2">
          <p>{{ $t('form.resetConfirmMessage') }}</p>
          <p class="text-sm text-gray-500">{{ $t('form.resetConfirmWarning') }}</p>
        </div>
      </template>
    </DialogCancel>
  </UContainer>
</template>
