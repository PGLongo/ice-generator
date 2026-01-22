<script setup lang="ts">
definePageMeta({
  layout: false
})

const props = defineProps({
    defaultAvatar: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/847/847969.png'
    },
    defaultBackground: {
        type: String,
        default: '/background-preview.png'
    }
})

const route = useRoute()

// State
const isLoading = ref(true)
const decodedData = ref<{
  ctaTitle: string
  destinationUrl: string
  color: string
  icon: string
  name: string
  handle: string
  backgroundImageUrl?: string
} | null>(null)

// Initialize
onMounted(async () => {
  const data = route.query['data'] as string | undefined
  if (data) {
    try {
      // Decode data
      const json = atob(data)
      decodedData.value = JSON.parse(json)
      isLoading.value = false
    } catch (e) {
      console.error('Failed to decode data', e)
      isLoading.value = false
    }
  } else {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="fixed inset-0 bg-[#0B1120] text-gray-200 flex flex-col font-sans overflow-hidden z-50">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img :src="decodedData?.backgroundImageUrl || props.defaultBackground" class="w-full h-full object-cover opacity-30 blur-sm" />
      <div class="absolute inset-0 bg-black/40"></div>
    </div>
    <div v-if="isLoading" class="flex-1 flex items-center justify-center">
      <UIcon name="i-heroicons-arrow-path" class="w-10 h-10 animate-spin text-emerald-500" ></UIcon>
    </div>

    <template v-else-if="decodedData">
      <!-- Main Content -->
      <div class="flex-1 flex flex-col items-center justify-center p-6 space-y-8 relative z-10 w-full max-w-md mx-auto">
        <!-- Preview Card -->
        <div class="bg-white/10 to-transparent backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-full">
          <!-- Profile Info -->
          <div class="flex flex-col items-center space-y-4 animate-fade-in-up">
            <div class="relative">
              <img
                :src="decodedData?.backgroundImageUrl || props.defaultAvatar"
                alt="Profile"
                class="w-24 h-24 rounded-full border-4 border-[#0B1120] relative z-10 shadow-xl object-cover"
              />
            </div>
            <div class="text-center">
              <h1 class="text-2xl font-bold text-white tracking-tight">{{ decodedData?.name }}</h1>
              <p class="text-gray-400 text-sm mt-1">{{ decodedData.handle }}</p>
            </div>
          </div>

          <!-- CTA Button -->
          <div class="w-full mt-8 animate-fade-in-up delay-100">
            <button
              class="w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform transform active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
              :style="{
                backgroundColor: decodedData?.color || '#000000',
                boxShadow: `0 4px 20px 0 ${decodedData?.color || '#000000'}40`
              }"
            >
              <UIcon :name="decodedData?.icon || 'i-heroicons-tag'" class="w-6 h-6" ></UIcon>
              {{ decodedData?.ctaTitle }}
            </button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-4 w-full animate-fade-in-up delay-200">
          <button class="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 py-3 rounded-xl font-semibold text-white transition-colors flex items-center justify-center gap-2">
            <UIcon name="i-heroicons-clipboard" class="w-5 h-5" ></UIcon>
            Copy URL
          </button>
          <button class="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 py-3 rounded-xl font-semibold text-white transition-colors flex items-center justify-center gap-2">
            <UIcon name="i-heroicons-share" class="w-5 h-5" ></UIcon>
            Share
          </button>
        </div>
      </div>
    </template>

    <div v-else class="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10">
      <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mb-4" ></UIcon>
      <h1 class="text-xl font-bold text-white mb-2">Impossibile caricare l'anteprima</h1>
      <p class="text-gray-400">Dati mancanti o non validi.</p>
      <UButton to="/social/instagram" color="neutral" variant="ghost" class="mt-6">Torna alla configurazione</UButton>
    </div>
  </div>
</template>

<style scoped>
/* ... existing styles ... */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
}

.delay-100 {
    animation-delay: 0.1s;
}

.delay-200 {
    animation-delay: 0.2s;
}
</style>
