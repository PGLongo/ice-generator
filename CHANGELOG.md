# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.1.0](https://github.com/PGLongo/ice-generator/compare/v0.0.1...v0.1.0) (2025-10-16)


### Features

* add confirmation dialog for contact deletion ([263dec1](https://github.com/PGLongo/ice-generator/commit/263dec19d52dfa21950a77f3624867aaff69aba8))
* redesign header with app branding and GitHub link ([7e573a9](https://github.com/PGLongo/ice-generator/commit/7e573a95f4e5ea3f0002a73fcb920ac77d0dd283))
* redesign preview page with modern mobile-first UI ([4c23d08](https://github.com/PGLongo/ice-generator/commit/4c23d08f2253017feb047ab345983d064f1310dc))
* replace HTML download with QR code generation ([a7e31f5](https://github.com/PGLongo/ice-generator/commit/a7e31f5b602699d7abbde73cb8df0c555a68a4f8))
* use compressed encoding for shareable links ([0077c4c](https://github.com/PGLongo/ice-generator/commit/0077c4c4b5a5233fa092ece49586ea6f2ef518c9))


### Bug Fixes

* add missing label-attribute to language selector ([aa100a8](https://github.com/PGLongo/ice-generator/commit/aa100a8087d4fc1692355085c5ffee4c0fa2cc3e))
* correct LanguageSelect implementation with USelectMenu ([5d0d312](https://github.com/PGLongo/ice-generator/commit/5d0d312f6d1312c63aab9f0f319d08327a79a14e))
* layout ([4c173b3](https://github.com/PGLongo/ice-generator/commit/4c173b35c657e076b562866dd562f241c8b558d7))
* remove duplicated text ([a90c1c8](https://github.com/PGLongo/ice-generator/commit/a90c1c8a1c8ecafa2ddf130baa8be37e9112aed7))
* replace USelectMenu with UPopover-based LanguageSelect ([a4cdc1d](https://github.com/PGLongo/ice-generator/commit/a4cdc1dc42c22fcaec4f5ed23bb1b3c9420ec60c))
* simplify LanguageSelect with UPopover and flags ([b288e89](https://github.com/PGLongo/ice-generator/commit/b288e896c6dd22304daad7f082475cb854092800))
* use ULocaleSelect correctly with proper locale imports ([63a0f10](https://github.com/PGLongo/ice-generator/commit/63a0f10f5f229217b811e02639bab0db50026d61))


### Code Refactoring

* use ULocaleSelect component from Nuxt UI ([fe25aef](https://github.com/PGLongo/ice-generator/commit/fe25aef547bbe2607e8e84e54761c0e0c1fab510))


### Documentation

* update README with new features for v0.1.0 ([556a46f](https://github.com/PGLongo/ice-generator/commit/556a46f26a55c7b0982a509191b0f0057dcd881e))

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
