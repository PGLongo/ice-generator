<script setup lang="ts">
// Fullscreen layout - no sidebar, no header, no footer
// Used for display-only pages like social media previews
</script>

<template>
  <div class="h-dvh overflow-hidden flex flex-col">
    <UMain class="flex-1 w-full relative min-h-0 overflow-y-auto">
      <slot />
    </UMain>

    <UNotifications />
  </div>
</template>
