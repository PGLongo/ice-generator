<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('landing.title'),
  meta: [
    { name: 'description', content: t('landing.description') }
  ]
})

const features = computed(() => [
  {
    icon: 'i-lucide-shield-check',
    title: t('landing.feature1Title'),
    description: t('landing.feature1Description')
  },
  {
    icon: 'i-lucide-file-output',
    title: t('landing.feature2Title'),
    description: t('landing.feature2Description')
  },
  {
    icon: 'i-lucide-nfc',
    title: t('landing.feature4Title'),
    description: t('landing.feature4Description')
  }
])

const steps = computed(() => [
  {
    number: 1,
    title: t('landing.step1Title'),
    description: t('landing.step1Description'),
    icon: 'i-lucide-clipboard-edit'
  },
  {
    number: 2,
    title: t('landing.step2Title'),
    description: t('landing.step2Description'),
    icon: 'i-lucide-credit-card'
  },
  {
    number: 3,
    title: t('landing.step3Title'),
    description: t('landing.step3Description'),
    icon: 'i-lucide-share-2'
  }
])

const useCases = computed(() => [
  {
    emoji: '👨‍👩‍👧‍👦',
    title: t('landing.useCase1Title'),
    description: t('landing.useCase1Description')
  },
  {
    emoji: '🐕',
    title: t('landing.useCase2Title'),
    description: t('landing.useCase2Description')
  },
  {
    emoji: '🧳',
    title: t('landing.useCase3Title'),
    description: t('landing.useCase3Description')
  }
])
</script>

<template>
  <div class="relative">
    <!-- Hero Section -->
    <div class="hidden lg:block">
      <UColorModeImage
        light="/images/light/line-1.svg"
        dark="/images/dark/line-1.svg"
        class="absolute pointer-events-none left-0 top-0 object-cover h-[650px]"
      />
    </div>

    <section class="relative pt-16 md:pt-24 lg:pt-32 pb-16">
      <LandingHeroBackground />

      <UContainer class="relative z-10">
        <div class="text-center max-w-4xl mx-auto">
          <!-- Badge -->
          <UBadge
            variant="subtle"
            size="lg"
            class="mb-6"
          >
            {{ $t('landing.badge') }}
          </UBadge>

          <!-- Title -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {{ $t('app.title') }}
          </h1>

          <!-- Subtitle -->
          <p class="text-xl md:text-2xl text-muted mb-4">
            {{ $t('app.tagline') }}
          </p>

          <!-- Description -->
          <p class="text-lg text-muted/80 mb-10 max-w-2xl mx-auto">
            {{ $t('landing.description') }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <UButton
              to="/form"
              size="xl"
              icon="i-lucide-plus-circle"
            >
              {{ $t('landing.createCard') }}
            </UButton>

            <UButton
              to="/preview"
              variant="outline"
              size="xl"
              icon="i-lucide-eye"
            >
              {{ $t('form.preview') }}
            </UButton>
          </div>

          <!-- Trust Indicators -->
          <div class="flex flex-wrap justify-center items-center gap-6 text-sm text-muted">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-green-500" />
              <span>100% Privacy</span>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-github" class="w-4 h-4 text-primary" />
              <span>Open Source</span>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-smartphone" class="w-4 h-4 text-purple-500" />
              <span>Universal</span>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Separator -->
    <USeparator :ui="{ border: 'border-primary/20' }" />

    <!-- Features Section -->
    <section class="relative py-20 overflow-hidden">
      <div class="absolute rounded-full -left-10 top-10 size-[300px] z-0 bg-primary opacity-10 blur-[150px]" />
      <div class="absolute rounded-full -right-10 -bottom-10 size-[300px] z-0 bg-primary opacity-10 blur-[150px]" />

      <UContainer class="relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            {{ $t('landing.features') }}
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <UCard
            v-for="feature in features"
            :key="feature.title"
            class="text-center"
            :ui="{ body: 'p-6' }"
          >
            <div class="flex justify-center mb-4">
              <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <UIcon :name="feature.icon" class="w-7 h-7 text-primary" />
              </div>
            </div>
            <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-muted">{{ feature.description }}</p>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Separator -->
    <USeparator :ui="{ border: 'border-primary/20' }" />

    <!-- How It Works Section -->
    <section class="relative py-20">
      <template v-if="false">
        <UColorModeImage
          light="/images/light/line-3.svg"
          dark="/images/dark/line-3.svg"
          class="absolute -top-10 sm:top-0 right-1/2 h-24"
        />
      </template>

      <UContainer>
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            {{ $t('landing.howItWorks') }}
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <UCard
            v-for="step in steps"
            :key="step.number"
            :ui="{ body: 'p-6' }"
          >
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                {{ step.number }}
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-2">{{ step.title }}</h3>
                <p class="text-sm text-muted">{{ step.description }}</p>
              </div>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Separator -->
    <USeparator :ui="{ border: 'border-primary/20' }" />

    <!-- Use Cases Section (Condensed) -->
    <section class="py-20">
      <UContainer>
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            {{ $t('landing.useCases') }}
          </h2>
          <p class="text-muted max-w-2xl mx-auto">
            {{ $t('landing.useCasesDescription') }}
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard
            v-for="useCase in useCases"
            :key="useCase.title"
            class="text-center"
            :ui="{ body: 'p-6' }"
          >
            <div class="text-4xl mb-4">{{ useCase.emoji }}</div>
            <h3 class="font-semibold mb-2">{{ useCase.title }}</h3>
            <p class="text-sm text-muted">{{ useCase.description }}</p>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- CTA Section -->
    <section class="relative py-24 overflow-hidden">
      <LandingStarsBg />

      <UContainer class="relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {{ $t('landing.getStarted') }}
          </h2>

          <p class="text-lg text-muted mb-10">
            {{ $t('landing.secureData') }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton
              to="/form"
              size="xl"
              icon="i-lucide-plus-circle"
            >
              {{ $t('landing.createCard') }}
            </UButton>

            <UButton
              to="https://github.com/PGLongo/ice-generator"
              target="_blank"
              variant="outline"
              size="xl"
              icon="i-lucide-github"
            >
              GitHub
            </UButton>
          </div>

          <p class="text-sm text-muted mt-8">
            {{ $t('landing.openSource') }}
          </p>
        </div>
      </UContainer>
    </section>
  </div>
</template>
