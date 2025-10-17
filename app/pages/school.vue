<script setup lang="ts">
import { useIceStore } from '@/stores/ice'
import { useQRCode } from '@vueuse/integrations/useQRCode'

const { t } = useI18n()
const route = useRoute()
const iceStore = useIceStore()
const { decodeData } = useIceUrlShare()

// Load data from URL query params on mount
onMounted(() => {
  const dataParam = route.query.data as string
  if (dataParam) {
    try {
      const decodedData = decodeData(dataParam)
      if (decodedData) {
        iceStore.data = decodedData
      }
    } catch (error) {
      console.error('Failed to load data from URL:', error)
    }
  }
})

const hasSchoolData = computed(() => {
  return iceStore.data.school && (
    iceStore.data.school.name ||
    iceStore.data.school.address ||
    iceStore.data.school.city ||
    iceStore.data.school.phone ||
    iceStore.data.school.logoUrl
  )
})

const hasStudentData = computed(() => {
  return iceStore.data.name || iceStore.data.section
})

// Generate QR code for calling referent
const qrCodeValue = computed(() => {
  const phone = iceStore.data.school?.referentPhone
  if (!phone) return ''
  return `tel:${phone.replace(/\s+/g, '')}`
})

const qrCode = useQRCode(qrCodeValue, {
  margin: 1,
  width: 120,
  errorCorrectionLevel: 'M'
})

const printCard = () => {
  window.print()
}
</script>

