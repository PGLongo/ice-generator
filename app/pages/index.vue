<script setup lang="ts">
definePageMeta({ layout: 'landing' })

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
    description: t('landing.feature1Description'),
    accent: 'emerald'
  },
  {
    icon: 'i-lucide-file-output',
    title: t('landing.feature2Title'),
    description: t('landing.feature2Description'),
    accent: 'blue'
  },
  {
    icon: 'i-lucide-zap',
    title: t('landing.feature3Title'),
    description: t('landing.feature3Description'),
    accent: 'amber'
  },
  {
    icon: 'i-lucide-nfc',
    title: t('landing.feature4Title'),
    description: t('landing.feature4Description'),
    accent: 'violet'
  },
  {
    icon: 'i-lucide-smartphone',
    title: t('landing.feature5Title'),
    description: t('landing.feature5Description'),
    accent: 'cyan'
  },
  {
    icon: 'i-lucide-phone-call',
    title: t('landing.feature6Title'),
    description: t('landing.feature6Description'),
    accent: 'rose'
  }
])

const steps = computed(() => [
  {
    number: '01',
    title: t('landing.step1Title'),
    description: t('landing.step1Description'),
    icon: 'i-lucide-clipboard-edit',
    details: [
      t('landing.step1Detail1'),
      t('landing.step1Detail2'),
      t('landing.step1Detail3')
    ]
  },
  {
    number: '02',
    title: t('landing.step2Title'),
    description: t('landing.step2Description'),
    icon: 'i-lucide-credit-card',
    details: [
      t('landing.step2Detail1'),
      t('landing.step2Detail2'),
      t('landing.step2Detail3')
    ]
  },
  {
    number: '03',
    title: t('landing.step3Title'),
    description: t('landing.step3Description'),
    icon: 'i-lucide-share-2',
    details: [
      t('landing.step3Detail1'),
      t('landing.step3Detail2'),
      t('landing.step3Detail3')
    ]
  },
  {
    number: '04',
    title: t('landing.step4Title'),
    description: t('landing.step4Description'),
    icon: 'i-lucide-scan-line',
    details: [
      t('landing.step4Detail1'),
      t('landing.step4Detail2'),
      t('landing.step4Detail3')
    ]
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
  },
  {
    emoji: '💻',
    title: t('landing.useCase4Title'),
    description: t('landing.useCase4Description')
  },
  {
    emoji: '📱',
    title: t('landing.useCase5Title'),
    description: t('landing.useCase5Description')
  },
  {
    emoji: '🔑',
    title: t('landing.useCase6Title'),
    description: t('landing.useCase6Description')
  }
])

// Stagger animation on mount
const heroVisible = ref(false)
const sectionsVisible = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    heroVisible.value = true
    setTimeout(() => {
      sectionsVisible.value = true
    }, 600)
  })
})
</script>

