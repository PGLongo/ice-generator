/**
 * Plugin to automatically load ICE data from URL query parameters on app startup
 * This allows sharing ICE data via URL links
 */
export default defineNuxtPlugin({
  name: 'load-from-url',
  parallel: true,
  async setup() {
    const iceStore = useIceStore()
    const { getDataFromUrl } = useIceUrlShare()
    const toast = useToast()

    // Check if there's data in the URL
    const urlData = getDataFromUrl()

    if (urlData) {
      try {
        // Load data from URL into store
        iceStore.loadFromUrlData(urlData)

        // Show success notification
        toast.add({
          title: 'Data Loaded',
          description: 'ICE data has been loaded from the URL',
          color: 'success'
        })

        // Optional: Clean URL after loading (remove query params)
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href)
          url.searchParams.delete('data')
          window.history.replaceState({}, '', url.toString())
        }
      } catch (error) {
        console.error('Failed to load data from URL:', error)
        toast.add({
          title: 'Error',
          description: 'Failed to load ICE data from URL',
          color: 'error'
        })
      }
    }
  }
})
