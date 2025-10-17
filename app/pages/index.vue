<script setup lang="ts">
import { useIceStore } from '@/stores/ice'

const { t } = useI18n()
const toast = useToast()
const route = useRoute()
const iceStore = useIceStore()
const { copyShareableUrl, getEncodedSize, encodeData, decodeData, generateShareableUrl } = useIceUrlShare()
const { generateQRCode } = useQRCode()

// Reset confirmation modal state
const isResetModalOpen = ref(false)

// Load data from URL query params on mount (and save to store)
onMounted(() => {
  const dataParam = route.query.data as string
  if (dataParam) {
    try {
      const decodedData = decodeData(dataParam)
      if (decodedData) {
        // Load into store (will be saved to localStorage via plugin)
        iceStore.data = decodedData
        toast.add({
          title: t('form.success'),
          description: 'Data loaded from shared link',
          color: 'success'
        })
      }
    } catch (error) {
      console.error('Failed to load data from URL:', error)
    }
  }
})

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
    const shareableUrl = generateShareableUrl(iceStore.data)

    // Generate QR code as data URL
    const qrCodeDataUrl = await generateQRCode(shareableUrl, {
      width: 1024,
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
    const size = getEncodedSize(iceStore.data)
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
  isResetModalOpen.value = true
}

// Reset form - clear store (after confirmation)
const handleResetConfirm = () => {
  iceStore.clearData()
  isResetModalOpen.value = false
  toast.add({
    title: t('form.success'),
    description: t('form.resetSuccess'),
    color: 'success'
  })
}

const handleResetCancel = () => {
  isResetModalOpen.value = falses
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
</script>

<template>
  <UContainer class="py-12">
    <div class="max-w-4xl mx-auto">
      <UCard>
        <form class="space-y-8" @submit.prevent="onSubmit">
          <FormPersonalInfo></FormPersonalInfo>

          <UDivider></UDivider>

          <FormMedicalInfo></FormMedicalInfo>

          <UDivider></UDivider>

          <FormEmergencyContacts v-model="iceStore.data.emergencyContacts"></FormEmergencyContacts>

          <UDivider></UDivider>

          <FormAdditionalInfo></FormAdditionalInfo>

          <UDivider></UDivider>

          <FormSchoolInfo></FormSchoolInfo>

          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <UButton
              type="submit"
              size="xl"
              block
              icon="i-heroicons-qr-code"
            >
              {{ $t('form.saveQr') }}
            </UButton>

            <UButton
              type="button"
              size="xl"
              color="primary"
              variant="outline"
              icon="i-heroicons-eye"
              block
              @click="goToPreview"
                            :disabled="!iceStore.hasData"

            >
              {{ $t('form.preview') }}
            </UButton>

            <UButton
              type="button"
              size="xl"
              color="primary"
              variant="outline"
              icon="i-heroicons-academic-cap"
              block
              :disabled="!iceStore.hasData"
              @click="goToSchool"
            >
              {{ $t('form.schoolCard') }}
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
            >
              {{ $t('form.shareLink') }}
            </UButton>

            <UButton
              type="button"
              size="xl"
              color="neutral"
              variant="outline"
              icon="i-heroicons-arrow-path"
              @click="openResetModal"
            >
              {{ $t('form.cancel') }}
            </UButton>
          </div>
        </form>
      </UCard>
    </div>

    <!-- Reset Confirmation Modal -->
    <DialogCancel
      v-model:open="isResetModalOpen"
      @confirm="handleResetConfirm"
      @cancel="handleResetCancel"
    >
      <template #title>
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-amber-500" />
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
