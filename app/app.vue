<script setup>
import packageJson from '../package.json'

const { locale } = useI18n()

// App version from package.json
const appVersion = packageJson.version

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
          <AppLogo></AppLogo>
        </NuxtLink>
      </template>

      <template #center>
        <TemplateMenu></TemplateMenu>
      </template>

      <template #right>
        <LanguageSelect></LanguageSelect>

        <UColorModeButton></UColorModeButton>

        <UButton
          to="https://github.com/PGLongo/ice-generator"
          target="_blank"
          icon="i-simple-icons-github"
          color="gray"
          variant="ghost"
          aria-label="GitHub Repository"
        ></UButton>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage></NuxtPage>
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs"></USeparator>

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

    <UNotifications></UNotifications>
  </UApp>
</template>
