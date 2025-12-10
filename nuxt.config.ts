// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/test-utils/module'
  ],

  ssr: true,

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
    '/preview': { prerender: true }
  },
  compatibilityDate: '2025-07-15',

  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    }
  },

  vite: {
    optimizeDeps: {
      include: ['jspdf']
    }
  },

  typescript: {
    strict: true,
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
        noUncheckedIndexedAccess: true,
        noImplicitReturns: true,
        noPropertyAccessFromIndexSignature: true,
        exactOptionalPropertyTypes: false, // Can cause issues with Vue
        forceConsistentCasingInFileNames: true
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'it', name: 'Italiano', file: 'it.json' }
    ],
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false,
      fallbackLocale: 'en'
    }
  },

  icon: {
    serverBundle: {
      collections: ['heroicons', 'lucide', 'simple-icons']
    },
    clientBundle: {
      icons: [
        // Personal Info
        'heroicons:user',
        'heroicons:user-circle',
        'heroicons:calendar',
        'heroicons:cake',
        'heroicons:beaker',
        'heroicons:map',
        'heroicons:map-pin',
        // Medical Info
        'heroicons:heart',
        'heroicons:clipboard-document-list',
        // Emergency Contacts
        'heroicons:phone',
        'heroicons:envelope',
        'heroicons:user-plus',
        'heroicons:trash',
        // Additional Info
        'heroicons:information-circle',
        // Actions
        'heroicons:qr-code',
        'heroicons:eye',
        'heroicons:link',
        'heroicons:arrow-path',
        'heroicons:plus',
        'heroicons:exclamation-triangle',
        'heroicons:identification',
        // UI
        'heroicons:sun',
        'heroicons:moon',
        'heroicons:language',
        'heroicons:chevron-down',
        'heroicons:check'
      ],
      scan: true
    }
  }
})
