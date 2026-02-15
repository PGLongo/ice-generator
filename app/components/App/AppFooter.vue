<script setup lang="ts">
import packageJson from '../../../package.json'

// App version from package.json
const appVersion = packageJson.version
</script>

<template>
  <UFooter class="print:hidden flex-shrink-0">
    <template #left>
      <p class="text-sm text-muted">
        CareCard v{{ appVersion }} • {{ new Date().getFullYear() }}
      </p>
    </template>

    <template #right>
      <p class="text-sm text-muted">
        All data stored locally for privacy
      </p>
    </template>
  </UFooter>
</template>
