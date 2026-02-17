# CLAUDE.md - CareCard Project Documentation

## Project Overview

CareCard is a modern emergency contact platform that unifies emergency contact information with smart technology. Built with Nuxt 4 and Nuxt UI, it bridges the gap between location tracking devices (AirTag, Samsung SmartTag, Tile) and emergency contact information through QR codes, NFC tags, and PDF generation.

## Project Goals

1. **Smart Integration** - Bridge the gap between location tracking and emergency contact information
2. **Universal Applications** - Support children, pets, luggage, valuables, elderly care use cases
3. **PDF Generation** - Create professional emergency cards with embedded QR codes
4. **NFC Optimization** - Generate compressed URLs optimized for NFC tag storage limits
5. **Direct Communication** - Enable direct calling/emailing from QR code scans using tel:/mailto: protocols

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
carecard/
├── app/
│   ├── app.vue                          # Main application layout (header, footer, navigation)
│   ├── pages/
│   │   ├── index.vue                    # Landing page with animated hero section
│   │   ├── form.vue                     # Main emergency form page (moved from index)
│   │   ├── preview.vue                  # Data preview page with iframe
│   │   └── school.vue                   # School card page
│   ├── components/
│   │   ├── Form/
│   │   │   ├── FormPersonalInfo.vue     # Personal data form section
│   │   │   ├── FormMedicalInfo.vue      # Medical data form section
│   │   │   ├── FormEmergencyContacts.vue # Contacts list with add/remove
│   │   │   ├── FormAdditionalInfo.vue   # Additional info form section
│   │   │   └── FormSchoolInfo.vue       # School info form section
│   │   ├── AppLogo.vue                  # CareCard logo with subtitle
│   │   └── TemplateMenu.vue             # App navigation menu
│   ├── composables/
│   │   ├── useIcePDF.ts                 # PDF generation with embedded QR codes
│   │   ├── useIceUrlShare.ts            # URL encoding/decoding with compression
│   │   ├── useQRCode.ts                 # QR code generation (static and reactive)
│   │   └── useHref.ts                   # Format hrefs (tel:, mailto:)
│   ├── stores/
│   │   └── ice.ts                       # Pinia store for emergency data
│   ├── types/
│   │   └── ice.ts                       # TypeScript interfaces (IceData, EmergencyContact)
│   ├── plugins/
│   │   └── pinia.client.ts              # Auto-persist plugin for localStorage
│   └── assets/
│       └── css/
│           └── main.css                 # Global styles
├── i18n/
│   └── locales/
│       ├── en.json                      # English translations (with landing section)
│       └── it.json                      # Italian translations (with landing section)
├── public/                              # Static assets
├── nuxt.config.ts                       # Nuxt configuration
├── package.json                         # Project dependencies (name: "carecard")
├── tsconfig.json                        # TypeScript configuration
├── README.md                            # User-facing documentation
└── CLAUDE.md                            # This file - AI assistant context
```

## Key Features to Implement

### 1. Emergency Data Form
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

### 3. Smart Export System
- **PDF Generation**: Professional emergency cards with embedded QR codes using jsPDF
- **NFC Links**: Compressed URLs optimized for NFC tag storage constraints
- **QR Codes**: Enhanced with tel:/mailto: protocols for direct calling/emailing
- **Location Tracker Integration**: Compatible with AirTag, Samsung SmartTag2, Tile
- **Multi-format Support**: Covers all use cases from children to pets to valuables

### 4. CareCard Landing & Preview
- **Animated Landing Page**: Hero section showing NFC + QR + Tags → CareCard unity
- **Nicolò's Story**: Real-world inspiration case study with universal applications
- **Live Preview**: Iframe-based preview with real-time updates from Pinia store
- **Use Case Examples**: Children, pets, luggage, elderly care, valuables

## NFC Tag Considerations

- **NTAG213**: 144 bytes user memory (~140 bytes after URL)
- **NTAG215**: 504 bytes user memory
- **NTAG216**: 888 bytes user memory
- **MIFARE Classic 1K**: ~700 bytes user memory

CareCard optimizes for NFC storage by:
- **URL Compression**: Gzip compression using pako library
- **Smart Routing**: Direct links to forms with pre-filled data
- **Fallback Strategy**: QR codes for larger data when NFC limits exceeded
- **Progressive Enhancement**: Works with any NFC-enabled device or app

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

### CareCard-Specific Dependencies
- `jspdf`: PDF generation for emergency cards
- `qrcode`: QR code generation with tel:/mailto: protocols
- `pako`: URL compression for NFC optimization
- `@nuxtjs/i18n`: Complete internationalization (EN/IT)

### UI Dependencies (via @nuxt/ui)
- `@nuxtjs/color-mode`: Dark mode support
- `@nuxt/icon`: Icon system
- `@nuxt/fonts`: Font optimization
- `tailwindcss`: Utility-first CSS

## Project Management

### GitHub Projects & Scrum Workflow

**CRITICAL: ALWAYS use the `github-scrum-master` agent for ALL project management tasks:**

- ✅ **Tasks**: Creating, updating, prioritizing all work items
- ✅ **Bugs**: Reporting, tracking, managing bug fixes  
- ✅ **Epics**: Large features broken into smaller stories
- ✅ **User Stories**: Feature requirements with acceptance criteria
- ✅ **Sprint Planning**: Organizing backlog and sprint cycles
- ✅ **Backlog Management**: Prioritizing and organizing work items

**GitHub Project Board**: https://github.com/users/PGLongo/projects/1

**Workflow Rules:**
1. **Never manually create GitHub issues** - Always delegate to `github-scrum-master` agent
2. **All work items must be tracked** in the GitHub project board
3. **Use proper Scrum artifacts**: Epics → User Stories → Tasks → Bugs
4. **Update project board status** as work progresses (Todo → In Progress → Done)
5. **Include acceptance criteria** for all user stories
6. **Estimate story points** for better sprint planning
7. **Link related issues** (dependencies, sub-tasks, etc.)

**MANDATORY github-scrum-master Agent Requirements:**
1. **English Language**: Agent MUST write all GitHub content (titles, descriptions, comments) in English
2. **AUTO-PROCEED**: Agent can create GitHub issues directly without asking permission (updated workflow)
3. **PREVIEW FOR UPDATES**: When updating existing issues, show preview before modifying
4. **CONTENT REVIEW**: Before implementing existing issues, review and confirm requirements with user
5. **BATCH OPERATIONS**: For multiple items, create them efficiently in sequence

**Agent Usage Examples:**
- "Create a user story for PDF export functionality"
- "Add a bug report for QR code generation issues"  
- "Update the sprint board with completed tasks"
- "Prioritize the backlog for next sprint"

**API Development Standards:**
When creating API-related user stories, the agent MUST follow these standards:
- **RESTful Conventions**: Use plural nouns for endpoints (e.g., `/api/ices`, not `/api/ice`)
- **HTTP Status Codes**: Follow standard codes (200, 201, 400, 404, 422, 500)
- **Documentation**: All APIs must include Swagger/OpenAPI documentation
- **Validation**: Implement request/response validation with appropriate libraries
- **Storage**: Use IndexedDB via LocalForage (not traditional databases)
- **Synchronization**: Mention Pinia store synchronization for reactive updates
- **Error Handling**: Standardized error response format across all endpoints
- **Security**: Include input sanitization and validation requirements

**Expected Agent Behavior:**
```
Agent: I will prepare the following items for creation:

