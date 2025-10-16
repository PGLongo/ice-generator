# CLAUDE.md - ICE Generator Project Documentation

## Project Overview

ICE Generator is a web application built with Nuxt 4 and Nuxt UI that allows users to create, edit, and export emergency contact information (ICE - In Case of Emergency) as standalone HTML pages designed to be stored on NFC tags.

## Project Goals

1. **Create ICE Forms** - Provide a user-friendly interface to input emergency contact information and critical medical details
2. **Edit & Persist Data** - Allow users to modify their ICE data with persistent storage (localStorage)
3. **Export to HTML** - Generate standalone, optimized HTML pages that can be stored on NFC tags
4. **NFC Optimization** - Ensure exported HTML is compact and fits within typical NFC tag memory constraints (2-8KB)

## Technical Stack

- **Framework**: Nuxt 4.1.3
- **UI Library**: Nuxt UI 4.0.1
- **Language**: TypeScript
- **Runtime**: Vue 3.5.22
- **Styling**: Tailwind CSS (via Nuxt UI)
- **Icons**: Nuxt Icon (via Nuxt UI)
- **Color Mode**: Dark mode support (via Nuxt UI)

## Project Structure

```
ice-generator/
├── app/
│   ├── app.vue                          # Main application layout (header, footer, navigation)
│   ├── pages/
│   │   ├── index.vue                    # Main form page
│   │   └── preview.vue                  # HTML preview page
│   ├── components/
│   │   ├── Form/
│   │   │   ├── FormPersonalInfo.vue     # Personal data form section
│   │   │   ├── FormMedicalInfo.vue      # Medical data form section
│   │   │   ├── FormEmergencyContacts.vue # Contacts list with add/remove
│   │   │   └── FormAdditionalInfo.vue   # Additional info form section
│   │   ├── AppLogo.vue                  # Application logo
│   │   └── TemplateMenu.vue             # Template selector menu
│   ├── composables/
│   │   ├── useIceExport.ts              # HTML generation and export logic
│   │   └── useIceUrlShare.ts            # URL encoding/decoding with compression
│   ├── stores/
│   │   └── ice.ts                       # Pinia store for ICE data
│   ├── types/
│   │   └── ice.ts                       # TypeScript interfaces (IceData, EmergencyContact)
│   ├── plugins/
│   │   └── pinia.client.ts              # Auto-persist plugin for localStorage
│   └── assets/
│       └── css/
│           └── main.css                 # Global styles
├── i18n/
│   └── locales/
│       ├── en.json                      # English translations
│       └── it.json                      # Italian translations
├── public/                              # Static assets
├── nuxt.config.ts                       # Nuxt configuration
├── package.json                         # Project dependencies
├── tsconfig.json                        # TypeScript configuration
├── README.md                            # User-facing documentation
└── CLAUDE.md                            # This file - AI assistant context
```

## Key Features to Implement

### 1. ICE Data Form
Fields to include:
- **Personal Information**
  - Full Name
  - Date of Birth
  - Blood Type
  - Allergies
  - Medical Conditions
  - Current Medications
  - Medical Notes

- **Emergency Contacts** (multiple)
  - Contact Name
  - Relationship
  - Phone Number
  - Email (optional)

- **Additional Information**
  - Primary Doctor
  - Insurance Information
  - Special Instructions

### 2. Data Management
- Use Pinia or Vue composables for state management
- Persist data to localStorage for editing
- Form validation with Nuxt UI form components
- Import/Export data as JSON for backup

### 3. HTML Export
- Generate standalone HTML with:
  - Inline CSS (no external dependencies)
  - Responsive design
  - Accessible and readable in emergency situations
  - Minimal file size for NFC compatibility
- Include QR code option for additional data storage
- Support multiple languages

### 4. Preview & Testing
- Live preview of generated HTML
- File size indicator
- NFC compatibility checker
- Print-friendly view

## NFC Tag Considerations

- **NTAG213**: 144 bytes user memory (~140 bytes after URL)
- **NTAG215**: 504 bytes user memory
- **NTAG216**: 888 bytes user memory
- **MIFARE Classic 1K**: ~700 bytes user memory

The generated HTML should be:
- Minified and compressed
- Use short variable names
- Inline all styles
- Consider storing minimal data with link to full page

