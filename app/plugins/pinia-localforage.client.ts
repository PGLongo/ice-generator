import type { Pinia } from 'pinia'
import localforage from 'localforage'
import type { SchoolFormData } from '@/types/school-form'

export default defineNuxtPlugin({
  name: 'pinia.localforage',
  parallel: true,
  async setup(nuxtApp) {
    const iceStore = useIceStore(nuxtApp['$pinia'] as Pinia)
    const schoolFormStore = useSchoolFormStore(nuxtApp['$pinia'] as Pinia)

    // Check if data is provided via URL query params
    const route = useRoute()
    const hasUrlData = route.query['data'] && typeof route.query['data'] === 'string'

    // Migration function to move data from localStorage to LocalForage
    const migrateFromLocalStorage = async () => {
      try {
        const localStorageData = localStorage.getItem('ice-data')
        if (localStorageData) {
          if (import.meta.dev) {
            console.warn('Migrating data from localStorage to LocalForage...')
          }
          await localforage.setItem('ice-data', JSON.parse(localStorageData))
          // Remove from localStorage after successful migration
          localStorage.removeItem('ice-data')
          if (import.meta.dev) {
            console.warn('Migration completed successfully')
          }
          return JSON.parse(localStorageData)
        }
      } catch (error) {
        console.error('Migration from localStorage failed:', error)
      }
      return null
    }

    // Only load data if NO data in URL
    if (!hasUrlData) {
      try {
        // First try to load from LocalForage
        let savedData = await localforage.getItem('ice-data')

        // If no data in LocalForage, try migration from localStorage
        if (!savedData) {
          savedData = await migrateFromLocalStorage()
        }

        if (savedData) {
          iceStore.$patch({ data: savedData })
          if (import.meta.dev) {
            console.warn('ICE data loaded from LocalForage')
          }
        }
      } catch (error) {
        console.error('Failed to load ICE data from LocalForage:', error)

        // Fallback to localStorage if LocalForage fails
        try {
          const fallbackData = localStorage.getItem('ice-data')
          if (fallbackData) {
            const parsedData = JSON.parse(fallbackData)
            iceStore.$patch({ data: parsedData })
            console.warn('Fallback: ICE data loaded from localStorage')
          }
        } catch (fallbackError) {
          console.error('Fallback to localStorage also failed:', fallbackError)
        }
      }
    }

    // Subscribe to store changes and save to LocalForage
    iceStore.$subscribe(async (_mutation, state) => {
      try {
        // Convert reactive proxy to plain object for serialization
        const plainData = JSON.parse(JSON.stringify(state.data))
        await localforage.setItem('ice-data', plainData)
      } catch (error) {
        console.error('Failed to save ICE data to LocalForage:', error)

        // Fallback to localStorage if LocalForage fails
        try {
          localStorage.setItem('ice-data', JSON.stringify(state.data))
          console.warn('Fallback: ICE data saved to localStorage')
        } catch (fallbackError) {
          console.error('Fallback to localStorage also failed:', fallbackError)
        }
      }
    }, { detached: true })

    // Load school form data from LocalForage
    try {
      const savedSchoolFormData = await localforage.getItem<SchoolFormData>('school-form-data')
      if (savedSchoolFormData) {
        schoolFormStore.loadData(savedSchoolFormData)
        if (import.meta.dev) {
          console.warn('School form data loaded from LocalForage')
        }
      }
    } catch (error) {
      console.error('Failed to load school form data from LocalForage:', error)
    }

    // Subscribe to school form store changes and save to LocalForage
    schoolFormStore.$subscribe(async (_mutation, state) => {
      try {
        // Convert reactive proxy to plain object for serialization
        const plainData = JSON.parse(JSON.stringify(state.data))
        await localforage.setItem('school-form-data', plainData)
      } catch (error) {
        console.error('Failed to save school form data to LocalForage:', error)
      }
    }, { detached: true })
  }
})