<template>
  <UContainer class="py-12">
    <div class="max-w-6xl mx-auto">
      <!-- Header con pulsanti (solo su schermo, nascosto nella stampa) -->
      <div class="mb-8 flex justify-between items-center print:hidden">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ $t('school.title') }}
          </h1>
          <p class="text-gray-500 dark:text-gray-400 mt-2">
            {{ $t('school.subtitle') }}
          </p>
        </div>
        <div class="flex gap-3">
          <UButton
            to="/"
            color="neutral"
            variant="outline"
            icon="i-heroicons-arrow-left"
            size="lg"
          >
            {{ $t('preview.back') }}
          </UButton>
          <UButton
            icon="i-heroicons-printer"
            color="primary"
            size="lg"
            @click="printCard"
          >
            {{ $t('school.print') }}
          </UButton>
        </div>
      </div>

      <!-- Card biglietto scuola -->
      <UCard v-if="hasSchoolData || hasStudentData" id="school-card-content" class="school-card">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 min-h-[400px]">
          <!-- Sezione Sinistra: Dati Scuola -->
          <div class="flex flex-col items-center justify-center text-center border-r border-gray-200 dark:border-gray-700 pr-6">
            <!-- Logo Scuola -->
            <div v-if="iceStore.data.school?.logoUrl" class="mb-4">
              <img
                :src="iceStore.data.school.logoUrl"
                alt="School Logo"
                class="w-24 h-24 object-contain"
              >
            </div>

            <!-- Nome Scuola -->
            <h2 v-if="iceStore.data.school?.name" class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {{ iceStore.data.school.name }}
            </h2>

            <!-- Indirizzo -->
            <div v-if="iceStore.data.school?.address || iceStore.data.school?.city" class="mb-3">
              <div class="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                <UIcon name="i-heroicons-map-pin" class="text-lg" />
                <div>
                  <p v-if="iceStore.data.school?.address" class="text-base">
                    {{ iceStore.data.school.address }}
                  </p>
                  <p v-if="iceStore.data.school?.city" class="text-base">
                    {{ iceStore.data.school.city }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Telefono Scuola -->
            <div v-if="iceStore.data.school?.phone" class="mb-2">
              <div class="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                <UIcon name="i-heroicons-phone" class="text-lg" />
                <a :href="`tel:${iceStore.data.school.phone.replace(/\s+/g, '')}`" class="text-base font-semibold hover:text-primary">
                  {{ iceStore.data.school.phone }}
                </a>
              </div>
            </div>
          </div>

          <!-- Sezione Destra: Dati Bambino -->
          <div class="flex flex-col justify-center pl-6 space-y-5">
            <!-- Nome Bambino -->
            <div v-if="iceStore.data.name">
              <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                {{ $t('school.studentName') }}
              </label>
              <p class="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {{ iceStore.data.name }}
              </p>
            </div>

            <!-- Sezione -->
            <div v-if="iceStore.data.section">
              <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                {{ $t('school.section') }}
              </label>
              <p class="text-3xl font-bold text-primary">
                {{ iceStore.data.section }}
              </p>
            </div>

            <UDivider />

            <!-- Referente con QR Code -->
            <div v-if="iceStore.data.school?.referentName || iceStore.data.school?.referentPhone" class="flex gap-4 items-start">
              <!-- Dati referente -->
              <div class="flex-1">
                <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                  {{ $t('school.referent') }}
                </label>
                <div class="space-y-2">
                  <div v-if="iceStore.data.school?.referentName" class="flex items-center gap-2">
                    <UIcon name="i-heroicons-user" class="text-xl text-gray-400" />
                    <p class="text-lg font-semibold text-gray-900 dark:text-white">
                      {{ iceStore.data.school.referentName }}
                    </p>
                  </div>
                  <div v-if="iceStore.data.school?.referentPhone" class="flex items-center gap-2">
                    <UIcon name="i-heroicons-phone" class="text-xl text-gray-400" />
                    <a :href="`tel:${iceStore.data.school.referentPhone.replace(/\s+/g, '')}`" class="text-lg font-semibold text-primary hover:underline">
                      {{ iceStore.data.school.referentPhone }}
                    </a>
                  </div>
                </div>
              </div>

              <!-- QR Code -->
              <div v-if="iceStore.data.school?.referentPhone" class="flex-shrink-0">
                <img :src="qrCode" alt="QR Code to call referent" class="w-24 h-24 border-2 border-gray-300 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Messaggio nessun dato -->
      <UCard v-else>
        <div class="text-center py-12">
          <UIcon name="i-heroicons-academic-cap" class="text-6xl text-gray-300 dark:text-gray-600 mb-4 mx-auto" />
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {{ $t('school.noData') }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400 mb-6">
            {{ $t('school.noDataDescription') }}
          </p>
          <UButton to="/" icon="i-heroicons-arrow-left">
            {{ $t('school.goToForm') }}
          </UButton>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<style scoped>
/* Styling per migliore presentazione */
.school-card {
  max-width: 900px;
  margin: 0 auto;
}

@media print {
  /* Rimuovi limite max-width in stampa */
  .school-card {
    max-width: none !important;
    width: 100% !important;
    margin: 0 !important;
  }
  /* Formato A4 orizzontale */
  @page {
    size: A4 landscape;
    margin: 1cm;
  }

  /* Reset completo */
  html, body {
    background: white !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Nascondi tutto tranne la card */
  body > *:not(#school-card-content) {
    display: none !important;
  }

  /* Container della card */
  #school-card-content {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: white !important;
    box-shadow: none !important;
    border: none !important;
    margin: 0 !important;
    padding: 1cm !important;
  }

  /* Nascondi contenitore Nuxt UI */
  #school-card-content :deep(.max-w-6xl) {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /* La card interna con bordo */
  #school-card-content,
  #school-card-content > *,
  .school-card {
    box-shadow: none !important;
  }

  /* Il contenitore interno della grid con il bordo */
  #school-card-content :deep(.grid) {
    display: grid !important;
    grid-template-columns: 0.85fr 1.15fr !important;
    gap: 3rem !important;
    width: 100% !important;
    max-width: 100% !important;
    min-height: auto !important;
    border: 3px solid #000000 !important;
    padding: 2.5rem 3rem !important;
    border-radius: 12px !important;
    background: white !important;
  }

  /* Logo */
  #school-card-content :deep(img) {
    width: 140px !important;
    height: 140px !important;
  }

  /* Testo tutto nero */
  #school-card-content,
  #school-card-content *,
  #school-card-content :deep(*) {
    color: #000000 !important;
  }

  /* Nome scuola */
  #school-card-content :deep(h2) {
    font-size: 2rem !important;
    color: #000000 !important;
    font-weight: 700 !important;
    margin-bottom: 1rem !important;
  }

  /* Nome bambino grande - usa più spazio */
  #school-card-content :deep(p.text-4xl) {
    font-size: 3.5rem !important;
    color: #000000 !important;
    font-weight: 700 !important;
    line-height: 1.1 !important;
  }

  /* Sezione */
  #school-card-content :deep(p.text-3xl) {
    font-size: 2.75rem !important;
    color: #000000 !important;
    font-weight: 700 !important;
  }

  /* Labels */
  #school-card-content :deep(label) {
    font-size: 0.7rem !important;
    color: #666666 !important;
    text-transform: uppercase !important;
  }

  /* Testo normale */
  #school-card-content :deep(p) {
    color: #000000 !important;
  }

  /* Testo nella colonna sinistra più piccolo */
  #school-card-content :deep(.border-r p) {
    font-size: 0.95rem !important;
  }

  /* Link e telefoni */
  #school-card-content :deep(a) {
    color: #00dc82 !important;
    text-decoration: none !important;
    font-size: 1.1rem !important;
  }

  /* Bordo divisorio */
  #school-card-content :deep(.border-r) {
    border-right: 2px solid #e5e7eb !important;
    padding-right: 1rem !important;
  }

  /* Divider */
  #school-card-content :deep(hr) {
    border-color: #e5e7eb !important;
    margin: 1rem 0 !important;
  }

  /* Spazi nella parte destra */
  #school-card-content :deep(.space-y-5 > *) {
    margin-top: 1.25rem !important;
  }

  /* QR Code in stampa */
  #school-card-content :deep(.absolute.top-0.right-0) {
    display: block !important;
  }

  #school-card-content :deep(.absolute.top-0.right-0 img) {
    width: 100px !important;
    height: 100px !important;
    border: 2px solid #000000 !important;
    border-radius: 8px !important;
  }

  /* Forza stampa colori */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
}
</style>
