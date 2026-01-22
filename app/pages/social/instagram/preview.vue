<script setup lang="ts">

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

// Reactive decoding
watch(() => route.query['data'], (data) => {
  if (data && typeof data === 'string') {
    try {
      isLoading.value = true
      // Decode data with UTF-8 support
      const json = decodeURIComponent(escape(atob(data)))
      decodedData.value = JSON.parse(json)
    } catch (e) {
      console.error('Failed to decode data', e)
    } finally {
      isLoading.value = false
    }
  } else {
    isLoading.value = false
  }
}, { immediate: true })
</script>

<template>
  <div class="preview-page text-gray-200 font-sans">
    <div v-if="isLoading" class="preview-loading">
      <UIcon name="i-heroicons-arrow-path" class="w-10 h-10 animate-spin text-emerald-500" ></UIcon>
    </div>

    <template v-else-if="decodedData">
      <div class="preview-content">

        <!-- Story Card Preview -->
        <div id="story-card-preview" class="story-card">
          
            <!-- Full Height Background Image -->
            <img 
              id="story-bg-image"
              :src="decodedData?.backgroundImageUrl || props.defaultBackground" 
              class="absolute inset-0 w-full h-full object-cover"
              alt="Story Background"
            />
            
            <!-- Story Header (User Info) -->
            <div id="story-header" class="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent z-20 flex items-center gap-3">
              <!-- Avatar with Ring -->
              <div id="story-avatar-container" class="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
                <img 
                  id="story-avatar-image"
                  :src="props.defaultAvatar" 
                  class="w-full h-full rounded-full border-2 border-black object-cover bg-white"
                />
              </div>
              <!-- Text Info -->
              <div class="flex flex-col justify-center drop-shadow-md">
                <span class="text-white font-bold text-sm leading-tight">{{ decodedData.name }}</span>
                <span class="text-white/90 text-xs font-normal leading-tight">{{ decodedData.handle }}</span>
              </div>
            </div>

            <!-- Floating CTA Card (Bottom) -->
            <div id="story-cta-container" class="absolute bottom-12 left-6 right-6 z-20 animate-fade-in-up">
              <div class="bg-black/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-xl text-center">
                <div class="text-[10px] uppercase tracking-widest text-white/80 mb-3 font-semibold">Limited Time Offer</div>
                <button
                  id="btn-cta-preview"
                  data-cy="cta-button"
                  class="w-full py-4 rounded-xl font-bold text-black shadow-lg transition-transform transform active:scale-[0.98] flex items-center justify-center gap-2 hover:brightness-110"
                  :style="{
                    backgroundColor: decodedData?.color || '#00E5FF',
                    boxShadow: `0 4px 20px 0 ${decodedData?.color || '#00E5FF'}60`
                  }"
                >
                  <span class="text-sm">{{ decodedData?.ctaTitle }}</span>
                  <UIcon :name="decodedData?.icon || 'i-heroicons-shopping-bag'" class="w-4 h-4" />
                </button>
              </div>
            </div>

        </div>

        <!-- Actions Sidebar -->
        <div id="actions-sidebar" class="actions-sidebar">
          <!-- Live Preview Header -->
          <div class="text-center lg:text-left space-y-2">
            <h1 id="preview-heading" class="text-4xl font-extrabold tracking-tight">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#00ccff] to-[#0099ff]">Live </span>
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#0066ff] to-[#00ccff]">Preview</span>
            </h1>
            <p id="preview-subtext" class="text-gray-400 text-sm font-medium">Visualizzazione in tempo reale dello stile {{ decodedData.name }}.</p>
          </div>

          <div class="space-y-4">
            <div class="grid grid-cols-1 gap-4">
              <!-- @vue-ignore -->
              <UButton
                id="btn-copy-url"
                block
                size="xl"
                icon="i-heroicons-link"
                class="relative overflow-hidden group transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-[#00ccff] to-[#0099ff] hover:from-[#00b8e6] hover:to-[#008ae6] text-white border-0 shadow-lg hover:shadow-[#00ccff]/20 py-4 rounded-2xl font-bold text-white shadow-xl"
                :ui="{ rounded: 'rounded-2xl' }"
              >
                <span class="relative z-10">Copia Link Condivisibile</span>
              </UButton>
              <!-- @vue-ignore -->
              <UButton
                id="btn-share-instagram"
                block
                size="xl"
                icon="i-heroicons-share"
                class="relative overflow-hidden group transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 py-4 rounded-2xl font-bold text-white shadow-xl"
                :ui="{ rounded: 'rounded-2xl' }"
              >
                <span class="relative z-10">Condividi Anteprima</span>
              </UButton>
            </div>
          </div>
        </div>
        
      </div>
    </template>

    <div v-else class="preview-error">
      <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mb-4" ></UIcon>
      <h1 class="text-xl font-bold text-white mb-2">Impossibile caricare l'anteprima</h1>
      <p class="text-gray-400">Dati mancanti o non validi.</p>
      <!-- @vue-ignore -->
      <UButton to="/social/instagram" color="white" variant="ghost" class="mt-6">Torna alla configurazione</UButton>
    </div>
  </div>
</template>

<style scoped>
/* Fullscreen layout */
.preview-page {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.preview-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
}

.preview-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem;
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  flex: 1;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .preview-content {
    flex-direction: row;
    gap: 2rem;
  }
}

/* Story Card */
.story-card {
  position: relative;
  /* Scale based on available height in the main flex container */
  height: calc(100% - 2rem); 
  aspect-ratio: 9 / 16;
  margin: 0 auto;
  user-select: none;
  border-radius: 24px;
  overflow: hidden;
  background: black;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 8px rgba(17, 24, 39, 0.5);
  flex-shrink: 0; /* Don't shrink to 0 */
}

/* Actions Sidebar */
.actions-sidebar {
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  flex-shrink: 0;
}

/* Error State */
.preview-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  padding: 1.5rem;
  text-align: center;
}

/* Animations */
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
</style>
