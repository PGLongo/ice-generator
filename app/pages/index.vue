<script setup lang="ts">
import type { School, Student, Referent } from '@/types/school'
import type { Owner, Address } from '@/types/luggage'

const { t } = useI18n()

useHead({
  title: t('landing.title'),
  meta: [
    { name: 'description', content: t('landing.description') }
  ]
})

// Example cards data
interface ExampleCard {
  type: 'school' | 'luggage'
  school?: School
  student?: Student
  referent?: Referent
  owner?: Owner
  address?: Address
}

const exampleCards: ExampleCard[] = [
  {
    type: 'school',
    school: {
      name: 'Istituto Comprensivo Leonardo da Vinci',
      address: 'Via Roma, 123',
      city: 'Milano, 20100',
      phone: '+39 02 1234567',
      logoUrl: 'https://ui-avatars.com/api/?name=LDV&size=200&background=3b82f6&color=fff&bold=true'
    },
    student: {
      name: 'Sofia Rossi',
      section: '3° B'
    },
    referent: {
      name: 'Maria Rossi',
      phone: '+39 345 1234567'
    }
  },
  {
    type: 'luggage',
    owner: {
      firstName: 'Marco',
      lastName: 'Verdi',
      phone: '+39 348 7654321'
    },
    address: {
      street: 'Via Dante, 56',
      city: 'Bologna',
      province: 'BO',
      postalCode: '40100',
      country: 'Italia'
    }
  },
  {
    type: 'school',
    school: {
      name: 'Scuola Primaria Giuseppe Verdi',
      address: 'Piazza Garibaldi, 45',
      city: 'Roma, 00100',
      phone: '+39 06 7654321',
      logoUrl: 'https://ui-avatars.com/api/?name=GV&size=200&background=10b981&color=fff&bold=true'
    },
    student: {
      name: 'Luca Bianchi',
      section: '1° A'
    },
    referent: {
      name: 'Giuseppe Bianchi',
      phone: '+39 348 9876543'
    }
  },
  {
    type: 'school',
    school: {
      name: 'Istituto Tecnico Marie Curie',
      address: 'Corso Italia, 78',
      city: 'Torino, 10100',
      phone: '+39 011 5551234',
      logoUrl: 'https://ui-avatars.com/api/?name=MC&size=200&background=8b5cf6&color=fff&bold=true'
    },
    student: {
      name: 'Emma Ferrari',
      section: '4° C'
    },
    referent: {
      name: 'Anna Ferrari',
      phone: '+39 340 1112233'
    }
  }
]
</script>

