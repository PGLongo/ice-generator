# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.4](https://github.com/PGLongo/ice-generator/compare/v0.1.3...v0.1.4) (2025-10-21)


### Features

* implement imperative API for dialogs with show/hide methods ([c52beb9](https://github.com/PGLongo/ice-generator/commit/c52beb958c074f30ff2a4f82ffde5068782ec525))


### Bug Fixes

* bot ([4bac31b](https://github.com/PGLongo/ice-generator/commit/4bac31bd5f814a0168b777516ce54b35c5aad816))
* resolve LocalForage persistence issues with reactive objects ([b1d8e40](https://github.com/PGLongo/ice-generator/commit/b1d8e40df12405024d3fc1b2f30c0a3efb8d7afb))


### Documentation

* update README and CLAUDE.md for SmICE v0.1.3 launch ([e7e5a70](https://github.com/PGLongo/ice-generator/commit/e7e5a704246768f762acbf438e26d418776ffadf))

### [0.1.3](https://github.com/PGLongo/ice-generator/compare/v0.1.2...v0.1.3) (2025-10-20)


### Features

* add github-scrum-master agent configuration ([32736ed](https://github.com/PGLongo/ice-generator/commit/32736edb2f82bdc7e11cbfe15ccd9bb832654d0e))
* add i18n translations for URL data load toast notifications ([a9b1630](https://github.com/PGLongo/ice-generator/commit/a9b1630a382f41951df68217a4f4643c563b91c6))
* add modal confirmation on delete ([c025db7](https://github.com/PGLongo/ice-generator/commit/c025db7314626e9724db5ce1eef317faba804eb9))
* add strict TypeScript configuration ([45b7bec](https://github.com/PGLongo/ice-generator/commit/45b7bec16a72d50fca1ca3312690d41c65a03db5))
* implement LocalForage migration for enhanced data persistence ([26b348a](https://github.com/PGLongo/ice-generator/commit/26b348a291edf4c9c981266c0cac50fcf2024442)), closes [#2](https://github.com/PGLongo/ice-generator/issues/2) [#3](https://github.com/PGLongo/ice-generator/issues/3) [#4](https://github.com/PGLongo/ice-generator/issues/4)
* rebrand to SmICE with unified landing page and enhanced features ([91e45c5](https://github.com/PGLongo/ice-generator/commit/91e45c5d634ae5f34944b2fc8d99faaf6de265ce))


### Bug Fixes

* prevent duplicate toast notifications on URL data load ([0e64f58](https://github.com/PGLongo/ice-generator/commit/0e64f58403d2e1b4fc8d93d41f2a9fff9e250061))
* replace UDivider with USeparator for Nuxt UI v4 compatibility ([ee88d48](https://github.com/PGLongo/ice-generator/commit/ee88d484fa351858b789000981049d7dd5d4ffae))


### Code Refactoring

* remove optional chaining for school object and simplify form bindings ([147283a](https://github.com/PGLongo/ice-generator/commit/147283a60f431e3bfa433ceed0c891c9497e2c48))
* use useHref composable for phone links in school page ([03d48fd](https://github.com/PGLongo/ice-generator/commit/03d48fd8272dcb7455edcb4a2063ca77aa0140c7))


### Documentation

* add github-scrum-master agent workflow documentation ([dd74438](https://github.com/PGLongo/ice-generator/commit/dd744382a148ddbecefb51871a439e86682bae56))
* enforce strict permission requirements for github-scrum-master agent ([1c0e3fa](https://github.com/PGLongo/ice-generator/commit/1c0e3fa75aa5941c8d4526e80d7d712712e31a96))
* update CLAUDE.md with cleaner code principles ([64b7b69](https://github.com/PGLongo/ice-generator/commit/64b7b6951a0c3ef63066d5f02a9e9e44e752577e))

### [0.1.2](https://github.com/PGLongo/ice-generator/compare/v0.1.1...v0.1.2) (2025-10-17)


### Bug Fixes

* section location in form ([6727cbc](https://github.com/PGLongo/ice-generator/commit/6727cbc81b453a0fd70539f65cce5a02462e1f37))

### [0.1.1](https://github.com/PGLongo/ice-generator/compare/v0.1.0...v0.1.1) (2025-10-17)


### Features

* add loading state to school page ([8b542a8](https://github.com/PGLongo/ice-generator/commit/8b542a8e8bc8b867c487fb5a4cc6527a0e657242))
* add QR code to school card referent section ([d3fc793](https://github.com/PGLongo/ice-generator/commit/d3fc793f9ec7180a56c244399a1cd7e5c36a0c93))
* add school card feature with printable layout ([90135e2](https://github.com/PGLongo/ice-generator/commit/90135e28012e03d0daea4e7f9ec03ba29f0cf6aa))
* improve preview personal info display with labels ([4749e47](https://github.com/PGLongo/ice-generator/commit/4749e47328332e6ce6de9088edbecbe9984ae6f8))


### Bug Fixes

* add dateOfBirth to URL serialization ([06bdfd8](https://github.com/PGLongo/ice-generator/commit/06bdfd84d8f44d0e604dea85da86cd9aea9d8b67))
* configure icon client bundle for static deployment ([32f8f8b](https://github.com/PGLongo/ice-generator/commit/32f8f8bfa25baf7bc225a17ea570b0160fb1be10))
* improve preview header alignment and visual balance ([19dd730](https://github.com/PGLongo/ice-generator/commit/19dd7302a7eed542086540b7945cb4f6f1245e3c))
* remove max-width limit on school card for print layout ([7471b36](https://github.com/PGLongo/ice-generator/commit/7471b36ef4d2b386c4eb7e050c1c8745378037e9))
* resolve 500 error on school page refresh ([7d4a9b2](https://github.com/PGLongo/ice-generator/commit/7d4a9b2a89e822ce940dd56eac4b63b5fbe009e0))
* use heart icon for blood type and keep city/address visible ([da39075](https://github.com/PGLongo/ice-generator/commit/da39075fb57722c053f41650493ec6e017e45b98))


### CI/CD

* deploy only on version tags instead of every main push ([bb0aa22](https://github.com/PGLongo/ice-generator/commit/bb0aa22a9ac0e4de2bf494db8098d9615af670c5))


### Documentation

* modernize README with badges, emojis, and better structure ([c7b361e](https://github.com/PGLongo/ice-generator/commit/c7b361e2fff208ab0453c2b866172bf61b8d2215))
* update CLAUDE.md with composables best practices and QR code system ([f46b3ce](https://github.com/PGLongo/ice-generator/commit/f46b3cec0a580dcd377cc4495b918508d0fd608e))


### Code Refactoring

* create reusable loading composable and component ([60bc111](https://github.com/PGLongo/ice-generator/commit/60bc1112ad14b1cc5a9abd79c0d61ec060b6dd9f))
* organize TypeScript interfaces following Nuxt best practices ([a2efdcd](https://github.com/PGLongo/ice-generator/commit/a2efdcdd3ad501b0e98301ccbdc5403713bbec79))
* unify QR code generation with useQRCode and useHref composables ([cac6041](https://github.com/PGLongo/ice-generator/commit/cac60412c383e0a7f097fbe9c924021bada5e7e8))
* use i18n translations in LoadingState component ([4b5ae63](https://github.com/PGLongo/ice-generator/commit/4b5ae63536fa8b3fd5a1135309c53d41d967e66a))

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
