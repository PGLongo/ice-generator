<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

interface Props {
  orientation?: 'horizontal' | 'vertical'
}

withDefaults(defineProps<Props>(), {
  orientation: 'horizontal'
})

const { t } = useI18n()
const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
    icon: 'i-heroicons-home',
    active: route.path === '/'
  },
  {
    label: t('form.personalInfo'),
    to: '/form',
    icon: 'i-heroicons-document-text',
    active: route.path === '/form'
  },
  {
    label: t('form.preview'),
    to: '/preview',
    icon: 'i-heroicons-eye',
    active: route.path === '/preview'
  },
  {
    label: t('form.schoolCard'),
    to: '/school',
    icon: 'i-heroicons-academic-cap',
    active: route.path === '/school'
  }
])
</script>

<template>
  <UNavigationMenu
    :items="items"
    :orientation="orientation"
    :class="orientation === 'vertical' ? '-mx-2.5' : ''"
  ></UNavigationMenu>
</template>
