<script setup lang="ts">
import type { School, Student, Referent } from '@/types/school'

const props = defineProps<{
  school?: School
  student?: Student
  referent?: Referent
}>()

const { tel } = useHref()
const { generatePhoneQR } = useQRCode()

// Format phone numbers for tel: links
const schoolPhoneLink = computed(() => tel(props.school?.phone))
const referentPhoneLink = computed(() => tel(props.referent?.phone))

// Generate QR code for calling referent (reactive)
const referentPhoneRef = computed(() => props.referent?.phone || '')
const qrCode = generatePhoneQR(referentPhoneRef)

// Check if we have any data to display
const hasSchoolData = computed(() => {
  return props.school && (
    props.school.name ||
    props.school.address ||
    props.school.city ||
    props.school.phone ||
    props.school.logoUrl
  )
})

const hasStudentData = computed(() => {
  return props.student && (props.student.name || props.student.section)
})

const hasData = computed(() => hasSchoolData.value || hasStudentData.value)
</script>

<template>
  <UCard v-if="hasData" id="school-card-content" class="school-card">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 h-[400px]">
      <!-- Sezione Sinistra: Dati Scuola -->
      <div class="flex flex-col items-center justify-center text-center border-r border-gray-200 dark:border-gray-700 pr-6">
        <!-- Logo Scuola -->
        <div v-if="school?.logoUrl" class="mb-4">
          <img
            :src="school.logoUrl"
            alt="School Logo"
            class="w-24 h-24 object-contain"
          />
        </div>

        <!-- Nome Scuola -->
        <h2 v-if="school?.name" class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {{ school.name }}
        </h2>

        <!-- Indirizzo -->
        <div v-if="school?.address || school?.city" class="mb-3">
          <div class="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
            <UIcon name="i-heroicons-map-pin" class="text-lg" ></UIcon>
            <div>
              <p v-if="school.address" class="text-base">
                {{ school.address }}
              </p>
              <p v-if="school.city" class="text-base">
                {{ school.city }}
              </p>
            </div>
          </div>
        </div>

        <!-- Telefono Scuola -->
        <div v-if="school?.phone" class="mb-2">
          <div class="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
            <UIcon name="i-heroicons-phone" class="text-lg" ></UIcon>
            <a :href="schoolPhoneLink" class="text-base font-semibold hover:text-primary">
              {{ school.phone }}
            </a>
          </div>
        </div>
      </div>

      <!-- Sezione Destra: Dati Bambino -->
      <div class="flex flex-col justify-center pl-6 space-y-5">
        <!-- Nome Bambino -->
        <div v-if="student?.name">
          <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
            {{ $t('school.studentName') }}
          </label>
          <p class="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            {{ student.name }}
          </p>
        </div>

        <!-- Sezione -->
        <div v-if="student?.section">
          <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
            {{ $t('school.section') }}
          </label>
          <p class="text-3xl font-bold text-primary">
            {{ student.section }}
          </p>
        </div>

        <USeparator ></USeparator>

        <!-- Referente con QR Code -->
        <div v-if="referent?.name || referent?.phone" class="flex gap-4 items-start">
          <!-- Dati referente -->
          <div class="flex-1">
            <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
              {{ $t('school.referent') }}
            </label>
            <div class="space-y-2">
              <div v-if="referent.name" class="flex items-center gap-2">
                <UIcon name="i-heroicons-user" class="text-xl text-gray-400" ></UIcon>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ referent.name }}
                </p>
              </div>
              <div v-if="referent.phone" class="flex items-center gap-2">
                <UIcon name="i-heroicons-phone" class="text-xl text-gray-400" ></UIcon>
                <a :href="referentPhoneLink" class="text-lg font-semibold text-primary hover:underline">
                  {{ referent.phone }}
                </a>
              </div>
            </div>
          </div>

          <!-- QR Code -->
          <div v-if="referent.phone" class="flex-shrink-0">
            <img :src="qrCode" alt="QR Code to call referent" class="w-24 h-24 border-2 border-gray-300 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </UCard>

  <!-- Messaggio nessun dato -->
  <UCard v-else>
    <div class="text-center py-12">
      <UIcon name="i-heroicons-academic-cap" class="text-6xl text-gray-300 dark:text-gray-600 mb-4 mx-auto" ></UIcon>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {{ $t('school.noData') }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400 mb-6">
        {{ $t('school.noDataDescription') }}
      </p>
      <UButton to="/form" icon="i-heroicons-arrow-left">
        {{ $t('school.goToForm') }}
      </UButton>
    </div>
  </UCard>
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
