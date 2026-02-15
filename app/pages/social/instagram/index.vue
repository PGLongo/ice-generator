<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const { search, filteredIcons } = useIcons()
const selectedColor = ref('#10B77F')
const selectedIcon = ref('i-heroicons-shopping-bag')
const formCtaTitle = ref('Shop Now')
const name = ref('DungeonStore Genova')
const handle = ref('@dungeonstore_genova')
const backgroundImageUrl = ref('')
const profileImageUrl = ref('')
const router = useRouter()
const isGenerating = ref(false)

const destinationUrl = computed(() => {
    const cleanHandle = handle.value.replace('@', '').trim()
    return cleanHandle ? `https://instagram.com/${cleanHandle}` : ''
})

const isValid = computed(() => {
  return formCtaTitle.value.trim().length > 0 && handle.value.trim().length > 0 && name.value.trim().length > 0
})

const colors = [
  '#10B77F', // Green
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#A855F7', // Purple
  '#F97316', // Orange
  '#EC4899' // Pink
]

const generatePreview = async () => {
    if (!isValid.value) return
    isGenerating.value = true

    const data = {
        name: name.value,
        handle: handle.value,
        ctaTitle: formCtaTitle.value,
        destinationUrl: destinationUrl.value,
        color: selectedColor.value,
        icon: selectedIcon.value,
        backgroundImageUrl: backgroundImageUrl.value,
        profileImageUrl: profileImageUrl.value
    }

    // Robust encoding for UTF-8 support
    const jsonString = JSON.stringify(data)
    const encodedData = btoa(unescape(encodeURIComponent(jsonString)))

    try {
        await router.push({
            path: '/social/instagram/preview',
            query: { data: encodedData }
        })
    } catch (e) {
        console.error('Navigation error:', e)
        // Fallback
        window.location.href = `/social/instagram/preview?data=${encodedData}`
    }
}
</script>

