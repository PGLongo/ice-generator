import localforage from 'localforage'

export default defineNuxtPlugin({
  name: 'localforage',
  parallel: true,
  async setup() {
    // Configure LocalForage with project-specific settings
    localforage.config({
      driver: [
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE
      ],
      name: 'ICE Generator',
      version: 1.0,
      size: 4980736, // Size of the database in bytes (4.75MB)
      storeName: 'ice_data', // Should be alphanumeric with underscores
      description: 'ICE Generator application data storage'
    })

    // Test LocalForage is working
    try {
      await localforage.ready()
      if (import.meta.dev) {
        console.warn('LocalForage initialized with driver:', localforage.driver())
      }
    } catch (error) {
      console.error('LocalForage initialization failed:', error)
    }

    // Make localforage available globally
    return {
      provide: {
        localforage
      }
    }
  }
})