<template>
  <div class="landing-page">
    <!-- ═══════════════════════════════════════════ -->
    <!-- HERO — Full viewport, dramatic entrance    -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="hero-section relative min-h-[85vh] flex items-center overflow-hidden">
      <!-- Atmospheric background -->
      <div class="hero-bg absolute inset-0 z-0"></div>
      <div class="hero-grain absolute inset-0 z-[1] pointer-events-none"></div>

      <!-- Floating geometric accents -->
      <div class="absolute top-[15%] right-[8%] w-64 h-64 rounded-full bg-primary/5 blur-[80px] animate-float-slow"></div>
      <div class="absolute bottom-[20%] left-[5%] w-48 h-48 rounded-full bg-secondary/8 blur-[60px] animate-float-delayed"></div>

      <UContainer class="relative z-10 w-full">
        <div
          class="hero-content transition-all duration-1000 ease-out"
          :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <!-- Editorial layout: asymmetric two-column -->
          <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <!-- Left column: oversized typography -->
            <div class="lg:col-span-7">
              <!-- Micro-label -->
              <div
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8 transition-all duration-700 delay-200"
                :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                <span class="text-xs font-medium tracking-wider uppercase text-primary">{{ $t('landing.badge').replace('🚀 ', '') }}</span>
              </div>

              <!-- Main headline — editorial scale -->
              <h1
                class="hero-headline font-extrabold tracking-tight leading-[0.92] mb-6 transition-all duration-700 delay-300"
                :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
              >
                <span class="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--ui-text-highlighted)]">
                  {{ $t('app.title').split('C')[0] }}<span class="hero-gradient-text">C</span>are
                </span>
                <span class="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl hero-gradient-text">
                  Card
                </span>
              </h1>

              <!-- Tagline with editorial weight -->
              <p
                class="text-lg md:text-xl lg:text-2xl font-light text-[var(--ui-text-muted)] max-w-xl leading-relaxed mb-4 transition-all duration-700 delay-400"
                :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              >
                {{ $t('app.tagline') }}
              </p>

              <!-- Description -->
              <p
                class="text-sm md:text-base text-[var(--ui-text-dimmed)] max-w-lg leading-relaxed mb-10 transition-all duration-700 delay-500"
                :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              >
                {{ $t('landing.description') }}
              </p>

              <!-- CTA group with editorial spacing -->
              <div
                class="flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-700 delay-600"
                :class="heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              >
                <UButton
                  to="/form"
                  size="xl"
                  icon="i-lucide-plus-circle"
                  class="hero-cta-primary"
                >
                  {{ $t('landing.createCard') }}
                </UButton>

                <UButton
                  to="/preview"
                  variant="outline"
                  size="xl"
                  icon="i-lucide-eye"
                  class="hero-cta-secondary"
                >
                  {{ $t('form.preview') }}
                </UButton>
              </div>
            </div>

            <!-- Right column: live scan result visualization -->
            <div
              class="lg:col-span-5 transition-all duration-700 delay-700"
              :class="heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'"
            >
              <div class="hero-visual relative">
                <!-- Atmospheric glow -->
                <div class="hero-glow absolute -inset-8 pointer-events-none"></div>

                <!-- Main panel — the "scan result" -->
                <div class="hero-panel relative rounded-2xl overflow-hidden">
                  <!-- Top edge shine -->
                  <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-20"></div>

                  <!-- Header bar -->
                  <div class="hero-panel-header flex items-center justify-between px-4 py-2.5 relative z-10">
                    <div class="flex items-center gap-2">
                      <UIcon name="i-lucide-heart-pulse" class="w-3.5 h-3.5 text-primary"></UIcon>
                      <span class="text-[10px] font-extrabold tracking-[0.12em] uppercase text-white/70">CareCard</span>
                    </div>
                    <div class="flex items-center gap-2.5">
                      <div class="flex items-center gap-1 text-[9px] font-medium text-white/20">
                        <UIcon name="i-lucide-nfc" class="w-3 h-3"></UIcon>
                        <span>NFC</span>
                      </div>
                      <div class="w-7 h-7 rounded-md bg-white/[0.06] border border-white/[0.06] flex items-center justify-center">
                        <UIcon name="i-lucide-qr-code" class="w-3.5 h-3.5 text-white/25"></UIcon>
                      </div>
                    </div>
                  </div>

                  <!-- Divider -->
                  <div class="h-px bg-white/[0.06] mx-3.5"></div>

                  <!-- Person identity -->
                  <div class="px-4 pt-3 pb-2.5 relative z-10">
                    <div class="flex items-center gap-3">
                      <div class="hero-avatar w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span class="text-base font-extrabold text-white/90 tracking-tight">NL</span>
                      </div>
                      <div class="min-w-0">
                        <p class="text-[15px] font-extrabold text-white tracking-tight leading-tight">Nicolo Longo</p>
                        <div class="flex items-center gap-1.5 mt-1">
                          <span class="inline-flex items-center gap-1 px-1.5 py-px rounded bg-red-500/10 border border-red-500/15 text-[9px] font-bold text-red-400/90">
                            <UIcon name="i-lucide-droplets" class="w-2.5 h-2.5"></UIcon>
                            A+
                          </span>
                          <span class="inline-flex items-center px-1.5 py-px rounded bg-white/[0.06] border border-white/[0.06] text-[9px] font-bold text-white/50">
                            8 anni
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Emergency contacts -->
                  <div class="px-4 pb-2.5 relative z-10">
                    <p class="text-[8px] font-bold tracking-[0.2em] uppercase text-white/20 mb-1.5">Emergency Contacts</p>
                    <div class="space-y-1.5">
                      <!-- Contact 1 -->
                      <div class="hero-contact flex items-center justify-between px-2.5 py-2 rounded-lg">
                        <div class="flex items-center gap-2.5 min-w-0">
                          <div class="w-7 h-7 rounded-md bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                            <span class="text-[10px] font-bold text-blue-400">P</span>
                          </div>
                          <div class="min-w-0">
                            <p class="text-[13px] font-bold text-white/85 leading-tight">Papa</p>
                            <p class="text-[10px] text-white/30 font-medium">+39 333 *** ****</p>
                          </div>
                        </div>
                        <div class="flex gap-1 flex-shrink-0">
                          <div class="hero-action-btn w-7 h-7 rounded-md flex items-center justify-center bg-emerald-500/15 border border-emerald-500/20">
                            <UIcon name="i-lucide-phone" class="w-3 h-3 text-emerald-400"></UIcon>
                          </div>
                          <div class="hero-action-btn w-7 h-7 rounded-md flex items-center justify-center bg-blue-500/15 border border-blue-500/20">
                            <UIcon name="i-lucide-mail" class="w-3 h-3 text-blue-400"></UIcon>
                          </div>
                        </div>
                      </div>

                      <!-- Contact 2 -->
                      <div class="hero-contact flex items-center justify-between px-2.5 py-2 rounded-lg">
                        <div class="flex items-center gap-2.5 min-w-0">
                          <div class="w-7 h-7 rounded-md bg-rose-500/15 flex items-center justify-center flex-shrink-0">
                            <span class="text-[10px] font-bold text-rose-400">M</span>
                          </div>
                          <div class="min-w-0">
                            <p class="text-[13px] font-bold text-white/85 leading-tight">Mamma</p>
                            <p class="text-[10px] text-white/30 font-medium">+39 338 *** ****</p>
                          </div>
                        </div>
                        <div class="flex gap-1 flex-shrink-0">
                          <div class="hero-action-btn w-7 h-7 rounded-md flex items-center justify-center bg-emerald-500/15 border border-emerald-500/20">
                            <UIcon name="i-lucide-phone" class="w-3 h-3 text-emerald-400"></UIcon>
                          </div>
                          <div class="hero-action-btn w-7 h-7 rounded-md flex items-center justify-center bg-blue-500/15 border border-blue-500/20">
                            <UIcon name="i-lucide-mail" class="w-3 h-3 text-blue-400"></UIcon>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Medical alert -->
                  <div class="px-4 pb-3 relative z-10">
                    <div class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-amber-500/8 border border-amber-500/15">
                      <UIcon name="i-lucide-triangle-alert" class="w-3 h-3 text-amber-400 flex-shrink-0"></UIcon>
                      <span class="text-[10px] font-bold text-amber-400/80">Allergia: Penicillina</span>
                    </div>
                  </div>
                </div>

                <!-- Trust row — grounded below the panel -->
                <div class="flex items-center justify-center gap-5 mt-5">
                  <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--ui-text-dimmed)]">
                    <UIcon name="i-lucide-shield-check" class="w-3.5 h-3.5 text-emerald-500/60"></UIcon>
                    Private
                  </span>
                  <span class="w-1 h-1 rounded-full bg-[var(--ui-text-dimmed)]/30"></span>
                  <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--ui-text-dimmed)]">
                    <UIcon name="i-lucide-github" class="w-3.5 h-3.5 text-[var(--ui-text-dimmed)]/60"></UIcon>
                    Open Source
                  </span>
                  <span class="w-1 h-1 rounded-full bg-[var(--ui-text-dimmed)]/30"></span>
                  <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--ui-text-dimmed)]">
                    <UIcon name="i-lucide-smartphone" class="w-3.5 h-3.5 text-[var(--ui-text-dimmed)]/60"></UIcon>
                    Universal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>

      <!-- Scroll indicator -->
      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-1000"
        :class="heroVisible ? 'opacity-60' : 'opacity-0'"
      >
        <span class="text-[10px] tracking-[0.2em] uppercase text-[var(--ui-text-muted)]">Scroll</span>
        <div class="w-px h-8 bg-gradient-to-b from-[var(--ui-text-muted)] to-transparent animate-scroll-line"></div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- STORY — Editorial narrative section         -->
    <!-- ═══════════════════════════════════════════ -->
    <section id="story" class="py-24 md:py-32 scroll-mt-20 relative overflow-hidden">
      <div class="section-accent-line absolute top-0 left-0 right-0 h-px"></div>

      <UContainer>
        <div
          class="transition-all duration-700"
          :class="sectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <!-- Section label -->
          <div class="flex items-center gap-3 mb-12">
            <div class="w-8 h-px bg-primary"></div>
            <span class="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Origin</span>
          </div>

          <div class="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <!-- Quote — large editorial style -->
            <div class="lg:col-span-7">
              <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-[var(--ui-text-highlighted)]">
                {{ $t('landing.story') }}
              </h2>

              <blockquote class="story-quote relative pl-6 border-l-2 border-primary/30">
                <p class="text-lg md:text-xl leading-relaxed text-[var(--ui-text-muted)] italic">
                  {{ $t('landing.storyContent') }}
                </p>
              </blockquote>
            </div>

            <!-- Problem/Solution — editorial cards -->
            <div class="lg:col-span-5 space-y-4">
              <div class="story-card rounded-xl p-5 border border-amber-500/20 bg-amber-500/5">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <UIcon name="i-lucide-alert-triangle" class="w-4 h-4 text-amber-500"></UIcon>
                  </div>
                  <div>
                    <h3 class="text-sm font-bold tracking-wide uppercase text-amber-600 dark:text-amber-400 mb-1.5">
                      Il Problema
                    </h3>
                    <p class="text-sm text-[var(--ui-text-muted)] leading-relaxed">{{ $t('landing.storyProblem') }}</p>
                  </div>
                </div>
              </div>

              <div class="story-card rounded-xl p-5 border border-emerald-500/20 bg-emerald-500/5">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <UIcon name="i-lucide-lightbulb" class="w-4 h-4 text-emerald-500"></UIcon>
                  </div>
                  <div>
                    <h3 class="text-sm font-bold tracking-wide uppercase text-emerald-600 dark:text-emerald-400 mb-1.5">La Soluzione</h3>
                    <p class="text-sm text-[var(--ui-text-muted)] leading-relaxed">CareCard colma questa lacuna creando un ponte digitale tra localizzazione e informazioni di contatto di emergenza.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- FEATURES — 3x2 grid with accent colors     -->
    <!-- ═══════════════════════════════════════════ -->
    <section id="features" class="py-24 md:py-32 scroll-mt-20 relative overflow-hidden">
      <div class="section-accent-line absolute top-0 left-0 right-0 h-px"></div>

      <!-- Atmospheric blurs -->
      <div class="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/3 blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-secondary/3 blur-[100px] pointer-events-none"></div>

      <UContainer class="relative z-10">
        <!-- Section label -->
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-px bg-primary"></div>
          <span class="text-xs font-semibold tracking-[0.2em] uppercase text-primary">{{ $t('landing.features') }}</span>
        </div>

        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-16 text-[var(--ui-text-highlighted)] max-w-2xl">
          {{ $t('landing.features') }}
        </h2>

        <!-- Feature grid — 3 columns, 2 rows -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="feature-card group rounded-2xl p-6 border border-[var(--ui-border)] bg-[var(--ui-bg-elevated)]/50 hover:bg-[var(--ui-bg-elevated)]/80 transition-all duration-300"
            :class="{
              'hover:border-emerald-500/30': feature.accent === 'emerald',
              'hover:border-blue-500/30': feature.accent === 'blue',
              'hover:border-amber-500/30': feature.accent === 'amber',
              'hover:border-violet-500/30': feature.accent === 'violet',
              'hover:border-cyan-500/30': feature.accent === 'cyan',
              'hover:border-rose-500/30': feature.accent === 'rose'
            }"
          >
            <!-- Icon with accent color -->
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105"
              :class="{
                'bg-emerald-500/10': feature.accent === 'emerald',
                'bg-blue-500/10': feature.accent === 'blue',
                'bg-amber-500/10': feature.accent === 'amber',
                'bg-violet-500/10': feature.accent === 'violet',
                'bg-cyan-500/10': feature.accent === 'cyan',
                'bg-rose-500/10': feature.accent === 'rose'
              }"
            >
              <UIcon
                :name="feature.icon"
                class="w-6 h-6"
                :class="{
                  'text-emerald-500': feature.accent === 'emerald',
                  'text-blue-500': feature.accent === 'blue',
                  'text-amber-500': feature.accent === 'amber',
                  'text-violet-500': feature.accent === 'violet',
                  'text-cyan-500': feature.accent === 'cyan',
                  'text-rose-500': feature.accent === 'rose'
                }"
              ></UIcon>
            </div>

            <!-- Content -->
            <h3 class="text-base font-bold text-[var(--ui-text-highlighted)] mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-[var(--ui-text-muted)] leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- HOW IT WORKS — 4-step process with details  -->
    <!-- ═══════════════════════════════════════════ -->
    <section id="how-it-works" class="py-24 md:py-32 scroll-mt-20 relative">
      <div class="section-accent-line absolute top-0 left-0 right-0 h-px"></div>

      <UContainer>
        <!-- Section label -->
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-px bg-primary"></div>
          <span class="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Process</span>
        </div>

        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-16 text-[var(--ui-text-highlighted)]">
          {{ $t('landing.howItWorks') }}
        </h2>

        <!-- Steps — 2x2 grid with connecting elements -->
        <div class="grid md:grid-cols-2 gap-6 relative">
          <div
            v-for="step in steps"
            :key="step.number"
            class="step-card group rounded-2xl p-6 md:p-8 border border-[var(--ui-border)] bg-[var(--ui-bg-elevated)]/30 hover:bg-[var(--ui-bg-elevated)]/60 hover:border-primary/20 transition-all duration-300"
          >
            <!-- Header: number + icon + title -->
            <div class="flex items-start gap-4 mb-4">
              <!-- Step number -->
              <div class="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <span class="text-sm font-black text-primary tabular-nums">{{ step.number }}</span>
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3 mb-1">
                  <UIcon :name="step.icon" class="w-4 h-4 text-primary flex-shrink-0"></UIcon>
                  <h3 class="text-lg font-bold text-[var(--ui-text-highlighted)]">{{ step.title }}</h3>
                </div>
                <p class="text-sm text-[var(--ui-text-muted)] leading-relaxed">{{ step.description }}</p>
              </div>
            </div>

            <!-- Detail bullets -->
            <div class="ml-16 space-y-2">
              <div
                v-for="detail in step.details"
                :key="detail"
                class="flex items-start gap-2.5"
              >
                <span class="w-1 h-1 rounded-full bg-primary/40 mt-2 flex-shrink-0"></span>
                <span class="text-xs text-[var(--ui-text-dimmed)] leading-relaxed">{{ detail }}</span>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- USE CASES — Compact editorial grid          -->
    <!-- ═══════════════════════════════════════════ -->
    <section id="use-cases" class="py-24 md:py-32 scroll-mt-20 relative">
      <div class="section-accent-line absolute top-0 left-0 right-0 h-px"></div>

      <UContainer>
        <!-- Section label -->
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-px bg-primary"></div>
          <span class="text-xs font-semibold tracking-[0.2em] uppercase text-primary">{{ $t('nav.examples') }}</span>
        </div>

        <div class="grid lg:grid-cols-12 gap-8 mb-16">
          <div class="lg:col-span-7">
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--ui-text-highlighted)] mb-4">
              {{ $t('landing.useCases') }}
            </h2>
            <p class="text-[var(--ui-text-muted)] max-w-xl">
              {{ $t('landing.useCasesDescription') }}
            </p>
          </div>
          <div class="lg:col-span-5 flex items-end lg:justify-end">
            <div class="flex gap-3">
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--ui-border)] text-xs font-medium text-[var(--ui-text-muted)]">
                <UIcon name="i-lucide-qr-code" class="w-3 h-3"></UIcon>
                QR Code
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--ui-border)] text-xs font-medium text-[var(--ui-text-muted)]">
                <UIcon name="i-lucide-nfc" class="w-3 h-3"></UIcon>
                NFC
              </span>
            </div>
          </div>
        </div>

        <!-- Use case grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="useCase in useCases"
            :key="useCase.title"
            class="use-case-card group rounded-xl p-6 border border-[var(--ui-border)] hover:border-primary/20 bg-[var(--ui-bg-elevated)]/30 hover:bg-[var(--ui-bg-elevated)]/70 transition-all duration-300"
          >
            <span class="text-3xl mb-4 block group-hover:scale-110 transition-transform duration-300 origin-left">{{ useCase.emoji }}</span>
            <h3 class="font-bold text-[var(--ui-text-highlighted)] mb-2">{{ useCase.title }}</h3>
            <p class="text-sm text-[var(--ui-text-muted)] leading-relaxed">{{ useCase.description }}</p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- CTA — Dramatic closing section              -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="relative py-28 md:py-36 overflow-hidden">
      <LandingStarsBg></LandingStarsBg>
      <div class="cta-gradient absolute inset-0 z-0"></div>

      <UContainer class="relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <!-- Section label -->
          <div class="flex items-center justify-center gap-3 mb-8">
            <div class="w-8 h-px bg-primary/60"></div>
            <span class="text-xs font-semibold tracking-[0.2em] uppercase text-primary/80">Start now</span>
            <div class="w-8 h-px bg-primary/60"></div>
          </div>

          <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-[var(--ui-text-highlighted)] tracking-tight">
            {{ $t('landing.getStarted') }}
          </h2>

          <p class="text-lg text-[var(--ui-text-muted)] mb-10 max-w-lg mx-auto">
            {{ $t('landing.secureData') }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
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

          <p class="text-sm text-[var(--ui-text-dimmed)]">
            {{ $t('landing.openSource') }}
          </p>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<style scoped>
/* ═══════════════════════════════════════════════════ */
/*  HERO SECTION                                      */
/* ═══════════════════════════════════════════════════ */

.hero-bg {
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%, var(--ui-primary) 0%, transparent 70%);
  opacity: 0.04;
}

