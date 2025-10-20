<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('landing.title'),
  meta: [
    { name: 'description', content: t('landing.description') }
  ]
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <UContainer class="py-24">
      <div class="text-center max-w-4xl mx-auto">
        <!-- Animated Title Transition -->
        <div class="relative mb-8">
          <div class="animated-title-container">
            <div class="animated-word" data-word="ICE">ICE</div>
            <div class="animated-word" data-word="NFC">+ NFC</div>
            <div class="animated-word" data-word="QR">+ QR</div>
            <div class="animated-word" data-word="Tags">+ Tags</div>
            <div class="animated-word final-word" data-word="SmICE">SmICE</div>
          </div>
        </div>

        <p class="text-xl lg:text-2xl text-muted mb-8">
          {{ $t('landing.subtitle') }}
        </p>

        <p class="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          {{ $t('landing.description') }}
        </p>
      </div>
    </UContainer>

    <!-- Story Section -->
    <UContainer class="py-20 bg-muted/50">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold mb-6">
            {{ $t('landing.story') }}
          </h2>
        </div>

        <UCard class="mb-8">
          <div class="text-center p-6">
            <div class="text-6xl mb-4">💡</div>
            <blockquote class="text-xl italic text-muted-foreground mb-6 leading-relaxed">
              {{ $t('landing.storyContent') }}
            </blockquote>
            <p class="text-lg text-muted-foreground">
              {{ $t('landing.storyProblem') }}
            </p>
          </div>
        </UCard>

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

    <!-- How It Works Section -->
    <UContainer class="py-20">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl lg:text-4xl font-bold text-center mb-16">
          {{ $t('landing.howItWorks') }}
        </h2>

        <div class="grid md:grid-cols-3 gap-8">
          <UCard class="text-center">
            <template #header>
              <div class="flex justify-center">
                <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <UIcon name="i-heroicons-document-text" class="w-8 h-8 text-primary" ></UIcon>
                </div>
              </div>
            </template>

            <div class="space-y-4">
              <h3 class="text-xl font-semibold">
                {{ $t('landing.step1Title') }}
              </h3>
              <p class="text-muted-foreground">
                {{ $t('landing.step1Description') }}
              </p>
            </div>
          </UCard>

          <UCard class="text-center">
            <template #header>
              <div class="flex justify-center">
                <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <UIcon name="i-heroicons-credit-card" class="w-8 h-8 text-primary" ></UIcon>
                </div>
              </div>
            </template>

            <div class="space-y-4">
              <h3 class="text-xl font-semibold">
                {{ $t('landing.step2Title') }}
              </h3>
              <p class="text-muted-foreground">
                {{ $t('landing.step2Description') }}
              </p>
            </div>
          </UCard>

          <UCard class="text-center">
            <template #header>
              <div class="flex justify-center">
                <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <UIcon name="i-heroicons-share" class="w-8 h-8 text-primary" ></UIcon>
                </div>
              </div>
            </template>

            <div class="space-y-4">
              <h3 class="text-xl font-semibold">
                {{ $t('landing.step3Title') }}
              </h3>
              <p class="text-muted-foreground">
                {{ $t('landing.step3Description') }}
              </p>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>

    <!-- Features Section -->
    <UContainer class="py-20 bg-muted/50">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl lg:text-4xl font-bold text-center mb-16">
          {{ $t('landing.features') }}
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center space-y-4">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto">
              <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-green-600 dark:text-green-400" ></UIcon>
            </div>
            <h3 class="font-semibold">{{ $t('landing.feature1Title') }}</h3>
            <p class="text-sm text-muted-foreground">{{ $t('landing.feature1Description') }}</p>
          </div>

          <div class="text-center space-y-4">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto">
              <UIcon name="i-heroicons-document-duplicate" class="w-6 h-6 text-blue-600 dark:text-blue-400" ></UIcon>
            </div>
            <h3 class="font-semibold">{{ $t('landing.feature2Title') }}</h3>
            <p class="text-sm text-muted-foreground">{{ $t('landing.feature2Description') }}</p>
          </div>

          <div class="text-center space-y-4">
            <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mx-auto">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-red-600 dark:text-red-400" ></UIcon>
            </div>
            <h3 class="font-semibold">{{ $t('landing.feature3Title') }}</h3>
            <p class="text-sm text-muted-foreground">{{ $t('landing.feature3Description') }}</p>
          </div>

          <div class="text-center space-y-4">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto">
              <UIcon name="i-heroicons-wifi" class="w-6 h-6 text-purple-600 dark:text-purple-400" ></UIcon>
            </div>
            <h3 class="font-semibold">{{ $t('landing.feature4Title') }}</h3>
            <p class="text-sm text-muted-foreground">{{ $t('landing.feature4Description') }}</p>
          </div>
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

    <!-- CTA Section -->
    <UContainer class="py-24">
      <div class="text-center max-w-2xl mx-auto">
        <h2 class="text-3xl lg:text-4xl font-bold mb-6">
          {{ $t('landing.getStarted') }}
        </h2>

        <p class="text-lg text-muted-foreground mb-8">
          {{ $t('landing.secureData') }}
        </p>

        <UButton
          to="/form"
          size="xl"
          icon="i-heroicons-plus-circle"
          class="text-lg px-8 py-4"
        >
          {{ $t('landing.createCard') }}
        </UButton>
      </div>
    </UContainer>

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
.animated-title-container {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 4rem;
  font-weight: bold;
  line-height: 1;
}

@media (min-width: 1024px) {
  .animated-title-container {
    font-size: 6rem;
    height: 140px;
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
}

.animated-word[data-word="ICE"] {
  animation-delay: 0s;
}

.animated-word[data-word="NFC"] {
  animation-delay: 1.6s;
}

.animated-word[data-word="QR"] {
  animation-delay: 3.2s;
}

.animated-word[data-word="Tags"] {
  animation-delay: 4.8s;
}

.animated-word.final-word[data-word="SmICE"] {
  animation-delay: 6.4s;
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
}
</style>
