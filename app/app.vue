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

const title = 'SmICE'
const description = 'Smart Integration: ICE + NFC + QR + Tags. The unified solution for emergency contact information.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/smice-og-image.png',
  twitterImage: '/smice-og-image.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <UHeader class="print:hidden">
      <template #left>
        <NuxtLink to="/" class="flex items-center">
          <AppLogo></AppLogo>
        </NuxtLink>
      </template>

      <template #default>
        <TemplateMenu></TemplateMenu>
      </template>

      <template #right>
        <LanguageSelect></LanguageSelect>

        <UColorModeButton></UColorModeButton>

        <UButton
          to="https://github.com/PGLongo/ice-generator"
          target="_blank"
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          aria-label="GitHub Repository"
        ></UButton>
      </template>

      <template #body>
        <TemplateMenu orientation="vertical"></TemplateMenu>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage></NuxtPage>
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" class="print:hidden"></USeparator>

    <UFooter class="print:hidden">
      <template #left>
        <p class="text-sm text-muted">
          SmICE v{{ appVersion }} • {{ new Date().getFullYear() }}
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
