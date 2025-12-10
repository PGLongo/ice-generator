import { vi } from 'vitest'

/**
 * Global test setup for Nuxt unit tests
 * Configures test environment and mocks global objects
 */

// Mock window.location if needed
if (!global.window) {
  (global as typeof globalThis & { window?: Window }).window = {
    location: {
      origin: 'https://example.com',
      pathname: '/app/',
      search: '',
      href: 'https://example.com/app/'
    }
  }
}

// Mock navigator.clipboard
if (!global.navigator) {
  (global as typeof globalThis & { navigator?: Navigator }).navigator = {} as Navigator
}

if (!global.navigator.clipboard) {
  (global as typeof globalThis & { navigator?: Navigator }).navigator!.clipboard = {
    writeText: vi.fn()
  }
}

// Mock crypto.randomUUID for cross-platform compatibility
if (!global.crypto) {
  (global as typeof globalThis & { crypto?: Crypto }).crypto = {
    randomUUID: () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }
  }
}

// Mock $fetch globally
global.$fetch = vi.fn()

// Suppress console errors in tests unless needed
const originalConsoleError = console.error
console.error = vi.fn((...args) => {
  // Only log actual errors, not mocked ones
  if (
    args[0]?.includes?.('Encryption error') ||
    args[0]?.includes?.('Decryption error')
  ) {
    return
  }
  originalConsoleError(...args)
})

// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks()
})
