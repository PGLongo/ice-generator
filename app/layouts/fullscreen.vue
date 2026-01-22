<script setup lang="ts">
// Components are auto-imported by Nuxt given the folder structure
// AppHeader and AppFooter are in components/App/ which maps to <AppHeader> and <AppFooter>
</script>

<template>
  <div class="h-dvh overflow-hidden flex flex-col">
    <!-- Reusable Header -->
    <AppHeader />

    <UMain class="flex-1 w-full relative min-h-0 overflow-y-auto">
      <slot />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" class="print:hidden" />
    <!-- Reusable Footer -->
    <AppFooter />

    <UNotifications />
  </div>
</template>
