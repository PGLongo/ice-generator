<template>
  <UContainer class="py-12">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold">{{ $t('preview.title') }}</h1>
          <p class="text-gray-500 mt-1">{{ $t('preview.subtitle') }}</p>
        </div>
        <UButton
          icon="i-heroicons-arrow-left"
          variant="outline"
          @click="goBack"
        >
          {{ $t('preview.back') }}
        </UButton>
      </div>

      <div v-if="!hasData" class="text-center py-12">
        <p class="text-gray-500 mb-4">{{ $t('preview.noData') }}</p>
        <UButton
          icon="i-heroicons-plus"
          @click="navigateTo('/')"
        >
          {{ $t('preview.createCard') }}
        </UButton>
      </div>

      <div v-else class="space-y-4">
        <div class="flex gap-3">
          <UButton
            icon="i-heroicons-arrow-down-tray"
            color="primary"
            @click="downloadCard"
          >
            {{ $t('preview.download') }}
          </UButton>
          <UButton
            icon="i-heroicons-arrow-path"
            variant="outline"
            @click="refreshPreview"
          >
            {{ $t('preview.refresh') }}
          </UButton>
        </div>

        <UCard>
          <iframe
            ref="previewFrame"
            :srcdoc="htmlContent"
            class="w-full border-0 rounded-lg"
            style="min-height: 600px;"
            @load="adjustIframeHeight"
          />
        </UCard>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { useIceStore } from '@/stores/ice'

const { t } = useI18n()
const toast = useToast()
const iceStore = useIceStore()
const { generateHTML, downloadHTML } = useIceExport()

const previewFrame = ref<HTMLIFrameElement>()
const htmlContent = ref('')

const hasData = computed(() => iceStore.hasData)

onMounted(() => {
  if (iceStore.hasData) {
    generatePreview()
  }
})

// Watch for changes in store data and regenerate preview
watch(() => iceStore.data, () => {
  if (iceStore.hasData) {
    generatePreview()
    nextTick(() => {
      adjustIframeHeight()
    })
  }
}, { deep: true })

const generatePreview = () => {
  htmlContent.value = generateHTML(iceStore.data)
}

const adjustIframeHeight = () => {
  if (previewFrame.value?.contentWindow?.document.body) {
    const height = previewFrame.value.contentWindow.document.body.scrollHeight
    previewFrame.value.style.height = `${height + 40}px`
  }
}

const refreshPreview = () => {
  generatePreview()
  nextTick(() => {
    adjustIframeHeight()
  })
  toast.add({
    title: t('preview.refreshed'),
    color: 'green',
    timeout: 2000
  })
}

const downloadCard = () => {
  downloadHTML(iceStore.data)
  toast.add({
    title: t('preview.downloaded'),
    description: t('preview.downloadedMessage'),
    color: 'green',
    timeout: 3000
  })
}

const goBack = () => {
  navigateTo('/')
}
</script>
