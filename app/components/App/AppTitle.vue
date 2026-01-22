<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <h1 class="text-4xl font-extrabold tracking-tight">
    <!-- Single Text Mode -->
    <span v-if="text" class="bg-clip-text text-transparent bg-gradient-to-r from-[#00ccff] to-[#0066ff]">
      {{ text }}
    </span>
    
    <!-- Split Mode (Prefix + Suffix) -->
    
  </h1>
</template>
