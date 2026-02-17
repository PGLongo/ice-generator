<script setup lang="ts">
interface Props {
  allergies: string[]
}

defineProps<Props>()
</script>

<template>
  <div v-if="allergies.length > 0" class="px-5 pb-3">
    <div class="flex flex-wrap gap-1.5">
      <div
        v-for="allergy in allergies"
        :key="allergy"
        class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/8 border border-amber-500/15"
      >
        <UIcon name="i-lucide-triangle-alert" class="w-3 h-3 text-amber-500 dark:text-amber-400 flex-shrink-0"></UIcon>
        <span class="text-[11px] font-bold text-amber-600 dark:text-amber-400/80">{{ allergy }}</span>
      </div>
    </div>
  </div>
</template>