## Development Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run generate # Generate static site
npm run preview  # Preview production build
```

## Dependencies

### Core
- `nuxt`: ^4.1.3
- `vue`: ^3.5.22
- `@nuxt/ui`: ^4.0.1

### UI Dependencies (via @nuxt/ui)
- `@nuxtjs/color-mode`: Dark mode support
- `@nuxt/icon`: Icon system
- `@nuxt/fonts`: Font optimization
- `tailwindcss`: Utility-first CSS

## Design Principles

1. **User-Centric**: Simple, intuitive interface for all age groups
2. **Accessibility**: WCAG 2.1 AA compliant
3. **Responsive**: Works on mobile, tablet, and desktop
4. **Offline-First**: Progressive Web App capabilities
5. **Privacy**: All data stored locally, no server storage
6. **Emergency-Ready**: High contrast, large text, clear hierarchy

## Future Enhancements

- Multi-language support (i18n)
- QR code generation
- PDF export option
- Mobile app wrapper (Capacitor/Ionic)
- Encryption option for sensitive data
- Cloud backup (optional, encrypted)
- Template system for different use cases (children, elderly, pets)

## Implementation Notes

### TypeScript Types
- **Types location**: `app/types/ice.ts` - All TypeScript interfaces for the domain model
- **Main interfaces**:
  - `IceData` - Complete ICE data structure with personal, medical, and emergency contact information
  - `EmergencyContact` - Single emergency contact with name, relationship, phone, email
- **Auto-imported**: Nuxt auto-imports types from `app/types/` so you can use them without explicit imports in Vue components
- **Best practice**: Public domain interfaces go in `app/types/`, internal/implementation interfaces stay in their respective files

### State Management
- **Pinia Store**: All ICE data is stored in a single reactive Pinia store (`useIceStore`)
- **Store location**: `app/stores/ice.ts` (imports types from `@/types/ice`)
- **Auto-persistence**: Plugin (`app/plugins/pinia.client.ts`) uses `$subscribe` to automatically save to localStorage
- **Direct store access**: ALL form components access the store directly via `useIceStore()`
- **No intermediate data**: No `localData`, no `v-model` props, no computed properties in parent
- **Real-time sync**: Changes to store automatically trigger localStorage save and UI updates
- **Plugin format**: Uses modern `defineNuxtPlugin({ name, parallel: true, async setup() })` format

**Store Data Structure (`IceData` interface from `@/types/ice`):**
```typescript
{
  // Personal Information
  name: string
  age: number | null
  bloodType?: string
  city?: string
  address?: string

  // Medical Information
  allergies?: string[]
  medicalConditions?: string[]
  currentMedications?: string[]
  medicalNotes?: string

  // Emergency Contacts
  emergencyContacts: EmergencyContact[]

  // Additional Information
  primaryDoctor?: string
  insuranceInfo?: string
  specialInstructions?: string

  // Metadata
  lastUpdated?: string
}
```

**Store Actions:**
- `addEmergencyContact(contact)` - Add new emergency contact
- `updateEmergencyContact(id, updates)` - Update existing contact
- `removeEmergencyContact(id)` - Remove contact
- `clearData()` - Reset all data to defaults
- `exportData()` - Export as JSON string
- `importData(jsonData)` - Import from JSON string

### Form Components Architecture
**IMPORTANT: All form components MUST follow this pattern:**

- **Direct store import**: `import { useIceStore } from '@/stores/ice'` in every form component
- **No props for data**: Forms do NOT accept `modelValue` or other data props (except FormEmergencyContacts which uses v-model for the array)
- **Direct binding**: Use `v-model="iceStore.data.fieldName"` directly in inputs
- **Computed for transformations**: Use computed properties ONLY when transforming data (e.g., array ↔ comma-separated string)
- **No watchers**: No need to watch props or sync local data
- **No emit**: No need to emit updates - store is reactive
- **Modular**: Each form section is a separate component in `app/components/Form/`
- **Validation**: Client-side validation with required fields (name, age)
- **Auto-save**: No explicit save button needed - data persists on every change

**Example pattern:**
```vue
<script setup lang="ts">
import { useIceStore } from '@/stores/ice'
const iceStore = useIceStore()
</script>

<template>
  <UInput v-model="iceStore.data.name" />
  <UInput v-model="iceStore.data.age" />
