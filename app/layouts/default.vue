<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const route = useRoute()

const open = ref(false)

const links = computed<NavigationMenuItem[][]>(() => [[
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
    onSelect: () => { open.value = false }
  },
  {
    label: t('form.personalInfo'),
    icon: 'i-heroicons-document-text',
    to: '/form',
    onSelect: () => { open.value = false }
  },
  {
    label: t('form.preview'),
    icon: 'i-heroicons-eye',
    to: '/preview',
    onSelect: () => { open.value = false }
  },
  {
    label: t('form.schoolCard'),
    icon: 'i-heroicons-academic-cap',
    to: '/school',
    onSelect: () => { open.value = false }
  }
], [
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    to: 'https://github.com/nicololongo/ice-generator',
    target: '_blank'
  }
]])

const groups = computed(() => [{
  id: 'links',
  label: 'Go to',
  items: links.value.flat()
}, {
  id: 'code',
  label: 'Code',
  items: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    to: `https://github.com/nicololongo/ice-generator/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank'
  }]
}])
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <NuxtLink to="/" class="flex items-center gap-2 overflow-hidden">
          <img src="/CareCard.svg" alt="CareCard" class="h-8 w-auto shrink-0" />
          <span v-if="!collapsed" class="font-extrabold text-lg truncate">
            <span class="text-[var(--ui-color-carecard-cyan-500,#00ccff)]">Care</span><span class="text-[var(--ui-color-carecard-blue-500,#0066ff)]">Card</span>
          </span>
        </NuxtLink>
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" ></UDashboardSearchButton>

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        ></UNavigationMenu>

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        ></UNavigationMenu>
      </template>

      <template #footer="{ collapsed }">
        <div class="flex items-center" :class="collapsed ? 'flex-col gap-2' : 'gap-2'">
          <LanguageSelect ></LanguageSelect>
          <UColorModeButton ></UColorModeButton>
        </div>
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" ></UDashboardSearch>

    <slot ></slot>

    <UNotifications ></UNotifications>
  </UDashboardGroup>
</template>
