/**
 * Composable to handle loading data from URL with loading state
 * @returns loading state and data ref
 */
export function useDataLoader<T = any>() {
  const route = useRoute()
  const { decodeData } = useIceUrlShare()

  const isLoading = ref(true)
  const data = ref<T | null>(null)

  /**
   * Load data from URL query params on mount
   */
  const loadData = async () => {
    const dataParam = route.query.data as string
    if (dataParam) {
      try {
        const decodedData = decodeData(dataParam)
        if (decodedData) {
          data.value = decodedData as T
        }
      } catch (error) {
        console.error('Failed to load data from URL:', error)
      }
    }
    // Small delay to ensure data is fully loaded
    await nextTick()
    isLoading.value = false
  }

  return {
    isLoading,
    data,
    loadData
  }
}