<template>
  <div class="min-h-screen overflow-hidden">
    <!-- Hero Section with Gradient Background -->
    <div class="relative bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
        </div>
      </div>

      <UContainer class="relative py-24 lg:py-32">
        <div class="text-center max-w-5xl mx-auto">
          <!-- Animated Title with Modern Effects -->
          <div class="relative mb-8">
            <div class="hero-badge mb-6">
              <UBadge variant="soft" size="lg" class="px-4 py-2 text-sm font-medium">
                {{ $t('landing.badge') }}
              </UBadge>
            </div>

            <div class="animated-title-container">
              <div class="animated-word" data-word="NFC">NFC</div>
              <div class="animated-word" data-word="QR">+ QR</div>
              <div class="animated-word" data-word="Tags">+ Tags</div>
              <div class="animated-word final-word" data-word="CareCard">
                <img src="/CareCard.svg" alt="CareCard" class="h-16 md:h-20 lg:h-24 inline-block align-middle" />
              </div>
            </div>
          </div>

          <h1 class="text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-8 font-medium">
            {{ $t('landing.subtitle') }}
          </h1>

          <p class="text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            {{ $t('landing.description') }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <UButton
              to="/form"
              size="xl"
              icon="i-heroicons-plus-circle"
              class="cta-primary px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {{ $t('landing.createCard') }}
            </UButton>

            <UButton
              to="/preview"
              variant="ghost"
              size="xl"
              icon="i-heroicons-eye"
              class="px-8 py-4 text-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300"
            >
              Vedi Anteprima
            </UButton>
          </div>

          <!-- Trust Indicators -->
          <div class="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-shield-check" class="w-4 h-4 text-green-500" ></UIcon>
              <span>100% Privacy</span>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-code-bracket" class="w-4 h-4 text-blue-500" ></UIcon>
              <span>Open Source</span>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-device-phone-mobile" class="w-4 h-4 text-purple-500" ></UIcon>
              <span>Universal</span>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-bolt" class="w-4 h-4 text-orange-500" ></UIcon>
              <span>Istantaneo</span>
            </div>
          </div>

          <!-- Example Cards Carousel with Modern Frame -->
          <div class="mt-20">
            <div class="text-center mb-12">
              <h3 class="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                {{ $t('landing.examplesTitle') || 'Esempi di Card' }}
              </h3>
              <p class="text-gray-500 dark:text-gray-400">Scopri come funziona in pratica</p>
            </div>

            <div class="relative">
              <!-- Decorative Elements -->
              <div class="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20 dark:from-blue-900/10 dark:to-purple-900/10 rounded-3xl blur-xl"></div>

              <UCarousel
                v-slot="{ item }"
                :items="exampleCards"
                arrows
                dots
                loop
                :autoplay="{ delay: 5000 }"
                class="carousel-modern w-full max-w-5xl mx-auto relative z-10"
              >
                <div class="p-6">
                  <div class="transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                    <CardSchool
                      v-if="item.type === 'school'"
                      :school="item.school"
                      :student="item.student"
                      :referent="item.referent"
                    ></CardSchool>
                    <CardLuggage
                      v-else-if="item.type === 'luggage'"
                      :owner="item.owner"
                      :address="item.address"
                    ></CardLuggage>
                  </div>
                </div>
              </UCarousel>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Story Section with Modern Layout -->
    <UContainer class="py-24 bg-white dark:bg-gray-900">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {{ $t('landing.story') }}
          </h2>
          <div class="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <div class="text-center lg:text-left">
              <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-6 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <div class="text-4xl">💡</div>
              </div>
              <blockquote class="text-xl lg:text-2xl leading-relaxed text-gray-700 dark:text-gray-300 font-light italic">
                {{ $t('landing.storyContent') }}
              </blockquote>
            </div>
          </div>

          <div class="space-y-6">
            <UCard class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl">
              <div class="p-8">
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-white" ></UIcon>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Il Problema</h3>
                </div>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {{ $t('landing.storyProblem') }}
                </p>
              </div>
            </UCard>

            <UCard class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 border-none shadow-xl">
              <div class="p-8">
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <UIcon name="i-heroicons-light-bulb" class="w-6 h-6 text-white" ></UIcon>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">La Soluzione</h3>
                </div>
                <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                  CareCard colma questa lacuna creando un ponte digitale tra localizzazione e informazioni di contatto di emergenza.
                </p>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Use Cases Section -->
        <div class="mt-16">
          <div class="text-center mb-12">
            <h3 class="text-2xl lg:text-3xl font-bold mb-6">
              {{ $t('landing.useCases') }}
            </h3>
            <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
              {{ $t('landing.useCasesDescription') }}
            </p>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Family Members -->
            <UCard class="text-center hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                <h4 class="font-semibold mb-2">{{ $t('landing.useCase1Title') }}</h4>
                <p class="text-sm text-muted-foreground">{{ $t('landing.useCase1Description') }}</p>
              </div>
            </UCard>

            <!-- Pets -->
            <UCard class="text-center hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="text-4xl mb-4">🐕</div>
                <h4 class="font-semibold mb-2">{{ $t('landing.useCase2Title') }}</h4>
                <p class="text-sm text-muted-foreground">{{ $t('landing.useCase2Description') }}</p>
              </div>
            </UCard>

            <!-- Luggage & Travel -->
            <UCard class="text-center hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="text-4xl mb-4">🧳</div>
                <h4 class="font-semibold mb-2">{{ $t('landing.useCase3Title') }}</h4>
                <p class="text-sm text-muted-foreground">{{ $t('landing.useCase3Description') }}</p>
              </div>
            </UCard>

            <!-- Valuable Objects -->
            <UCard class="text-center hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="text-4xl mb-4">💻</div>
                <h4 class="font-semibold mb-2">{{ $t('landing.useCase4Title') }}</h4>
                <p class="text-sm text-muted-foreground">{{ $t('landing.useCase4Description') }}</p>
              </div>
            </UCard>

            <!-- Medical Equipment -->
            <UCard class="text-center hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="text-4xl mb-4">♿</div>
                <h4 class="font-semibold mb-2">{{ $t('landing.useCase5Title') }}</h4>
                <p class="text-sm text-muted-foreground">{{ $t('landing.useCase5Description') }}</p>
              </div>
            </UCard>

            <!-- Work Equipment -->
            <UCard class="text-center hover:shadow-lg transition-shadow">
              <div class="p-6">
                <div class="text-4xl mb-4">🔧</div>
                <h4 class="font-semibold mb-2">{{ $t('landing.useCase6Title') }}</h4>
                <p class="text-sm text-muted-foreground">{{ $t('landing.useCase6Description') }}</p>
              </div>
            </UCard>
          </div>
        </div>
      </div>
    </UContainer>

    <!-- What is ICE Section -->
    <UContainer class="py-20">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl lg:text-4xl font-bold mb-6">
          {{ $t('landing.whatIsIce') }}
        </h2>

        <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
          {{ $t('landing.whatIsIceDescription') }}
        </p>
      </div>
    </UContainer>

    <!-- How It Works Section with Timeline -->
    <UContainer class="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {{ $t('landing.howItWorks') }}
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">Tre semplici passi per la tua sicurezza</p>
        </div>

        <div class="relative">
          <!-- Timeline Line -->
          <div class="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800 transform -translate-y-1/2 z-0"></div>

          <div class="grid lg:grid-cols-3 gap-12 relative z-10">
            <!-- Step 1 -->
            <div class="text-center group">
              <div class="relative mb-8">
                <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <UIcon name="i-heroicons-document-text" class="w-10 h-10 text-white" ></UIcon>
                </div>
                <div class="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  1
                </div>
              </div>
              <UCard class="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-none shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:bg-white dark:group-hover:bg-gray-800">
                <div class="p-8 space-y-4">
                  <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {{ $t('landing.step1Title') }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {{ $t('landing.step1Description') }}
                  </p>
                </div>
              </UCard>
            </div>

            <!-- Step 2 -->
            <div class="text-center group">
              <div class="relative mb-8">
                <div class="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <UIcon name="i-heroicons-credit-card" class="w-10 h-10 text-white" ></UIcon>
                </div>
                <div class="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  2
                </div>
              </div>
              <UCard class="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-none shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:bg-white dark:group-hover:bg-gray-800">
                <div class="p-8 space-y-4">
                  <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {{ $t('landing.step2Title') }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {{ $t('landing.step2Description') }}
                  </p>
                </div>
              </UCard>
            </div>

            <!-- Step 3 -->
            <div class="text-center group">
              <div class="relative mb-8">
                <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <UIcon name="i-heroicons-share" class="w-10 h-10 text-white" ></UIcon>
                </div>
                <div class="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  3
                </div>
              </div>
              <UCard class="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-none shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:bg-white dark:group-hover:bg-gray-800">
                <div class="p-8 space-y-4">
                  <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {{ $t('landing.step3Title') }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {{ $t('landing.step3Description') }}
                  </p>
                </div>
              </UCard>
            </div>
          </div>
        </div>
      </div>
    </UContainer>

    <!-- Features Section with Bento Grid -->
    <UContainer class="py-24 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {{ $t('landing.features') }}
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">Caratteristiche che fanno la differenza</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Feature 1 - Privacy -->
          <UCard class="group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 border-green-200 dark:border-gray-600 lg:col-span-2">
            <div class="p-8 text-center lg:text-left">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <UIcon name="i-heroicons-shield-check" class="w-8 h-8 text-white" ></UIcon>
              </div>
              <h3 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{{ $t('landing.feature1Title') }}</h3>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ $t('landing.feature1Description') }}</p>
            </div>
          </UCard>

          <!-- Feature 2 - Multiple Formats -->
          <UCard class="group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-blue-200 dark:border-gray-600">
            <div class="p-8 text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <UIcon name="i-heroicons-document-duplicate" class="w-8 h-8 text-white" ></UIcon>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">{{ $t('landing.feature2Title') }}</h3>
              <p class="text-gray-600 dark:text-gray-400">{{ $t('landing.feature2Description') }}</p>
            </div>
          </UCard>

          <!-- Feature 3 - Emergency Optimized -->
          <UCard class="group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 border-orange-200 dark:border-gray-600">
            <div class="p-8 text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 text-white" ></UIcon>
              </div>
              <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">{{ $t('landing.feature3Title') }}</h3>
              <p class="text-gray-600 dark:text-gray-400">{{ $t('landing.feature3Description') }}</p>
            </div>
          </UCard>

          <!-- Feature 4 - NFC Ready -->
          <UCard class="group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 border-purple-200 dark:border-gray-600 lg:col-span-2">
            <div class="p-8 text-center lg:text-left">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <UIcon name="i-heroicons-wifi" class="w-8 h-8 text-white" ></UIcon>
              </div>
              <h3 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{{ $t('landing.feature4Title') }}</h3>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ $t('landing.feature4Description') }}</p>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>

    <!-- Integration Section -->
    <UContainer class="py-20 bg-muted/50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-6">
            {{ $t('landing.integration') }}
          </h2>

          <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
            {{ $t('landing.integrationDescription') }}
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <!-- AirTag -->
          <UCard class="text-center hover:shadow-lg transition-shadow">
            <template #header>
              <div class="flex justify-center">
                <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <div class="text-2xl">🍎</div>
                </div>
              </div>
            </template>

            <div class="space-y-4">
              <h3 class="text-xl font-semibold">
                {{ $t('landing.airtag') }}
              </h3>
              <p class="text-muted-foreground text-sm">
                {{ $t('landing.airtagDescription') }}
              </p>
            </div>
          </UCard>

          <!-- Samsung SmartTag -->
          <UCard class="text-center hover:shadow-lg transition-shadow">
            <template #header>
              <div class="flex justify-center">
                <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <div class="text-2xl">📱</div>
                </div>
              </div>
            </template>

            <div class="space-y-4">
              <h3 class="text-xl font-semibold">
                {{ $t('landing.smarttag') }}
              </h3>
              <p class="text-muted-foreground text-sm">
                {{ $t('landing.smarttagDescription') }}
              </p>
            </div>
          </UCard>

          <!-- Tile -->
          <UCard class="text-center hover:shadow-lg transition-shadow">
            <template #header>
              <div class="flex justify-center">
                <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <div class="text-2xl">🔲</div>
                </div>
              </div>
            </template>

            <div class="space-y-4">
              <h3 class="text-xl font-semibold">
                {{ $t('landing.tile') }}
              </h3>
              <p class="text-muted-foreground text-sm">
                {{ $t('landing.tileDescription') }}
              </p>
            </div>
          </UCard>
        </div>

        <!-- Integration Benefit -->
        <UCard class="bg-gradient-to-r from-primary/10 to-info/10 border-primary/20">
          <div class="text-center p-8">
            <div class="text-4xl mb-4">🎯</div>
            <h3 class="text-2xl font-bold mb-4">
              {{ $t('landing.integrationBenefit') }}
            </h3>
            <p class="text-lg text-muted-foreground">
              {{ $t('landing.integrationBenefitDescription') }}
            </p>
          </div>
        </UCard>
      </div>
    </UContainer>

    <!-- Final CTA Section -->
    <div class="relative py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdi0yMGgtNjB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-20"></div>
      </div>

      <UContainer class="relative z-10">
        <div class="text-center max-w-4xl mx-auto">
          <h2 class="text-4xl lg:text-6xl font-bold mb-8 text-white">
            {{ $t('landing.getStarted') }}
          </h2>

          <p class="text-xl lg:text-2xl text-indigo-100 mb-12 leading-relaxed">
            {{ $t('landing.secureData') }}
          </p>

          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <UButton
              to="/form"
              size="xl"
              variant="solid"
              icon="i-heroicons-plus-circle"
              class="text-lg px-10 py-5 bg-white text-indigo-600 hover:bg-gray-50 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              {{ $t('landing.createCard') }}
            </UButton>

            <UButton
              to="https://github.com/PGLongo/ice-generator"
              target="_blank"
              size="xl"
              variant="outline"
              icon="i-heroicons-code-bracket"
              class="text-lg px-10 py-5 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Codice Sorgente
            </UButton>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20">
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2">100%</div>
              <div class="text-indigo-200">Privacy</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2">0€</div>
              <div class="text-indigo-200">Costo</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2">Open</div>
              <div class="text-indigo-200">Source</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2">∞</div>
              <div class="text-indigo-200">Usi</div>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Footer Info -->
    <UContainer class="py-12 border-t">
      <div class="text-center space-y-4">
        <p class="text-sm text-muted-foreground">
          {{ $t('landing.madeWith') }}
          <UButton
            to="https://nuxt.com"
            target="_blank"
            variant="link"
            size="sm"
            class="p-0 h-auto"
          >
            Nuxt
          </UButton>
          {{ $t('common.loading') ? ' & ' : ' & ' }}
          <UButton
            to="https://ui.nuxt.com"
            target="_blank"
            variant="link"
            size="sm"
            class="p-0 h-auto"
          >
            Nuxt UI
          </UButton>
        </p>

        <p class="text-sm text-muted-foreground">
          {{ $t('landing.openSource') }}
        </p>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
