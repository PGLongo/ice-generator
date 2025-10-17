/**
 * Plugin to automatically load ICE data from URL query parameters on app startup
 * This allows sharing ICE data via URL links
 */
export default defineNuxtPlugin({
  name: 'load-from-url',
  parallel: true,
  async setup(nuxtApp) {
    const iceStore = useIceStore()
    const { getDataFromUrl } = useIceUrlShare()
    const toast = useToast()
    // Access i18n from nuxtApp - must use bracket notation and type cast
    const { t } = nuxtApp['$i18n'] as { t: (key: string) => string }

    // Check if there's data in the URL
    const urlData = getDataFromUrl()

    if (urlData) {
      try {
        // Load data from URL into store
        iceStore.loadFromUrlData(urlData)

        // Show success notification
        toast.add({
          title: t('common.dataLoaded'),
          description: t('common.dataLoadedFromUrl'),
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
          title: t('common.dataLoadError'),
          description: t('common.dataLoadErrorMessage'),
          color: 'error'
        })
      }
    }
  }
})
