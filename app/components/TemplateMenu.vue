<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()

const menuItems = computed(() => [
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
  <nav class="hidden md:flex items-center space-x-1">
    <UButton
      v-for="item in menuItems"
      :key="item.to"
      :to="item.to"
      :icon="item.icon"
      variant="ghost"
      size="sm"
      :class="item.active ? 'bg-primary/10 text-primary' : ''"
    >
      {{ item.label }}
    </UButton>
  </nav>
</template>
