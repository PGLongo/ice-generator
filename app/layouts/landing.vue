<script setup lang="ts">
// Landing layout - used by the landing page (index.vue)
// Preserves the original header + footer structure
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />

    <UMain class="flex-1 flex flex-col">
      <slot />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" class="print:hidden" />

    <AppFooter />

    <UNotifications />
  </div>
</template>
