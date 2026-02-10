<script setup lang="ts">
const { t } = useI18n()

// Mobile menu state
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close mobile menu when route changes
const route = useRoute()
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})

// Landing page navigation links
const landingLinks = computed(() => [
  { label: t('nav.story'), href: '#story' },
  { label: t('nav.features'), href: '#features' },
  { label: t('nav.howItWorks'), href: '#how-it-works' },
  { label: t('nav.examples'), href: '#use-cases' }
])

// Close mobile menu on outside click
onMounted(() => {
  const handleClickOutside = (event: Event) => {
    const target = event.target as Element
    if (!target.closest('.mobile-nav') && !target.closest('.mobile-menu-btn')) {
      isMobileMenuOpen.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<template>
    <!-- Modern Toolbar with Gradient Background -->
    <header class="modern-header print:hidden sticky top-0 z-50 flex-shrink-0">
      <div class="header-background"></div>
      <div class="header-content">
        <UContainer class="flex items-center justify-between py-4">
          <!-- Logo Section -->
          <NuxtLink to="/" class="logo-section group">
            <AppLogo></AppLogo>
          </NuxtLink>

          <!-- Desktop Navigation (Landing links) -->
          <nav class="hidden lg:flex items-center space-x-1">
            <UButton
              v-for="link in landingLinks"
              :key="link.href"
              :to="link.href"
              variant="ghost"
              size="sm"
            >
              {{ link.label }}
            </UButton>
          </nav>

          <!-- Actions Section -->
          <div class="flex items-center space-x-3">
            <!-- Settings Group -->
            <div class="flex items-center space-x-2 settings-group">
              <LanguageSelect></LanguageSelect>
              <UColorModeButton class="color-mode-btn"></UColorModeButton>
              <UButton
                to="https://github.com/PGLongo/ice-generator"
                target="_blank"
                icon="i-simple-icons-github"
                variant="ghost"
                size="sm"
                class="github-btn"
                aria-label="GitHub Repository"
              ></UButton>
            </div>

            <!-- Mobile Menu Toggle -->
            <UButton
              icon="i-heroicons-bars-3"
              variant="ghost"
              size="sm"
              class="lg:hidden mobile-menu-btn"
              @click="toggleMobileMenu"
              aria-label="Menu"
            ></UButton>
          </div>
        </UContainer>

        <!-- Mobile Navigation Panel -->
        <div v-if="isMobileMenuOpen" class="mobile-nav lg:hidden">
          <UContainer>
            <div class="mobile-nav-content">
              <div class="flex flex-col space-y-2">
                <UButton
                  v-for="link in landingLinks"
                  :key="link.href"
                  :to="link.href"
                  variant="ghost"
                  size="lg"
                  class="justify-start"
                  @click="closeMobileMenu"
                >
                  {{ link.label }}
                </UButton>
              </div>
            </div>
          </UContainer>
        </div>
      </div>
    </header>
</template>

<style scoped>
/* Modern Header Styles */
.modern-header {
  position: relative;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(248, 250, 252, 0.9) 100%
  );
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
  z-index: -1;
}

.dark .header-background {
  background: linear-gradient(135deg,
    rgba(15, 23, 42, 0.95) 0%,
    rgba(30, 41, 59, 0.9) 100%
  );
  border-bottom: 1px solid rgba(51, 65, 85, 0.5);
}

.header-content {
  position: relative;
  z-index: 1;
}

/* Logo Section */
.logo-section {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-section:hover {
  transform: translateY(-1px);
}

/* Settings Group */
.settings-group {
  padding: 8px;
  border-radius: 12px;
  background: rgba(248, 250, 252, 0.8);
  border: 1px solid rgba(226, 232, 240, 0.6);
  transition: all 0.3s ease;
}

.dark .settings-group {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(51, 65, 85, 0.6);
}

.settings-group:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.dark .settings-group:hover {
  background: rgba(51, 65, 85, 0.9);
  border-color: rgba(59, 130, 246, 0.3);
}

/* Button Styles */
.color-mode-btn, .github-btn, .mobile-menu-btn {
  transition: all 0.3s ease;
  border-radius: 8px;
}

.color-mode-btn:hover, .github-btn:hover, .mobile-menu-btn:hover {
  background: rgba(59, 130, 246, 0.1);
  transform: scale(1.05);
}

/* Mobile Navigation */
.mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
  animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.dark .mobile-nav {
  background: rgba(15, 23, 42, 0.98);
  border-bottom: 1px solid rgba(51, 65, 85, 0.5);
}

.mobile-nav-content {
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Animations */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Improvements */
@media (max-width: 768px) {
  .settings-group {
    padding: 6px;
    gap: 0.375rem;
  }
}

/* Scroll Effect */
.modern-header.scrolled .header-background {
  background: rgba(255, 255, 255, 0.98);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.dark .modern-header.scrolled .header-background {
  background: rgba(15, 23, 42, 0.98);
  border-bottom: 1px solid rgba(51, 65, 85, 0.8);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}
</style>
