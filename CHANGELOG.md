# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.3.0](https://github.com/PGLongo/ice-generator/compare/v1.2.1...v1.3.0) (2026-02-24)


### Features

* **component:** add CSV export button to FormPeopleList ([e0e6406](https://github.com/PGLongo/ice-generator/commit/e0e6406e194647a50d33f21078dc43c9732d2d24))
* **component:** add Excel parsing support to FormPeopleList ([d6684d1](https://github.com/PGLongo/ice-generator/commit/d6684d149ee78a913b3e975c10566817fd943c5b))
* **component:** create FormPeopleList component with CSV support ([f18a018](https://github.com/PGLongo/ice-generator/commit/f18a0182f7e615b397e436e5c467c250fabcb271))
* **composable:** add CARD_CONFIG, extract buildPDF, add PDF preview ([a3c847e](https://github.com/PGLongo/ice-generator/commit/a3c847e8ddc8001e21154f483c7cbaf56b62c0ba))
* **composable:** implement school PDF generation with landscape card layout ([44e4e48](https://github.com/PGLongo/ice-generator/commit/44e4e4857ccb3be0f5c27f5db07e3ef20f90dea5))
* **i18n:** add school form translations in EN and IT ([4087681](https://github.com/PGLongo/ice-generator/commit/4087681d47f2b0bd906bef9641c24e60988e0a39))
* **nav:** add School Form link to dashboard sidebar menu ([0811717](https://github.com/PGLongo/ice-generator/commit/08117173fe5419b1eea08b1433e880c08f28d758))
* **nav:** add school form link to navigation menu ([8da99f8](https://github.com/PGLongo/ice-generator/commit/8da99f80a0ebf026739f99de5e9916132c587333))
* **page:** create school form page at /form/school ([40aa1c6](https://github.com/PGLongo/ice-generator/commit/40aa1c661d426aed7bc3941b0ef2f4ae48e55cce))
* **plugin:** add LocalForage persistence for school form store ([ba5926f](https://github.com/PGLongo/ice-generator/commit/ba5926f9099382357af72193e4a1cb66d2f2c9bb))
* **store:** create useSchoolFormStore for school form data ([362fe00](https://github.com/PGLongo/ice-generator/commit/362fe0097a5d75cd5fecc099ee5a8dfb94f0b974))
* **table:** add template for fullName column in UTable ([086bad6](https://github.com/PGLongo/ice-generator/commit/086bad63e454bb54bdc3962d0fa163373dd9d467))
* **types:** create SchoolFormData and Person interfaces ([7892e54](https://github.com/PGLongo/ice-generator/commit/7892e5491d9fed3f7759570eaed4bfb23e826103))
* **ui:** redesign form page with multi-panel glassmorphism layout ([410e043](https://github.com/PGLongo/ice-generator/commit/410e043316ac619604b858197fb4026bc6a532f6))
* **ui:** redesign preview page with glassmorphism panel style ([342bf61](https://github.com/PGLongo/ice-generator/commit/342bf615ac1d25b03e5fc9b2fb5eea29119f77aa))


### Bug Fixes

* **composable:** add rounded card border, logo and icons to school PDF ([53668ff](https://github.com/PGLongo/ice-generator/commit/53668ffebe9195065069bbd99ac85d3c14a10de3))
* **composable:** fix logo, icon visibility, label overlap and space in school PDF ([58a29c0](https://github.com/PGLongo/ice-generator/commit/58a29c01ad9a832d462ee2566bc2281eac7e39d1))
* **composable:** increase label-to-value gap and unify via CARD_CONFIG ([4a0c3b9](https://github.com/PGLongo/ice-generator/commit/4a0c3b94896f00bc9c3506aec46a887ef45ac532))
* **config:** disable SSR for /preview route to prevent hydration mismatch ([93d357d](https://github.com/PGLongo/ice-generator/commit/93d357d6a2273b505847e4dc767077482ef3a71c))
* **i18n:** remove invalid ICU plural syntax from translations ([42cbe29](https://github.com/PGLongo/ice-generator/commit/42cbe29066b4d010844131ff8ab96f4cf647cf7b))
* layout preview ([d44c5f2](https://github.com/PGLongo/ice-generator/commit/d44c5f28fcda198e8699ba14bad297e79bc85857))
* pdf layout ([17aac5c](https://github.com/PGLongo/ice-generator/commit/17aac5ce39342b2eb77d24f79c788faa395bf0c4))
* **plugin:** add explicit SchoolFormData import in pinia-localforage plugin ([4cca341](https://github.com/PGLongo/ice-generator/commit/4cca3414c8eb9a97a861ed993c45c631fdf7bf71))
* **preview:** move phone after mail ([b221f51](https://github.com/PGLongo/ice-generator/commit/b221f516569b2e8be467c0d4745c6759c147ae51))
* **store:** restore reactivity on reload by mutating state properties individually ([26fce29](https://github.com/PGLongo/ice-generator/commit/26fce2999a09bd4f22e538505ef15b652e048999))
* **store:** use $patch(fn) in loadData/clearAll and watchEffect for hasPeople ([6b66c72](https://github.com/PGLongo/ice-generator/commit/6b66c724c19ce8066c65c5624a949bd767cf7890))
* **table:** add explicit id to all columns and use computed ([d9c2ea9](https://github.com/PGLongo/ice-generator/commit/d9c2ea95c6ff54009003de184aec60dcb7cab0f5))
* **table:** add id to actions column in UTable ([369a763](https://github.com/PGLongo/ice-generator/commit/369a76398e1cbf51c06ac025383507abc9877cbd))
* **table:** add key binding to force UTable re-render on data changes ([1d85ee2](https://github.com/PGLongo/ice-generator/commit/1d85ee2d55b89caa5dc556cafe1d6f9f7f382c8b))
* **table:** use Nuxt UI v4 UTable API (data, accessorKey, -cell slots) ([9f6ff76](https://github.com/PGLongo/ice-generator/commit/9f6ff766e152e438f2de5f66202b842be35294c5))
* **table:** use static string labels for UTable columns ([1c0e738](https://github.com/PGLongo/ice-generator/commit/1c0e7387c9bda0966c7e458fe8087078ca5d0658))
* **ui:** fix generate button disabled state by accessing state directly ([b944bc0](https://github.com/PGLongo/ice-generator/commit/b944bc0a75a028df793f3376c4fefd3a75a64ff6))
* **ui:** move allergies to medical info section and improve layout spacing ([f64e4f5](https://github.com/PGLongo/ice-generator/commit/f64e4f571c3813ead0e710b44f519b4d0448b1c9))
* **ui:** persist school info by watching localData instead of [@input](https://github.com/input) events ([76f4800](https://github.com/PGLongo/ice-generator/commit/76f48008c5a14a44f22eb660637e5afed08e46ed))
* **ui:** show phone number inline with relationship in PreviewContacts ([ce804d1](https://github.com/PGLongo/ice-generator/commit/ce804d1002a7a38ec0a61179ad7d3134280382d1))
* **ui:** use explicit watch to sync hasPeople after async store load ([8fc6b8d](https://github.com/PGLongo/ice-generator/commit/8fc6b8d19ad73f20b1b8f9d694444ef7a06e7076))

## [1.2.1](https://github.com/PGLongo/ice-generator/compare/v1.2.0...v1.2.1) (2026-02-10)


### Bug Fixes

* **config:** read app version from package.json instead of git tag ([12a4889](https://github.com/PGLongo/ice-generator/commit/12a4889ca9f55905ba63d4b48cdb3e8c522d53b2))

## [1.2.0](https://github.com/PGLongo/ice-generator/compare/v1.1.0...v1.2.0) (2026-02-10)


### Features

* **i18n:** add navigation link translations ([cbbd707](https://github.com/PGLongo/ice-generator/commit/cbbd7074a28c89ea83a61fb4cf2e63cb7c7e5403))
* implement auto-redirect timer with composable and alert component ([95ec37d](https://github.com/PGLongo/ice-generator/commit/95ec37de0e49293ebf1d93f23c93f9269a8826b7))
* **ui:** add Bluesky to social menu ([43fd600](https://github.com/PGLongo/ice-generator/commit/43fd600715a03f7dd81678bdb8365bbcc330d98e))
* **ui:** add collapsible Social menu to dashboard sidebar ([3df347d](https://github.com/PGLongo/ice-generator/commit/3df347dd28d023afb57475ffcdf7f07fba71c773))
* **ui:** add navigation links to landing page sections ([3f59d86](https://github.com/PGLongo/ice-generator/commit/3f59d86116110975255c2ccdc1cd975523cb15fe))
* **ui:** add QR Code and NFC badges to use cases section ([876b578](https://github.com/PGLongo/ice-generator/commit/876b578c151039b1278c0e2f886581e284faa6a3))
* **ui:** assign landing layout to index page ([97efcbc](https://github.com/PGLongo/ice-generator/commit/97efcbc96cb0772b1769c894e5c4a084e4efb942))
* **ui:** create landing layout from current default ([d34ea74](https://github.com/PGLongo/ice-generator/commit/d34ea74bc32c3613ba60d23b1683cea7668a48b5))
* **ui:** read app version from git tag via runtimeConfig ([c404cdf](https://github.com/PGLongo/ice-generator/commit/c404cdfeba252c5ddda520e013a3207043f41e0d))
* **ui:** redesign landing page in Nuxt Landing Template style ([cfe1364](https://github.com/PGLongo/ice-generator/commit/cfe136419939a9bf9a82307e050740b7a240a220))
* **ui:** replace Medical Equipment with Social Media use case ([cc4c1bb](https://github.com/PGLongo/ice-generator/commit/cc4c1bb2b01564d9a7a20cd12ac141286803e1b1))
* **ui:** replace Work Equipment with Keys use case ([13fcb13](https://github.com/PGLongo/ice-generator/commit/13fcb1320db227a7e787cfec6cb77135ec7471f3))
* **ui:** restore all 6 use cases in landing page ([92ce9f2](https://github.com/PGLongo/ice-generator/commit/92ce9f296b7d5ca7dc6f38f55212830da17d58c6))
* **ui:** restore Story section in landing page ([cbb398a](https://github.com/PGLongo/ice-generator/commit/cbb398addb7ac971bcfe2430372342e46a23dfdf))
* **ui:** rewrite default layout as dashboard with sidebar ([22363a4](https://github.com/PGLongo/ice-generator/commit/22363a442246700c6077723fcced89ed5094c447))
* **ui:** show app version in dashboard sidebar footer ([c7aec4d](https://github.com/PGLongo/ice-generator/commit/c7aec4d63ef6cfdee323794d2ce23b363904e073))


### Bug Fixes

* **ci:** set release-please target-branch to main ([6b51961](https://github.com/PGLongo/ice-generator/commit/6b51961b161f3bca4e397f95a20a6fad7be50c53))
* **ui:** add CareCard logo and name to dashboard navbar ([e44a426](https://github.com/PGLongo/ice-generator/commit/e44a42649e405f736b838ee586cacf1e8aed1cb3))
* **ui:** add DashboardPanel with navbar for mobile toggle ([2ed505d](https://github.com/PGLongo/ice-generator/commit/2ed505ddbe49357229b181ece8f049289ae5fb4a))
* **ui:** hide navbar logo on desktop to avoid duplication ([7d59b1e](https://github.com/PGLongo/ice-generator/commit/7d59b1e8761c374c046624d51752be9c7de64629))
* **ui:** remove duplicate v prefix from version display ([2c9fd85](https://github.com/PGLongo/ice-generator/commit/2c9fd857afca94d2a8695a9ec287dd8e7897c106))

## [1.1.0](https://github.com/PGLongo/ice-generator/compare/v1.0.0...v1.1.0) (2026-01-22)


### Features

* add app logo ([a0db27a](https://github.com/PGLongo/ice-generator/commit/a0db27ac1fc679fade10d421ba438b34a95f4926))
* change base color css ([1179575](https://github.com/PGLongo/ice-generator/commit/11795759e498a9d22bfe57c0d5a6cfe5f7477c5a))
* **preview:** improve layout ([15e3767](https://github.com/PGLongo/ice-generator/commit/15e37676687e10cea17d5a722ddf928d743feb9e))
* **social:** allow custom profile image in instagram generator ([2ee5cf2](https://github.com/PGLongo/ice-generator/commit/2ee5cf2200cdb9a38ba89fc8e41ebf977a128b28))
* **social:** implement copy link functionality for instagram share ([c2cae83](https://github.com/PGLongo/ice-generator/commit/c2cae833171bcbe2b50e0cc517f960b034c128ae))
* **social:** implement native share with fallback ([f7abc5c](https://github.com/PGLongo/ice-generator/commit/f7abc5cc0dacee50a7d1d2f7fb5e7b5fd4d37d6c))
* **social:** update form for manual data entry ([7625b48](https://github.com/PGLongo/ice-generator/commit/7625b4846dee8a34a33d1db2d7111246602eb636))
* **social:** update preview to show manual data ([58d40e9](https://github.com/PGLongo/ice-generator/commit/58d40e94699efc14839765696166031be6bc3a4e))


### Bug Fixes

* home layout ([aa89497](https://github.com/PGLongo/ice-generator/commit/aa89497a7f69b0165a4131cde5fc4a242e20d8f3))
* ig layout ([c635096](https://github.com/PGLongo/ice-generator/commit/c635096a58fdacf177ead523424194e4772463e3))
* **instagram:** remove default props ([6ac5e87](https://github.com/PGLongo/ice-generator/commit/6ac5e8700b2d70ae2a12db1dfa16963b8e5a11ba))
* **instagram:** update userAgents for vercel ([255ded2](https://github.com/PGLongo/ice-generator/commit/255ded26bdcf05902376e124bb1b537881f82d20))
* scrollable layout ([391987f](https://github.com/PGLongo/ice-generator/commit/391987fd9fad2fe9dcafc37d46999705d8c47808))
* showSidebar ([33310c7](https://github.com/PGLongo/ice-generator/commit/33310c73e754ef81b401685fde2d098fb1251eb8))

## [1.0.0](https://github.com/PGLongo/ice-generator/compare/v0.3.0...v1.0.0) (2026-01-21)


### ⚠ BREAKING CHANGES

* Complete rebrand from SmICE to CareCard

### Features

* add confirmation dialog for contact deletion ([263dec1](https://github.com/PGLongo/ice-generator/commit/263dec19d52dfa21950a77f3624867aaff69aba8))
* add Cypress configuration for screenshot testing ([5455098](https://github.com/PGLongo/ice-generator/commit/545509849903d02662683e41e3719bc5b88fd220))
* add Cypress screenshot test specification ([787b072](https://github.com/PGLongo/ice-generator/commit/787b07203b61553aa6658856980f74923ec636d2))
* add example cards carousel to home page ([be0ecd9](https://github.com/PGLongo/ice-generator/commit/be0ecd9ff6639960d2c0ca5e8eb879c3f69716f3))
* add github-scrum-master agent configuration ([32736ed](https://github.com/PGLongo/ice-generator/commit/32736edb2f82bdc7e11cbfe15ccd9bb832654d0e))
* add i18n translations for URL data load toast notifications ([a9b1630](https://github.com/PGLongo/ice-generator/commit/a9b1630a382f41951df68217a4f4643c563b91c6))
* add loading state to school page ([8b542a8](https://github.com/PGLongo/ice-generator/commit/8b542a8e8bc8b867c487fb5a4cc6527a0e657242))
* add luggage card types ([e423f79](https://github.com/PGLongo/ice-generator/commit/e423f791032a954dbc9860e4271b6071ea28f80e))
* add modal confirmation on delete ([c025db7](https://github.com/PGLongo/ice-generator/commit/c025db7314626e9724db5ce1eef317faba804eb9))
* add presentation page with social media preview ([420032a](https://github.com/PGLongo/ice-generator/commit/420032a77dc5c5731ee2e58f6156b7ed1572b2bd))
* add QR code to school card referent section ([d3fc793](https://github.com/PGLongo/ice-generator/commit/d3fc793f9ec7180a56c244399a1cd7e5c36a0c93))
* add school card feature with printable layout ([90135e2](https://github.com/PGLongo/ice-generator/commit/90135e28012e03d0daea4e7f9ec03ba29f0cf6aa))
* add social ([b59def3](https://github.com/PGLongo/ice-generator/commit/b59def3e5f7dcdf8d1462747880cf16154372b3c))
* add strict TypeScript configuration ([45b7bec](https://github.com/PGLongo/ice-generator/commit/45b7bec16a72d50fca1ca3312690d41c65a03db5))
* completely redesign modern toolbar and navigation ([7130508](https://github.com/PGLongo/ice-generator/commit/713050831adb892988b29b442fca4148dbd34c49))
* create CardLuggage component ([d5e70d7](https://github.com/PGLongo/ice-generator/commit/d5e70d74cca45bd513b70b981163e99a0be7c44a))
* extract CardSchool component with object props ([8593440](https://github.com/PGLongo/ice-generator/commit/85934405bebfde405acf51d58c0a614a3ff8551f))
* implement imperative API for dialogs with show/hide methods ([c52beb9](https://github.com/PGLongo/ice-generator/commit/c52beb958c074f30ff2a4f82ffde5068782ec525))
* implement LocalForage migration for enhanced data persistence ([26b348a](https://github.com/PGLongo/ice-generator/commit/26b348a291edf4c9c981266c0cac50fcf2024442))
* implement server-side encryption for URL sharing ([2f07843](https://github.com/PGLongo/ice-generator/commit/2f078437a53117acb615cd1de218a4ae9b4566a2))
* implement social page and project configuration ([a529e29](https://github.com/PGLongo/ice-generator/commit/a529e297aef2b3a0a41273ee37996804d7ff82b3))
* improve language selector with flag icons and better UX ([773f249](https://github.com/PGLongo/ice-generator/commit/773f249448c44bdc71efc53fa9b7d5df7ef75aa3))
* improve preview personal info display with labels ([4749e47](https://github.com/PGLongo/ice-generator/commit/4749e47328332e6ce6de9088edbecbe9984ae6f8))
* integrate real school data from Genova ([9c8fc23](https://github.com/PGLongo/ice-generator/commit/9c8fc233fd3a831f3d886901fe53397631f694b9))
* modernize homepage with contemporary design ([6dc0b7f](https://github.com/PGLongo/ice-generator/commit/6dc0b7f84a072c84bf4a178908caa5af40ef1f93))
* rebrand from SmICE to CareCard ([340ef07](https://github.com/PGLongo/ice-generator/commit/340ef0764acec33fe3800aca70328443ffd0a290))
* rebrand to SmICE with unified landing page and enhanced features ([91e45c5](https://github.com/PGLongo/ice-generator/commit/91e45c5d634ae5f34944b2fc8d99faaf6de265ce))
* redesign header with app branding and GitHub link ([7e573a9](https://github.com/PGLongo/ice-generator/commit/7e573a95f4e5ea3f0002a73fcb920ac77d0dd283))
* redesign preview page with modern mobile-first UI ([4c23d08](https://github.com/PGLongo/ice-generator/commit/4c23d08f2253017feb047ab345983d064f1310dc))
* replace HTML download with QR code generation ([a7e31f5](https://github.com/PGLongo/ice-generator/commit/a7e31f5b602699d7abbde73cb8df0c555a68a4f8))
* update Cypress commands for Nuxt UI components ([f0b7339](https://github.com/PGLongo/ice-generator/commit/f0b7339eeab27809e5a568eb3e265eea11fd2cb8))
* use compressed encoding for shareable links ([0077c4c](https://github.com/PGLongo/ice-generator/commit/0077c4c4b5a5233fa092ece49586ea6f2ef518c9))


### Bug Fixes

* add dateOfBirth to URL serialization ([06bdfd8](https://github.com/PGLongo/ice-generator/commit/06bdfd84d8f44d0e604dea85da86cd9aea9d8b67))
* add missing label-attribute to language selector ([aa100a8](https://github.com/PGLongo/ice-generator/commit/aa100a8087d4fc1692355085c5ffee4c0fa2cc3e))
* apply ESLint formatting and improve emergency contact handling ([0d2273b](https://github.com/PGLongo/ice-generator/commit/0d2273b079000107617c4533dc1600fbc1aceb43))
* bot ([4bac31b](https://github.com/PGLongo/ice-generator/commit/4bac31bd5f814a0168b777516ce54b35c5aad816))
* complete SmICE to CareCard rebrand ([b5169c2](https://github.com/PGLongo/ice-generator/commit/b5169c26cf586bd96ac1212054accdb2f5105ca6))
* configure icon client bundle for static deployment ([32f8f8b](https://github.com/PGLongo/ice-generator/commit/32f8f8bfa25baf7bc225a17ea570b0160fb1be10))
* correct LanguageSelect implementation with USelectMenu ([5d0d312](https://github.com/PGLongo/ice-generator/commit/5d0d312f6d1312c63aab9f0f319d08327a79a14e))
* ensure complete emergency contact filling including phone number ([286b72c](https://github.com/PGLongo/ice-generator/commit/286b72cdd834894a952915c0556bb0b1d496ee56))
* implement responsive navigation menu with mobile hamburger support ([8d88663](https://github.com/PGLongo/ice-generator/commit/8d88663eb740b2d45ffad90ea13eca75f0646af8))
* improve Cypress test reliability and language handling ([3009157](https://github.com/PGLongo/ice-generator/commit/30091573d704e2da3c990a48dcd86faeec51215b))
* improve preview header alignment and visual balance ([19dd730](https://github.com/PGLongo/ice-generator/commit/19dd7302a7eed542086540b7945cb4f6f1245e3c))
* layout ([4c173b3](https://github.com/PGLongo/ice-generator/commit/4c173b35c657e076b562866dd562f241c8b558d7))
* prevent data accumulation in form inputs ([b385c83](https://github.com/PGLongo/ice-generator/commit/b385c8366546f19c25279e5ce6bc2271eddc4dc9))
* prevent duplicate toast notifications on URL data load ([0e64f58](https://github.com/PGLongo/ice-generator/commit/0e64f58403d2e1b4fc8d93d41f2a9fff9e250061))
* remove duplicated text ([a90c1c8](https://github.com/PGLongo/ice-generator/commit/a90c1c8a1c8ecafa2ddf130baa8be37e9112aed7))
* remove max-width limit on school card for print layout ([7471b36](https://github.com/PGLongo/ice-generator/commit/7471b36ef4d2b386c4eb7e050c1c8745378037e9))
* replace UDivider with USeparator for Nuxt UI v4 compatibility ([ee88d48](https://github.com/PGLongo/ice-generator/commit/ee88d484fa351858b789000981049d7dd5d4ffae))
* replace USelectMenu with UPopover-based LanguageSelect ([a4cdc1d](https://github.com/PGLongo/ice-generator/commit/a4cdc1dc42c22fcaec4f5ed23bb1b3c9420ec60c))
* resolve 500 error on school page refresh ([7d4a9b2](https://github.com/PGLongo/ice-generator/commit/7d4a9b2a89e822ce940dd56eac4b63b5fbe009e0))
* resolve all ESLint errors and eliminate 'any' types ([80a1d0c](https://github.com/PGLongo/ice-generator/commit/80a1d0c79af506edd2488011c8bb65106b36bda7))
* resolve LocalForage persistence issues with reactive objects ([b1d8e40](https://github.com/PGLongo/ice-generator/commit/b1d8e40df12405024d3fc1b2f30c0a3efb8d7afb))
* resolve TypeScript type checking error in LanguageSelect ([efebfa9](https://github.com/PGLongo/ice-generator/commit/efebfa9adc02b1267c6ede265a62eb51bf7ee9c8))
* screen data ([ee3361b](https://github.com/PGLongo/ice-generator/commit/ee3361b634e7f508917d97f0cf040fe6dcb2a1bc))
* section location in form ([6727cbc](https://github.com/PGLongo/ice-generator/commit/6727cbc81b453a0fd70539f65cce5a02462e1f37))
* simplify LanguageSelect with UPopover and flags ([b288e89](https://github.com/PGLongo/ice-generator/commit/b288e896c6dd22304daad7f082475cb854092800))
* sync preview page with ICE store data for real-time updates ([463fa01](https://github.com/PGLongo/ice-generator/commit/463fa01567d3c0ffb5e701cee81550bfc3b770ce))
* use heart icon for blood type and keep city/address visible ([da39075](https://github.com/PGLongo/ice-generator/commit/da39075fb57722c053f41650493ec6e017e45b98))
* use ULocaleSelect correctly with proper locale imports ([63a0f10](https://github.com/PGLongo/ice-generator/commit/63a0f10f5f229217b811e02639bab0db50026d61))

## [0.3.0](https://github.com/PGLongo/ice-generator/compare/v0.1.5...v0.3.0) (2025-12-10)


### ⚠ BREAKING CHANGES

* Complete rebrand from SmICE to CareCard

- Update package name from 'smice' to 'carecard'
- Rebrand all documentation (README.md, CLAUDE.md)
- Update translations (en.json, it.json) with new name
- Update AppLogo component with new branding
- Change subtitle from 'ICE + NFC + QR + Tags' to 'Your digital emergency card'
- Set version to 0.2.0 for major rebrand milestone

The new CareCard branding better reflects the universal emergency card
concept while avoiding potential confusion with immigration services.

All functionality remains identical - only branding has changed.

### Features

* add example cards carousel to home page ([be0ecd9](https://github.com/PGLongo/ice-generator/commit/be0ecd9ff6639960d2c0ca5e8eb879c3f69716f3))
* add luggage card types ([e423f79](https://github.com/PGLongo/ice-generator/commit/e423f791032a954dbc9860e4271b6071ea28f80e))
* create CardLuggage component ([d5e70d7](https://github.com/PGLongo/ice-generator/commit/d5e70d74cca45bd513b70b981163e99a0be7c44a))
* extract CardSchool component with object props ([8593440](https://github.com/PGLongo/ice-generator/commit/85934405bebfde405acf51d58c0a614a3ff8551f))
* implement server-side encryption for URL sharing ([2f07843](https://github.com/PGLongo/ice-generator/commit/2f078437a53117acb615cd1de218a4ae9b4566a2))
* rebrand from SmICE to CareCard ([340ef07](https://github.com/PGLongo/ice-generator/commit/340ef0764acec33fe3800aca70328443ffd0a290))


### Bug Fixes

* complete SmICE to CareCard rebrand ([b5169c2](https://github.com/PGLongo/ice-generator/commit/b5169c26cf586bd96ac1212054accdb2f5105ca6))
* resolve all ESLint errors and eliminate 'any' types ([80a1d0c](https://github.com/PGLongo/ice-generator/commit/80a1d0c79af506edd2488011c8bb65106b36bda7))
* resolve TypeScript type checking error in LanguageSelect ([efebfa9](https://github.com/PGLongo/ice-generator/commit/efebfa9adc02b1267c6ede265a62eb51bf7ee9c8))


### Code Refactoring

* simplify school card types for component props ([8e5abdb](https://github.com/PGLongo/ice-generator/commit/8e5abdb75851e4886ca6932e3ec9699f1c90fd19))