EPIC:
Title: "Add PDF Export Feature for Emergency Cards"
Description: "Enable users to export emergency information as PDF files..."
Labels: epic, feature
Story Points: 13

USER STORY #1:
Title: "Design PDF Export Interface"
Description: "As a user, I want a clear PDF export button..."
Acceptance Criteria: [detailed list]
Labels: user-story, ui
Story Points: 5

USER STORY #2:
Title: "Implement PDF Generation Logic"
Description: "As a developer, I need to create PDF generation..."
Acceptance Criteria: [detailed list]
Labels: user-story, backend
Story Points: 8

May I proceed to create these items in the GitHub project board?
```

**CRITICAL VIOLATION EXAMPLE - NEVER DO THIS:**
❌ Agent directly creates items without showing preview
❌ Agent creates items without asking permission
❌ Agent says "proceeding now" without waiting for confirmation

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
  - `IceData` - Complete emergency data structure with personal, medical, and emergency contact information
  - `EmergencyContact` - Single emergency contact with name, relationship, phone, email
- **Auto-imported**: Nuxt auto-imports types from `app/types/` so you can use them without explicit imports in Vue components
- **Best practice**: Public domain interfaces go in `app/types/`, internal/implementation interfaces stay in their respective files
- **IMPORTANT**: ALWAYS export types and interfaces from composables using `export type` and `export interface`
  - This allows reusability across the codebase
  - Example: `export type QRCodeValue = ...` in `useQRCode.ts`
  - Never keep types internal unless explicitly needed only within that file

### State Management
- **Pinia Store**: All emergency data is stored in a single reactive Pinia store (`useIceStore`)
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
**IMPORTANT: Components use props/v-model/emit. Pinia stores are used ONLY in pages.**

See rule: `.claude/rules/frontend/40-component-store-separation.md`

- **Props/v-model**: Components receive data via `defineProps` and `v-model`
- **Emit changes**: Components emit `update:modelValue` on every change
- **Store in pages only**: Pages (`app/pages/`) import Pinia stores and pass data to components
- **No store in components**: Components in `app/components/` NEVER import stores directly
- **Modular**: Each form section is a separate component in `app/components/Form/`
- **Validation**: Client-side validation with required fields (name, age)
- **Auto-save**: Data persists on every change via store subscription in pages

**Benefits of this architecture:**
- ✅ Components are reusable and testable in isolation
- ✅ Clear unidirectional data flow (page → component via props, component → page via emit)
- ✅ No coupling between components and specific stores
- ✅ Better type safety with TypeScript
- ✅ Consistent pattern across all form components

**Example pattern:**

Page (`app/pages/form/school.vue`):
```vue
<script setup lang="ts">
const store = useSchoolFormStore()
</script>