/* Floating Shapes Animation */
.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.shape {
  position: absolute;
  opacity: 0.1;
  animation: float 20s infinite linear;
}

.shape-1 {
  top: 20%;
  left: 10%;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  animation-delay: 0s;
}

.shape-2 {
  top: 60%;
  right: 10%;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #10b981, #06b6d4);
  border-radius: 20px;
  animation-delay: 5s;
}

.shape-3 {
  top: 10%;
  right: 20%;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  border-radius: 10px;
  animation-delay: 10s;
}

.shape-4 {
  bottom: 20%;
  left: 20%;
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border-radius: 30px;
  animation-delay: 15s;
}

@keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
  }
  50% {
    transform: translateY(-40px) rotate(180deg);
  }
  75% {
    transform: translateY(-20px) rotate(270deg);
  }
  100% {
    transform: translateY(0px) rotate(360deg);
  }
}

/* Hero Badge Animation */
.hero-badge {
  animation: badgeFloat 3s ease-in-out infinite;
}

@keyframes badgeFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* CTA Primary Button */
.cta-primary {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border: none;
  position: relative;
  overflow: hidden;
}

.cta-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.cta-primary:hover::before {
  left: 100%;
}

/* Animated Title */
.animated-title-container {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 3.5rem;
  font-weight: bold;
  line-height: 1;
}

