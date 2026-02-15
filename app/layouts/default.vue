<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const { appVersion } = useRuntimeConfig().public

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
  },
  {
    label: t('schoolForm.title'),
    icon: 'i-heroicons-user-group',
    to: '/form/school',
    onSelect: () => { open.value = false }
  },
  {
    label: 'Social',
    icon: 'i-lucide-share-2',
    defaultOpen: false,
    children: [
      {
        label: 'Instagram',
        icon: 'i-simple-icons-instagram',
        to: '/social/instagram',
        onSelect: () => { open.value = false }
      },
      {
        label: 'Facebook',
        icon: 'i-simple-icons-facebook',
        disabled: true,
        badge: 'Soon'
      },
      {
        label: 'TikTok',
        icon: 'i-simple-icons-tiktok',
        disabled: true,
        badge: 'Soon'
      },
      {
        label: 'X',
        icon: 'i-simple-icons-x',
        disabled: true,
        badge: 'Soon'
      },
      {
        label: 'Bluesky',
        icon: 'i-simple-icons-bluesky',
        disabled: true,
        badge: 'Soon'
      }
    ]
  }
], [
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    to: 'https://github.com/nicololongo/ice-generator',
    target: '_blank'
  }
]])
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
        <p v-if="!collapsed" class="text-xs text-muted text-center mt-2">{{ appVersion }}</p>
      </template>
    </UDashboardSidebar>

    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar>
          <template #left>
            <NuxtLink to="/" class="flex items-center gap-2 lg:hidden">
              <img src="/CareCard.svg" alt="CareCard" class="h-6 w-auto" />
              <span class="font-extrabold text-base">
                <span class="text-[var(--ui-color-carecard-cyan-500,#00ccff)]">Care</span><span class="text-[var(--ui-color-carecard-blue-500,#0066ff)]">Card</span>
              </span>
            </NuxtLink>
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <slot ></slot>
      </template>
    </UDashboardPanel>

    <UNotifications ></UNotifications>
  </UDashboardGroup>
</template>
