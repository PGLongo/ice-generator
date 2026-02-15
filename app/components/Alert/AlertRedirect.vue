<script setup lang="ts">
const props = defineProps({
  url: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 10
  }
})

const emit = defineEmits(['close'])
const { seconds, startTimer, stopTimer } = useRedirectTimer()

const redirect = () => {
    if (props.url) {
        window.location.href = props.url
    }
}

const cancel = () => {
    stopTimer()
    emit('close')
}

onMounted(() => {
    startTimer(props.duration, redirect)
})
</script>

<template>
  <div class="relative w-full mt-4 bg-gray-900/90 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-3 animate-pulse-border text-left group">
    <!-- Close Button -->
    <button
      class="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800"
      @click="cancel"
    >
      <UIcon name="i-heroicons-x-mark" class="w-4 h-4" ></UIcon>
    </button>

    <div class="flex items-center gap-3" @click="redirect">
      <div class="relative flex items-center justify-center w-8 h-8 shrink-0 cursor-pointer">
        <UIcon name="i-heroicons-clock" class="w-5 h-5 text-emerald-400" ></UIcon>
        <svg class="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
          <path
            class="text-emerald-500/20"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
          />
          <path
            class="text-emerald-500 transition-all duration-1000 linear"
            :stroke-dasharray="`${(seconds / 10) * 100}, 100`"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
          />
        </svg>
      </div>

      <div class="cursor-pointer">
        <p class="text-xs font-bold text-white uppercase tracking-wide">Reindirizzamento</p>
        <p class="text-[10px] text-emerald-400 font-medium">Auto-navigazione in {{ seconds }}s</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulseBorder {
  0% { border-color: rgba(16, 183, 127, 0.3); box-shadow: 0 0 0 0 rgba(16, 183, 127, 0.2); }
  50% { border-color: rgba(16, 183, 127, 0.6); box-shadow: 0 0 10px 0 rgba(16, 183, 127, 0.3); }
  100% { border-color: rgba(16, 183, 127, 0.3); box-shadow: 0 0 0 0 rgba(16, 183, 127, 0.2); }
}

.animate-pulse-border {
  animation: pulseBorder 2s infinite;
}
</style>
