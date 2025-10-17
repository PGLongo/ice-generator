import type { Pinia } from 'pinia'

export default defineNuxtPlugin({
  name: 'pinia.client',
  parallel: true,
  async setup(nuxtApp) {
    const iceStore = useIceStore(nuxtApp['$pinia'] as Pinia)

    // Load from localStorage on plugin init
    const saved = localStorage.getItem('ice-data')
    if (saved) {
      try {
        const parsedData = JSON.parse(saved)
        iceStore.$patch({ data: parsedData })
      } catch (error) {
        console.error('Failed to load ICE data from localStorage:', error)
      }
    }

    // Subscribe to store changes and save to localStorage
    iceStore.$subscribe((_mutation, state) => {
      try {
        localStorage.setItem('ice-data', JSON.stringify(state.data))
      } catch (error) {
        console.error('Failed to save ICE data to localStorage:', error)
      }
    }, { detached: true })
  }
})
