<script setup lang="ts">
const { locale } = useI18n()

// SEO Configuration
const title = 'CareCard'
const description = 'Smart Integration: ICE + NFC + QR + Tags. The unified solution for emergency contact information.'

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

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/carecard-og-image.png',
  twitterImage: '/carecard-og-image.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage ></NuxtPage>
    </NuxtLayout>
  </UApp>
</template>
