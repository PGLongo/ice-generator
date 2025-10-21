// Import Cypress commands
import './commands'

// Define viewport sizes for testing
export const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 }
} as const

export type ViewportName = keyof typeof VIEWPORTS