</template>
```

### HTML Export
- **Template-based**: HTML generated as string with inline CSS in `useIceExport.ts`
- **Emergency-optimized**: Design prioritizes quick access to critical info
  - Large name at top
  - Primary/Secondary contacts prominently displayed
  - Large call buttons with `tel:` links
  - Email buttons with `mailto:` links
- **Conditional rendering**: Sections only appear if data is present
- **Standalone**: No external dependencies, all CSS inline, fonts from Google CDN

### Internationalization
- **@nuxtjs/i18n**: Module configured for EN/IT
- **Translation files location**: `i18n/locales/` (NOT `locales/`)
  - `i18n/locales/en.json` - English translations
  - `i18n/locales/it.json` - Italian translations
- **Lazy loading**: Translations loaded on demand
- **Browser detection**: Automatically detects user language
- **Cookie persistence**: Language preference saved in cookie
- **IMPORTANT**: When adding new fields to forms, ALWAYS update ALL translation files (en.json AND it.json)

### UI Components Best Practices
- **Use Native Nuxt UI Components**: ALWAYS use built-in Nuxt UI components instead of creating custom ones
  - Available components: https://ui.nuxt.com/components
  - Common components: `UButton`, `UInput`, `UTextarea`, `USelect`, `USelectMenu`, `UPopover`, `UCard`, `UFormField`, `UIcon`, `UBadge`, `UTooltip`, `UModal`, `UNotifications`
  - DO NOT create custom wrappers or reinvent existing Nuxt UI components
  - Check documentation before creating any new component
- **Grid layouts**: Use Tailwind's `grid` with `md:grid-cols-3` for responsive 3-column layouts
- **Column spanning**: Wrap fields in `<div class="md:col-span-2">` to make them span multiple columns
- **Full width inputs**: Always add `class="w-full"` to both `UFormField` and input components to fill container
- **USelectMenu**: Always specify both `value-attribute` and `label-attribute` for proper binding
- **Consistent spacing**: Use `mb-6` for section headers, `space-y-6` for form sections
- **Section headers**: All form sections have a colored bar + title: `<div class="flex items-center gap-2 mb-6">`

### Best Practices Followed
- ✅ All data remains client-side (localStorage only)
- ✅ No backend/server requirements
- ✅ All form components access store directly (no props/emit for data)
- ✅ Components follow Nuxt naming convention (prefix with folder name)
- ✅ TypeScript interfaces for type safety
- ✅ Accessibility features (semantic HTML, ARIA labels)
- ✅ Responsive design (mobile-first with Tailwind breakpoints)
- ✅ Privacy-focused (no analytics, no external calls except fonts)
- ✅ Modern plugin format with `async setup()` and `parallel: true`

## Current Status

### ✅ Completed Features

#### Core Infrastructure
- ✅ Project initialized with Nuxt 4
- ✅ Nuxt UI installed and configured
- ✅ Pinia state management configured
- ✅ i18n internationalization (EN/IT) configured
- ✅ Auto-persist plugin for localStorage

#### Data Management
- ✅ ICE Store (Pinia) with full data structure
  - Personal Information (name, age, blood type)
  - Medical Information (allergies, conditions, medications, notes)
  - Emergency Contacts (unlimited, with phone/email)
  - Additional Information (doctor, insurance, special instructions)
- ✅ Automatic localStorage persistence via plugin
- ✅ Reactive state management (no manual save/load needed)
- ✅ Data import/export (JSON)

#### Form Interface
- ✅ Modular form components structure (`app/components/Form/`)
  - `FormPersonalInfo.vue` - Name, age, blood type
  - `FormMedicalInfo.vue` - Allergies, conditions, medications, notes
  - `FormEmergencyContacts.vue` - Dynamic contact list with add/remove
  - `FormAdditionalInfo.vue` - Doctor, insurance, instructions
- ✅ Form validation
- ✅ Real-time auto-save to store
- ✅ Multi-language support (EN/IT)
- ✅ Responsive layout (mobile/tablet/desktop)

#### HTML Export
- ✅ Standalone HTML generation with inline CSS
- ✅ Emergency-optimized design:
  - Large, prominent name display at top
  - Primary/Secondary contacts with prominent call buttons
  - Green call-to-action buttons with phone numbers
  - Email buttons with mailto: links
  - Clear visual hierarchy
- ✅ Clickable phone numbers (`tel:` links)
- ✅ Clickable email addresses (`mailto:` links)
- ✅ Nuxt UI-inspired styling (Public Sans font, matching colors)
- ✅ Conditional sections (only shows filled data)
- ✅ Print-friendly CSS
- ✅ Mobile-optimized layout

#### Preview System
- ✅ Live preview page (`/preview`)
- ✅ Real-time updates from store
- ✅ Download HTML from preview
- ✅ Refresh preview functionality
- ✅ Iframe with auto-height adjustment

#### User Experience
- ✅ Dark mode support (via Nuxt UI)
- ✅ Language switcher (EN/IT)
- ✅ Reset form functionality
- ✅ Toast notifications for actions
- ✅ Loading states and error handling

### ⏳ Pending Features

- ⏳ NFC size optimization
- ⏳ QR code generation
- ⏳ PDF export option
- ⏳ Template system (children, elderly, pets)
- ⏳ Data encryption option
- ⏳ Cloud backup (optional)
- ⏳ PWA features (offline support)
- ⏳ Multiple profiles support