@media (min-width: 1024px) {
  .animated-title-container {
    font-size: 6rem;
    height: 140px;
  }
}

/* Carousel Modern Styling */
.carousel-modern {
  position: relative;
}

.carousel-modern::before {
  content: '';
  position: absolute;
  inset: -20px;
  background: linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent, rgba(139, 92, 246, 0.1), transparent);
  border-radius: 2rem;
  z-index: -1;
  animation: shimmer 8s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animated-word {
  position: absolute;
  opacity: 0;
  transform: translateY(20px) scale(0.8);
  animation: wordFlow 8s infinite;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 300% 300%;
  animation: wordFlow 8s infinite, gradientShift 3s ease-in-out infinite;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.animated-word[data-word="NFC"] {
  animation-delay: 0s;
}

.animated-word[data-word="QR"] {
  animation-delay: 1.6s;
}

.animated-word[data-word="Tags"] {
  animation-delay: 3.2s;
}

.animated-word.final-word[data-word="CareCard"] {
  animation-delay: 4.8s;
  background: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 300% 300%;
}

@keyframes wordFlow {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
  }
  12.5% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  25% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  37.5% {
    opacity: 0;
    transform: translateY(-30px) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translateY(-30px) scale(0.8);
  }
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Final word stays visible */
.final-word {
  animation: finalWordFlow 8s infinite !important;
}

@keyframes finalWordFlow {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
  }
  80% {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
  }
  87.5% {
    opacity: 1;
    transform: translateY(0) scale(1.1);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Card Hover Effects */
@media (hover: hover) {
  .group:hover .shape {
    animation-play-state: paused;
  }
}

/* Scroll Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in {
  animation: slideInUp 0.8s ease-out;
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .animated-word {
    background: linear-gradient(135deg, #60a5fa, #a78bfa, #22d3ee);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .final-word {
    background: linear-gradient(135deg, #34d399, #60a5fa, #a78bfa);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .floating-shapes .shape {
    opacity: 0.05;
  }
}
</style>