<template>
  <FormSchoolInfo v-model="store.data.school" />
  <FormPeopleList v-model="store.data.people" />
</template>
```

Component (`app/components/Form/FormSchoolInfo.vue`):
```vue
<script setup lang="ts">
import type { SchoolData } from '@/types/school'

const props = defineProps<{
  modelValue: SchoolData
}>()

const emit = defineEmits<{
  'update:modelValue': [value: SchoolData]
}>()

const updateField = (field: keyof SchoolData, value: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<template>
  <UInput
    :model-value="modelValue.name"
    @update:model-value="updateField('name', $event)"
  />
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

### UI Design System & Stylistic Guide

The app uses a **refined glassmorphism** aesthetic: dark-first, panel-based layout with subtle depth and color-coded semantics.

#### Panels
All content panels use the `.preview-panel` pattern:
```css
/* Light */
background: var(--ui-bg-elevated);
border: 1px solid var(--ui-border);
box-shadow: 0 8px 32px -8px rgba(0,0,0,0.08), 0 4px 16px -4px rgba(0,0,0,0.04);

/* Dark */
background: linear-gradient(165deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0.08) 100%);
border-color: rgba(255,255,255,0.07);
box-shadow: 0 16px 48px -12px rgba(0,0,0,0.4), 0 8px 24px -8px rgba(0,30,80,0.15);
```

#### CSS Variables (Nuxt UI tokens)
Always use semantic tokens — never hardcode colors:
- `var(--ui-text-highlighted)` — primary text (names, values)
- `var(--ui-text)` — normal text
- `var(--ui-text-muted)` — secondary labels
- `var(--ui-text-dimmed)` — tertiary / meta text
- `var(--ui-bg-elevated)` — panel/card backgrounds
- `var(--ui-border)` — dividers and borders

#### Typography Scale
| Role | Class | Usage |
|------|-------|-------|
| Hero name | `text-2xl font-extrabold` | Person name in preview |
| Section header | `text-xs font-bold tracking-[0.15em] uppercase` | Panel titles |
| Sub-label | `text-[11px] font-bold tracking-[0.15em] uppercase` | Field labels inside panels |
| Body value | `text-sm font-semibold` | Field values |
| Meta / mono | `text-xs font-mono` | Phone numbers, codes |
| Micro badge | `text-[10px] font-bold tracking-wider uppercase` | Tags like "PRIMARY" |

#### Color Semantics
Use consistently across the app:
| Color | Meaning | Example |
|-------|---------|---------|
| `red-500` | Blood type / medical alert | Blood type badge |
| `amber-500` | Warning / allergy | Allergy badges, special instructions |
| `emerald-500` | Phone / action | Call button |
| `blue-500` | Email / link | Mail button |
| `cyan-500` | Doctor / healthcare | Doctor icon |
| `violet-500` | Medication | Pill badges |

#### Icon + Color Badge Pattern
Used for list items with semantic color coding:
```html
<div class="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
  <UIcon name="i-lucide-stethoscope" class="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400"></UIcon>
</div>
```
- Background: `bg-{color}-500/10` (10% opacity)
- Icon: `text-{color}-500 dark:text-{color}-400`
- Size: `w-7 h-7` for medium, `w-8 h-8` for large

#### Data-driven Rows
When 3+ rows share identical structure, use a computed array + `v-for`:
```ts
const items = computed(() => [
  { value: props.doctor, icon: '...', bg: 'bg-cyan-500/10', color: 'text-cyan-500 dark:text-cyan-400', label: t('preview.doctor') },
  // ...
].filter(item => item.value))
```
**Important**: define all Tailwind classes as full strings in the array — never interpolate (`bg-${color}-500`) or Tailwind won't include them in the build.

#### Dividers
```html
<div class="h-px bg-[var(--ui-border)] mx-4"></div>  <!-- inset -->
<div class="h-px bg-[var(--ui-border)] mb-3"></div>   <!-- full width -->
```

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

### Composables Best Practices
**CRITICAL RULES - ALWAYS FOLLOW:**

1. **Separation of Concerns**: Create specific composables for distinct purposes
   - ✅ GOOD: `useHref` for formatting links, `useQRCode` for generating QR codes
   - ❌ BAD: Mixing QR code generation and href formatting in one composable

2. **Single Responsibility**: Each composable should do ONE thing well
   - `useHref` = format `tel:`, `mailto:` links
   - `useQRCode` = generate QR codes (uses `useHref` internally for wrappers)
   - Never create "god composables" that do everything

3. **Function Overloading for Unified APIs**: Use TypeScript overloading to handle static vs reactive
   - ✅ GOOD: `generatePhoneQR(phone: string)` and `generatePhoneQR(phone: Ref<string>)` as overloads
   - ❌ BAD: Separate functions like `generatePhoneQR` and `generateReactivePhoneQR`
   - Detect input type automatically with `isRef()` and return appropriate type

4. **Always Export Types**: Make composable types reusable
   - ✅ ALWAYS: `export type QRCodeValue = ...`, `export interface QRCodeOptions = ...`
   - ❌ NEVER: Keep types internal unless explicitly scoped to that file only

5. **Smart Wrappers**: Create convenience functions that encapsulate common patterns
   - Example: `generatePhoneQR()` internally calls `generateQRCode(tel(phone))`
   - This keeps the API clean and intention-revealing

6. **Type Safety**: Return types should match input types
   - String input → `Promise<string>`
   - Ref input → `Ref<string>`
   - Use proper function overloading signatures

### General Best Practices Followed
**PRIORITY: Always strive for cleaner, simpler, and more type-safe code**

- ✅ All data remains client-side (localStorage only)
- ✅ No backend/server requirements
- ✅ All form components access store directly (no props/emit for data)
- ✅ Direct v-model bindings without intermediate computed properties (unless transforming data)
- ✅ No optional chaining - nested objects always initialized as `{}`
- ✅ Components follow Nuxt naming convention (prefix with folder name)
- ✅ TypeScript strict mode for maximum type safety
- ✅ Accessibility features (semantic HTML, ARIA labels)
- ✅ Responsive design (mobile-first with Tailwind breakpoints)
- ✅ Privacy-focused (no analytics, no external calls except fonts)
- ✅ Modern plugin format with `async setup()` and `parallel: true`
- ✅ Composables follow single responsibility and separation of concerns
- ✅ Consistent code patterns across the entire codebase

## Current Status

### ✅ Completed Features

#### Core Infrastructure
- ✅ Project initialized with Nuxt 4
- ✅ Nuxt UI installed and configured
- ✅ Pinia state management configured
- ✅ i18n internationalization (EN/IT) configured
- ✅ Auto-persist plugin for localStorage

#### Data Management
- ✅ Emergency Store (Pinia) with full data structure
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

#### CareCard Export System (v0.1.3)
- ✅ **PDF Generation** - Professional emergency cards with embedded QR codes using jsPDF
- ✅ **NFC Optimization** - Compressed URLs using pako for tag storage limits
- ✅ **Enhanced QR Codes** - tel:/mailto: protocols for direct calling/emailing
- ✅ **Location Tracker Integration** - AirTag, Samsung SmartTag2, Tile compatibility information
- ✅ **Removed HTML Export** - Replaced with more practical PDF + QR + NFC solution
- ✅ Emergency-optimized design maintained in PDF format
- ✅ Direct communication functionality from QR scans

#### CareCard Landing & Preview System (v0.1.3)
- ✅ **Landing Page** - Complete redesign with animated hero section (index.vue)
- ✅ **Animated Transition** - NFC + QR + Tags → CareCard unity visualization
- ✅ **Nicolò's Story** - Real-world inspiration with universal use case examples
- ✅ **Form Separation** - Main form moved to /form route for better UX
- ✅ **Live Preview** - Iframe-based preview with real-time store updates
- ✅ **Use Case Integration** - Children, pets, luggage, elderly, valuables
- ✅ **Location Tracker Info** - AirTag, Samsung SmartTag2, Tile integration guides

#### CareCard User Experience (v0.1.3)
- ✅ **Complete Rebranding** - Emergency Card Generator → CareCard across all components
- ✅ **Enhanced Navigation** - TemplateMenu → proper app navigation structure
- ✅ **Updated Branding** - AppLogo with "NFC + QR + Tags" subtitle
- ✅ **Package Rename** - package.json name changed to "carecard"
- ✅ **Comprehensive i18n** - Landing page translations in EN/IT
- ✅ Dark mode support (via Nuxt UI)
- ✅ Reset form functionality
- ✅ Toast notifications for actions
- ✅ Loading states and error handling

#### QR Code System
- ✅ Unified QR code composable (`useQRCode`)
  - Function overloading for static/reactive generation
  - `generateQRCode()` - Universal function (string or Ref input)
  - `generatePhoneQR()` - Wrapper for phone numbers (tel: protocol)
  - `generateEmailQR()` - Wrapper for emails (mailto: protocol)
- ✅ Href formatting composable (`useHref`)
  - `tel()` - Format phone numbers for clickable links
  - `mailto()` - Format email addresses for clickable links
- ✅ QR code in school card (call referent directly)
- ✅ Download QR code as PNG from main form
- ✅ Single library dependency: `qrcode` (8k GitHub stars)

### ⏳ Pending Features (v0.1.4+)

**IMPORTANT: Use `github-scrum-master` agent to convert these to proper GitHub issues**

- ⏳ **Photo Integration** - Medical/ID card photos in PDFs
- ⏳ **Template System** - Dedicated pet, elderly, child templates
- ⏳ **Emergency Notifications** - Alert system integration
- ⏳ **Medical Templates** - Pre-filled condition/medication templates
- ⏳ **Data Encryption** - Optional privacy enhancement
- ⏳ **Cloud Backup** - Privacy-focused optional sync
- ⏳ **PWA Features** - Offline support and mobile app capabilities
- ⏳ **Analytics** - Usage insights while maintaining privacy
- ⏳ **Additional Languages** - Beyond EN/IT support

**Backlog Management Note**: All pending features should be tracked as Epics or User Stories in the GitHub project board. Use the `github-scrum-master` agent to:
1. Create epics for major features (Photo integration, Template system, PWA features)
2. Break down epics into user stories with acceptance criteria
3. Prioritize backlog items based on user value and technical dependencies
4. Estimate story points for sprint planning
5. Focus on universal appeal beyond just children use cases

- Always check typescript and eslint error before commit