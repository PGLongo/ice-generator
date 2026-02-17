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
    link.download = `Emergency-${iceStore.data.name.replace(/\s+/g, '-')}-QRCode.png`
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
  <div class="form-page min-h-screen py-8 md:py-12">
    <UContainer>
      <div class="max-w-3xl mx-auto">
        <form class="space-y-5" @submit.prevent="onSubmit">
          <!-- Section: Personal Info -->
          <div class="form-panel rounded-2xl overflow-hidden">
            <div class="flex items-center gap-2 px-6 py-3 panel-header">
              <UIcon name="i-lucide-user" class="w-3.5 h-3.5 text-primary"></UIcon>
              <span class="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-muted)]">{{ $t('form.personalInfo') }}</span>
            </div>
            <div class="px-6 py-5">
              <FormPersonalInfo></FormPersonalInfo>
            </div>
          </div>

          <!-- Section: Medical Info -->
          <div class="form-panel rounded-2xl overflow-hidden">
            <div class="flex items-center gap-2 px-6 py-3 panel-header">
              <UIcon name="i-lucide-heart-pulse" class="w-3.5 h-3.5 text-red-500 dark:text-red-400"></UIcon>
              <span class="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-muted)]">{{ $t('form.medicalInfo') }}</span>
            </div>
            <div class="px-6 py-5">
              <FormMedicalInfo></FormMedicalInfo>
            </div>
          </div>

          <!-- Section: Emergency Contacts -->
          <div class="form-panel rounded-2xl overflow-hidden">
            <div class="flex items-center gap-2 px-6 py-3 panel-header">
              <UIcon name="i-lucide-phone" class="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400"></UIcon>
              <span class="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-muted)]">{{ $t('form.emergencyContacts') }}</span>
            </div>
            <div class="px-6 py-5">
              <FormEmergencyContacts v-model="iceStore.data.emergencyContacts"></FormEmergencyContacts>
            </div>
          </div>

          <!-- Section: Additional Info -->
          <div class="form-panel rounded-2xl overflow-hidden">
            <div class="flex items-center gap-2 px-6 py-3 panel-header">
              <UIcon name="i-lucide-info" class="w-3.5 h-3.5 text-blue-500 dark:text-blue-400"></UIcon>
              <span class="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-muted)]">{{ $t('form.additionalInfo') }}</span>
            </div>
            <div class="px-6 py-5">
              <FormAdditionalInfo></FormAdditionalInfo>
            </div>
          </div>

          <!-- Section: Export -->
          <div class="form-panel rounded-2xl overflow-hidden">
            <div class="flex items-center gap-2 px-6 py-3 panel-header">
              <UIcon name="i-lucide-download" class="w-3.5 h-3.5 text-violet-500 dark:text-violet-400"></UIcon>
              <span class="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--ui-text-muted)]">Export</span>
            </div>
            <div class="px-6 py-5 space-y-2.5">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <UButton
                  type="submit"
                  size="lg"
                  block
                  icon="i-lucide-qr-code"
                >
                  {{ $t('form.generateQr') }}
                </UButton>

                <UButton
                  type="button"
                  size="lg"
                  variant="outline"
                  icon="i-lucide-link"
                  block
                  :disabled="!iceStore.hasData"
                  @click="generateShareLink"
                >
                  {{ $t('form.generateNfcLink') }}
                </UButton>

                <UButton
                  type="button"
                  size="lg"
                  variant="outline"
                  icon="i-lucide-file-text"
                  block
                  :disabled="!iceStore.hasData"
                  @click="generateAndDownloadPDF"
                >
                  {{ $t('form.generatePdf') }}
                </UButton>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <UButton
                  type="button"
                  size="md"
                  color="neutral"
                  variant="subtle"
                  icon="i-lucide-eye"
                  block
                  :disabled="!iceStore.hasData"
                  @click="goToPreview"
                >
                  {{ $t('form.preview') }}
                </UButton>

                <UButton
                  type="button"
                  size="md"
                  color="neutral"
                  variant="subtle"
                  icon="i-lucide-graduation-cap"
                  block
                  :disabled="!iceStore.hasData"
                  @click="goToSchool"
                >
                  {{ $t('form.schoolCard') }}
                </UButton>

                <UButton
                  type="button"
                  size="md"
                  color="error"
                  variant="ghost"
                  icon="i-lucide-rotate-ccw"
                  @click="openResetModal"
                >
                  {{ $t('form.cancel') }}
                </UButton>
              </div>
            </div>
          </div>

          <!-- Footer note -->
          <div class="text-center pt-2 pb-2">
            <p class="text-[10px] text-[var(--ui-text-dimmed)]">{{ $t('form.footer') }}</p>
          </div>
        </form>
      </div>
    </UContainer>

    <!-- Reset Confirmation Modal -->
    <DialogCancel
      ref="resetDialog"
      @confirm="handleResetConfirm"
    >
      <template #title>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-triangle-alert" class="w-6 h-6 text-amber-500"></UIcon>
          <span>{{ $t('form.resetConfirmTitle') }}</span>
        </div>
      </template>

      <template #message>
        <div class="space-y-2">
          <p>{{ $t('form.resetConfirmMessage') }}</p>
          <p class="text-sm text-[var(--ui-text-dimmed)]">{{ $t('form.resetConfirmWarning') }}</p>
        </div>
      </template>
    </DialogCancel>
  </div>
</template>

<style scoped>
.form-panel {
  position: relative;
  background: var(--ui-bg-elevated);
  border: 1px solid var(--ui-border);
  box-shadow:
    0 4px 16px -4px rgba(0, 0, 0, 0.06),
    0 2px 8px -2px rgba(0, 0, 0, 0.03);
}

.dark .form-panel {
  background: linear-gradient(165deg,
    rgba(255, 255, 255, 0.04) 0%,
    rgba(255, 255, 255, 0.02) 50%,
    rgba(0, 0, 0, 0.06) 100%
  );
  border-color: rgba(255, 255, 255, 0.07);
  box-shadow:
    0 8px 32px -8px rgba(0, 0, 0, 0.3),
    0 4px 16px -4px rgba(0, 30, 80, 0.1);
}

.panel-header {
  border-bottom: 1px solid var(--ui-border);
}

.dark .panel-header {
  border-bottom-color: rgba(255, 255, 255, 0.05);
}
</style>
