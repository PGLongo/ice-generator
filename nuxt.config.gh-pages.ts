// GitHub Pages specific configuration
import baseConfig from './nuxt.config'

export default {
  ...baseConfig,
  app: {
    baseURL: '/ice-generator/',
    buildAssetsDir: '_nuxt/',
    cdnURL: '/ice-generator/'
  },
  nitro: {
    baseURL: '/ice-generator/',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
}