<template>
  <!-- Main Container: Standard flow within layout -->
  <div class="bg-[#0B1120] text-gray-200 font-sans min-h-[calc(100vh-64px)]">
    <!-- Config Section -->
    <div class="bg-[#0B1120]">
      <!-- Static content that should NOT scroll -->
      <div class="p-5 pb-0 max-w-md mx-auto w-full space-y-5">
        <!-- Informazioni Base -->
        <section>
          <div class="flex items-center mb-3">
            <div class="w-1 h-5 bg-emerald-500 rounded-full mr-3"></div>
            <h2 class="text-base font-bold text-white">Informazioni Base</h2>
          </div>

          <div class="space-y-4">
            <div>
              <span class="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2 pl-1">Nome (es. Negozio) <span class="text-red-500">*</span></span>
              <div class="bg-[#111827] px-4 py-2.5 rounded-xl border border-gray-800/60 transition-colors focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/50">
                <div class="flex items-center text-gray-200">
                  <UIcon name="i-heroicons-identification" class="w-4 h-4 mr-3 text-gray-600 shrink-0" ></UIcon>
                  <input
                    data-cy="input-name"
                    v-model="name"
                    type="text"
                    placeholder="Es. DungeonStore Genova"
                    class="bg-transparent border-none text-sm font-medium w-full focus:outline-none placeholder-gray-600"
                  />
                </div>
              </div>
            </div>

            <div>
              <span class="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2 pl-1">Instagram Handle <span class="text-red-500">*</span></span>
              <div class="bg-[#111827] px-4 py-2.5 rounded-xl border border-gray-800/60 transition-colors focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/50">
                <div class="flex items-center text-gray-200">
                  <UIcon name="i-heroicons-at-symbol" class="w-4 h-4 mr-3 text-gray-600 shrink-0" ></UIcon>
                  <input
                    data-cy="input-handle"
                    v-model="handle"
                    type="text"
                    placeholder="Es. @dungeonstore_genova"
                    class="bg-transparent border-none text-sm font-medium w-full focus:outline-none placeholder-gray-600"
                  />
                </div>
              </div>
            </div>

            <div>
              <span class="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2 pl-1">Titolo CTA <span class="text-red-500">*</span></span>
              <div class="bg-[#111827] px-4 py-2.5 rounded-xl border border-gray-800/60 transition-colors focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/50">
                <div class="flex items-center text-gray-200">
                  <UIcon name="i-heroicons-tag" class="w-4 h-4 mr-3 text-gray-600 shrink-0" ></UIcon>
                  <input
                    data-cy="input-cta"
                    v-model="formCtaTitle"
                    type="text"
                    placeholder="Es. Shop Now"
                    class="bg-transparent border-none text-sm font-medium w-full focus:outline-none placeholder-gray-600"
                  />
                </div>
              </div>
            </div>

            <div>
              <span class="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2 pl-1">URL Immagine Sfondo</span>
              <div class="bg-[#111827] px-4 py-2.5 rounded-xl border border-gray-800/60 transition-colors focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/50">
                <div class="flex items-center text-gray-200">
                  <UIcon name="i-heroicons-photo" class="w-4 h-4 mr-3 text-gray-600 shrink-0" ></UIcon>
                  <input
                    data-cy="input-bg-url"
                    v-model="backgroundImageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    class="bg-transparent border-none text-sm font-medium w-full focus:outline-none placeholder-gray-600"
                  />
                </div>
              </div>
            </div>

            <div>
              <span class="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2 pl-1">URL Immagine Profilo</span>
              <div class="bg-[#111827] px-4 py-2.5 rounded-xl border border-gray-800/60 transition-colors focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/50">
                <div class="flex items-center text-gray-200">
                  <UIcon name="i-heroicons-user-circle" class="w-4 h-4 mr-3 text-gray-600 shrink-0" ></UIcon>
                  <input
                    data-cy="input-profile-url"
                    v-model="profileImageUrl"
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    class="bg-transparent border-none text-sm font-medium w-full focus:outline-none placeholder-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Brand Color -->
        <section>
          <div class="flex items-center mb-3">
            <div class="w-1 h-5 bg-emerald-500 rounded-full mr-3"></div>
            <h2 class="text-base font-bold text-white">Brand Color</h2>
          </div>

          <div class="bg-[#111827] p-4 rounded-xl border border-gray-800/60">
            <div class="flex gap-4 mb-4 flex-wrap justify-between">
              <button
                v-for="color in colors"
                :key="color"
                class="w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none ring-2 ring-offset-2 ring-offset-[#111827]"
                :style="{ 'backgroundColor': color, '--tw-ring-color': selectedColor === color ? color : 'transparent' }"
                @click="selectedColor = color"
              ></button>
            </div>

            <div class="bg-[#0B1120] rounded-lg p-2.5 flex items-center justify-between border border-gray-800/60">
              <div class="flex items-center gap-2">
                <div
                  class="w-5 h-5 rounded text-[10px] flex items-center justify-center font-mono font-bold bg-white/5"
                  :style="{ color: selectedColor }"
                >
                  #
                </div>
                <span class="font-mono text-xs tracking-wider text-gray-300 font-medium">{{ selectedColor.replace('#', '') }}</span>
              </div>
              <span class="text-[10px] font-bold text-gray-600 px-1">HEX</span>
            </div>
          </div>
        </section>

        <!-- Icon Selection Header -->
        <section class="pb-2">
          <div class="flex items-center mb-3">
            <div class="w-1 h-5 bg-emerald-500 rounded-full mr-3"></div>
            <h2 class="text-base font-bold text-white">Icon Selection</h2>
          </div>

          <div class="relative">
            <UIcon name="i-heroicons-magnifying-glass" class="absolute left-3 top-2.5 w-4 h-4 text-gray-500" ></UIcon>
            <input
              v-model="search"
              type="text"
              placeholder="Search icons (es. heart, cuore)..."
              class="w-full bg-[#111827] border border-gray-800/80 rounded-lg py-2 pl-9 pr-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
              spellcheck="false"
            />
          </div>
        </section>
      </div>
    </div>

    <!-- Icon Grid Section -->
    <div class="bg-[#0B1120]">
      <div class="p-5 pt-2 max-w-md mx-auto w-full">
        <div class="bg-[#111827] p-4 rounded-xl border border-gray-800/60 min-h-[300px]">
          <div v-if="filteredIcons.length > 0" class="grid grid-cols-5 gap-3">
            <button
              v-for="icon in filteredIcons"
              :key="icon"
              class="aspect-square rounded-lg flex items-center justify-center border transition-all duration-200 hover:bg-gray-800 group"
              :class="[
                selectedIcon === icon
                  ? `border-[${selectedColor}] text-[${selectedColor}] bg-[${selectedColor}]/10 shadow-[0_0_10px_rgba(16,183,127,0.1)]`
                  : 'border-gray-800/60 text-gray-500 bg-[#0B1120]'
              ]"
              :style="selectedIcon === icon ? { borderColor: selectedColor, color: selectedColor } : {}"
              @click="selectedIcon = icon"
            >
              <UIcon
                :name="icon"
                class="w-5 h-5 transition-transform group-hover:scale-110"
                :class="{ 'scale-110': selectedIcon === icon }"
              ></UIcon>
            </button>
          </div>
          <div v-else class="flex flex-col items-center justify-center h-48 text-gray-500">
            <UIcon name="i-heroicons-face-frown" class="w-8 h-8 mb-2" ></UIcon>
            <span class="text-sm">Nessuna icona trovata</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Action -->

    <div class="max-w-md mx-auto w-full pb-4">
      <button
        type="button"
        class="w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        :style="{
          backgroundColor: isValid ? '#10B77F' : '#374151',
          boxShadow: isValid ? '0 4px 14px 0 rgba(16, 183, 127, 0.39)' : 'none'
        }"
        :disabled="!isValid || isGenerating"
        @click="generatePreview"
      >
        {{ isGenerating ? 'Generating...' : 'Generate Preview' }}
        <span data-cy="debug-cta" class="hidden">{{ formCtaTitle }}</span>
        <UIcon name="i-heroicons-sparkles" class="w-4 h-4 animate-pulse" v-if="isValid && !isGenerating" ></UIcon>
        <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 animate-spin" v-if="isGenerating" ></UIcon>
      </button>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}
/* Safe area for mobile devices */
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 1rem);
}
</style>
