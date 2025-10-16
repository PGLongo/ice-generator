<script setup>
import packageJson from '../package.json'

const { locale, locales } = useI18n()
const colorMode = useColorMode()

// App version from package.json
const appVersion = packageJson.version

// Switch locale with computed for reactive updates
const currentLocale = computed({
  get: () => locale.value,
  set: (value) => {
    locale.value = value
  }
})

// Available locales for the dropdown
const availableLocales = computed(() =>
  locales.value.map((loc) => ({
    label: loc.code === 'en' ? 'English' : 'Italiano',
    value: loc.code,
    icon: loc.code === 'en' ? 'i-heroicons-language' : 'i-heroicons-language'
  }))
)

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: locale.value
  }
})

const title = 'ICE Generator'
const description = 'Create emergency contact information cards for NFC tags. Secure your emergency information for quick access.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="flex items-center">
          <AppLogo />
        </NuxtLink>
      </template>

      <template #center>
        <TemplateMenu />
      </template>

      <template #right>
        <USelectMenu
          v-model="currentLocale"
          :items="availableLocales"
          value-attribute="value"
          label-attribute="label"
          class="w-32"
        />

        <UColorModeButton />

        <UButton
          to="https://github.com/PGLongo/ice-generator"
          target="_blank"
          icon="i-simple-icons-github"
          color="gray"
          variant="ghost"
          aria-label="GitHub Repository"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          ICE Generator v{{ appVersion }} • {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <p class="text-sm text-muted">
          All data stored locally for privacy
        </p>
      </template>
    </UFooter>

    <UNotifications />
  </UApp>
</template>