.dark .hero-bg {
  opacity: 0.08;
}

.hero-grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

.hero-gradient-text {
  background: linear-gradient(135deg, #00ccff 0%, #0066ff 50%, #0052cc 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-cta-primary {
  position: relative;
  overflow: hidden;
}

.hero-cta-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1));
  opacity: 0;
  transition: opacity 0.3s;
}

.hero-cta-primary:hover::after {
  opacity: 1;
}

/* ═══════════════════════════════════════════════════ */
/*  HERO VISUAL — Scan result panel                   */
/* ═══════════════════════════════════════════════════ */

.hero-visual {
  max-width: 420px;
  margin: 0 auto;
}

.hero-glow {
  background:
    radial-gradient(ellipse 80% 70% at 50% 40%, rgba(0, 100, 255, 0.2) 0%, transparent 65%),
    radial-gradient(ellipse 50% 50% at 70% 30%, rgba(0, 200, 255, 0.1) 0%, transparent 50%);
  filter: blur(50px);
  animation: hero-glow-breathe 5s ease-in-out infinite;
}

.hero-panel {
  background: linear-gradient(165deg,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(255, 255, 255, 0.02) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  box-shadow:
    0 32px 64px -16px rgba(0, 0, 0, 0.5),
    0 16px 32px -8px rgba(0, 30, 80, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.hero-panel-header {
  background: rgba(255, 255, 255, 0.02);
}

.hero-avatar {
  background: linear-gradient(135deg, #0066ff 0%, #00bbff 100%);
  box-shadow: 0 4px 16px -4px rgba(0, 102, 255, 0.4);
}

.hero-contact {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.2s, border-color 0.2s;
}

.hero-contact:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.08);
}

.hero-action-btn {
  transition: transform 0.15s, filter 0.15s;
  cursor: default;
}

.hero-action-btn:hover {
  transform: scale(1.1);
  filter: brightness(1.2);
}

/* Light mode */
:root:not(.dark) .hero-panel {
  background: linear-gradient(165deg,
    rgba(255, 255, 255, 0.85) 0%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(240, 245, 255, 0.9) 100%
  );
  border-color: rgba(0, 50, 120, 0.1);
  box-shadow:
    0 32px 64px -16px rgba(0, 30, 80, 0.15),
    0 16px 32px -8px rgba(0, 30, 80, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

:root:not(.dark) .hero-panel-header {
  background: rgba(0, 50, 120, 0.03);
}

:root:not(.dark) .hero-glow {
  background:
    radial-gradient(ellipse 80% 70% at 50% 40%, rgba(0, 100, 255, 0.1) 0%, transparent 65%);
}

:root:not(.dark) .hero-contact {
  background: rgba(0, 30, 80, 0.03);
  border-color: rgba(0, 30, 80, 0.06);
}

:root:not(.dark) .hero-contact:hover {
  background: rgba(0, 30, 80, 0.06);
  border-color: rgba(0, 30, 80, 0.1);
}

@keyframes hero-glow-breathe {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(1.04); }
}

/* ═══════════════════════════════════════════════════ */
/*  SECTION ACCENTS                                   */
/* ═══════════════════════════════════════════════════ */

.section-accent-line {
  background: linear-gradient(90deg,
    transparent 0%,
    var(--ui-border) 20%,
    var(--ui-primary) 50%,
    var(--ui-border) 80%,
    transparent 100%
  );
  opacity: 0.5;
}

/* ═══════════════════════════════════════════════════ */
/*  STORY SECTION                                     */
/* ═══════════════════════════════════════════════════ */

.story-quote {
  transition: border-color 0.3s;
}

.story-quote:hover {
  border-color: var(--ui-primary);
}

.story-card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.story-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.08);
}

.dark .story-card:hover {
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.2);
}

