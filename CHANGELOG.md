# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 0.0.1 (2025-10-16)

Initial release of ICE Generator - A web application for creating and exporting emergency contact information.

#### Features

* ✨ Create and edit emergency contact information forms
* 📝 Personal information section (name, age, blood type, location)
* 💊 Medical information section (allergies, conditions, medications, notes)
* 👥 Emergency contacts management (unlimited contacts with phone/email)
* ℹ️ Additional information (doctor, insurance, special instructions)
* 📤 Export to standalone HTML files optimized for NFC tags
* 🔗 Generate shareable URLs with compressed data
* 🌍 Multi-language support (English, Italian)
* 🌓 Dark mode support
* 💾 Local storage persistence
* 📱 Fully responsive design

#### Build System

* 🔧 Configure conventional commits and standard-version ([dab59fd](https://github.com/PGLongo/ice-generator/commit/dab59fd1c9989e0c3a2d9ffa929da5ca794eabb7))

#### CI/CD

* 🚀 GitHub Pages deployment workflow
* ⚙️ Official Nuxt GitHub Pages preset configuration

#### Code Refactoring

* 🎨 Standardize form layouts with 6-column grid system
* ♻️ Improve FormEmergencyContacts grid layout

#### Bug Fixes

* 🐛 Correct shareable URL generation for GitHub Pages
* 🔧 Configure GitHub Pages asset loading with cdnURL and nitro baseURL

#### Technical Stack

* **Framework**: Nuxt 4.1.3
* **UI Library**: Nuxt UI 4.0.1
* **Language**: TypeScript
* **State Management**: Pinia
* **Styling**: Tailwind CSS
* **i18n**: @nuxtjs/i18n
