<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const { t } = useI18n()
const colorMode = useColorMode()

// Force dark mode for presentation
colorMode.preference = 'dark'

useHead({
  title: 'CareCard - Presentation',
  meta: [
    { name: 'description', content: t('landing.description') }
  ],
  htmlAttrs: {
    class: 'dark'
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
    <!-- Hero Section - No Animation, Centered -->
    <UContainer class="py-12 md:py-16">
      <div class="text-center max-w-4xl mx-auto space-y-4 md:space-y-6">
        <!-- Static Title (no animation) -->
        <div class="relative">
          <h1 class="presentation-title">
            CareCard
          </h1>
        </div>

        <p class="text-xl lg:text-2xl text-muted">
          {{ $t('landing.subtitle') }}
        </p>

        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          {{ $t('landing.description') }}
        </p>

        <!-- Optional: Show key features in compact form -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
          <div class="text-center space-y-2">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto">
              <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-green-600 dark:text-green-400" ></UIcon>
            </div>
            <p class="text-sm font-semibold">{{ $t('landing.feature1Title') }}</p>
          </div>

          <div class="text-center space-y-2">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto">
              <UIcon name="i-heroicons-document-duplicate" class="w-6 h-6 text-blue-600 dark:text-blue-400" ></UIcon>
            </div>
            <p class="text-sm font-semibold">{{ $t('landing.feature2Title') }}</p>
          </div>

          <div class="text-center space-y-2">
            <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mx-auto">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-red-600 dark:text-red-400" ></UIcon>
            </div>
            <p class="text-sm font-semibold">{{ $t('landing.feature3Title') }}</p>
          </div>

          <div class="text-center space-y-2">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto">
              <UIcon name="i-heroicons-wifi" class="w-6 h-6 text-purple-600 dark:text-purple-400" ></UIcon>
            </div>
            <p class="text-sm font-semibold">{{ $t('landing.feature4Title') }}</p>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style>
/* Hide header and footer in presentation mode */
.print\:hidden {
  display: none !important;
}

/* Hide scrollbars completely - all browsers */
html {
  overflow: hidden !important;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

html::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

body {
  overflow: hidden !important;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

body::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

/* Ensure Nuxt container doesn't create scrollbars */
#__nuxt {
  overflow: hidden !important;
  max-height: 100vh !important;
}
</style>

<style scoped>
/* Static presentation title - no animation */
.presentation-title {
  font-size: 5rem;
  font-weight: bold;
  line-height: 1;
  background: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 300% 300%;
  animation: gradientShift 3s ease-in-out infinite;
}

@media (min-width: 1024px) {
  .presentation-title {
    font-size: 8rem;
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

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .presentation-title {
    background: linear-gradient(135deg, #34d399, #60a5fa, #a78bfa);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