/* ═══════════════════════════════════════════════════ */
/*  FEATURE CARDS                                     */
/* ═══════════════════════════════════════════════════ */

.feature-card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.06);
}

.dark .feature-card:hover {
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.2);
}

/* ═══════════════════════════════════════════════════ */
/*  STEP CARDS                                        */
/* ═══════════════════════════════════════════════════ */

.step-card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.step-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.06);
}

.dark .step-card:hover {
  box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.2);
}

/* ═══════════════════════════════════════════════════ */
/*  CTA SECTION                                       */
/* ═══════════════════════════════════════════════════ */

.cta-gradient {
  background:
    radial-gradient(ellipse 60% 50% at 50% 100%, var(--ui-primary) 0%, transparent 70%);
  opacity: 0.03;
}

.dark .cta-gradient {
  opacity: 0.06;
}

/* ═══════════════════════════════════════════════════ */
/*  ANIMATIONS                                        */
/* ═══════════════════════════════════════════════════ */

@keyframes float-slow {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-20px, 15px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(15px, -20px); }
}

@keyframes scroll-line {
  0% { opacity: 0; transform: scaleY(0); transform-origin: top; }
  50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
  50.01% { transform-origin: bottom; }
  100% { opacity: 0; transform: scaleY(0); transform-origin: bottom; }
}

.animate-float-slow {
  animation: float-slow 12s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 15s ease-in-out infinite;
  animation-delay: 3s;
}

.animate-scroll-line {
  animation: scroll-line 2s ease-in-out infinite;
}

/* ═══════════════════════════════════════════════════ */
/*  USE CASE CARDS                                    */
/* ═══════════════════════════════════════════════════ */

.use-case-card {
  cursor: default;
}

/* ═══════════════════════════════════════════════════ */
/*  RESPONSIVE                                        */
/* ═══════════════════════════════════════════════════ */

@media (max-width: 1024px) {
  .hero-section {
    min-height: auto;
    padding-top: 3rem;
    padding-bottom: 4rem;
  }
}
</style>
