# Ristrutturazione Layout: Landing + Dashboard

**Stato**: completed
**Creato**: 2026-02-10
**Ultimo aggiornamento**: 2026-02-10 (completato)

## Descrizione

Separare i layout dell'applicazione in due:

1. **`landing.vue`** — Nuovo layout dedicato alla landing page (`/`). Copia dell'attuale `default.vue` (AppHeader + UMain + USeparator + AppFooter + UNotifications). La pagina `index.vue` userà `definePageMeta({ layout: 'landing' })`.

2. **`default.vue`** — Ridisegnato ispirandosi al [Nuxt UI Dashboard Template](https://dashboard-template.nuxt.dev/), con sidebar collassabile/ridimensionabile (`UDashboardGroup` + `UDashboardSidebar`), navigazione verticale, e footer nella sidebar. Mantiene i colori CareCard (primary: `carecard-blue`, secondary: `carecard-cyan`, neutral: `slate`). Tutte le pagine operative (form, preview, school, presentation, social) useranno questo layout.

## Analisi della situazione attuale

- **`default.vue`**: AppHeader (sticky, con TemplateMenu orizzontale) → UMain → USeparator → AppFooter → UNotifications
- **`fullscreen.vue`**: Simile ma con `h-dvh overflow-hidden` e scroll interno
- **AppHeader.vue**: Header complesso (354 righe) con logica condizionale: mostra landing links su `/`, TemplateMenu sulle altre pagine. Mobile menu, language select, color mode, GitHub button.
- **TemplateMenu.vue**: UNavigationMenu con 4 voci (Home, Form, Preview, School Card). Supporta orientamento orizzontale/verticale.
- **Pagine**: index.vue (landing), form.vue, preview.vue, school.vue, presentation.vue, social/instagram/*

## Strategia

Il nuovo `default.vue` dashboard-style:
- Usa `UDashboardGroup` + `UDashboardSidebar` (collapsible, resizable)
- Sidebar header: AppLogo (adattato per collapsed state)
- Sidebar content: UNavigationMenu verticale con le voci da TemplateMenu + UDashboardSearchButton
- Sidebar footer: LanguageSelect + UColorModeButton + link GitHub
- Il contenuto principale è lo `<slot />` diretto (come nel template Nuxt UI)
- UNotifications fuori dalla sidebar
- Niente AppHeader/AppFooter nel layout dashboard — tutto vive nella sidebar

Il layout `landing.vue`:
- Copia esatta dell'attuale `default.vue`
- Continua a usare AppHeader + AppFooter
- Nessuna modifica necessaria

## Step

- [x] **Step 1**: Creare `app/layouts/landing.vue` — Copiare il contenuto attuale di `default.vue`
- [x] **Step 2**: Aggiornare `app/pages/index.vue` — Aggiungere `definePageMeta({ layout: 'landing' })` per usare il layout landing
- [x] **Step 3**: Riscrivere `app/layouts/default.vue` — Implementare il layout dashboard ispirato al Nuxt UI Dashboard Template con:
  - `UDashboardGroup` come wrapper (unit="rem")
  - `UDashboardSidebar` (collapsible, resizable, class="bg-elevated/25")
  - Sidebar header: AppLogo (con gestione collapsed)
  - Sidebar content: `UDashboardSearchButton` + `UNavigationMenu` verticale con le voci di navigazione (Form, Preview, School Card) + link secondari
  - Sidebar footer: LanguageSelect, UColorModeButton, GitHub link
  - `<slot />` per il contenuto principale
  - `<UNotifications />` a livello globale
- [x] **Step 4**: Aggiornare `app/layouts/fullscreen.vue` — Valutare se mantenerlo o convertirlo a una variante del dashboard layout. Se le pagine social/instagram hanno bisogno di fullscreen, mantenere ma allineare lo stile.
- [x] **Step 5**: Verificare `AppHeader.vue` — L'header custom rimane usato solo dal layout `landing.vue`. La logica condizionale (landing vs non-landing) può essere semplificata dato che l'header sarà usato solo nella landing.
- [x] **Step 6**: Test e verifica — Controllare che tutte le pagine funzionino correttamente con i nuovi layout. Verificare responsive, dark mode, navigazione, e che i colori CareCard siano preservati.
- [x] **Step 7**: Check TypeScript e ESLint — Eseguire controlli di tipo e linting come richiesto dal progetto prima di considerare completato.

## Note tecniche

### Componenti Nuxt UI Dashboard usati
- `UDashboardGroup` — Container wrapper per il layout dashboard
- `UDashboardSidebar` — Sidebar con supporto collapsible/resizable, slot per header/default/footer
- `UDashboardSearchButton` — Pulsante di ricerca compatto nella sidebar
- `UNavigationMenu` — Menu verticale con tooltip e popover quando collapsed

### Colori da preservare
- Primary: `carecard-blue` (#0066ff)
- Secondary: `carecard-cyan` (#00ccff)
- Neutral: `slate`
- Font: Public Sans

### Mapping pagine → layout
| Pagina | Layout attuale | Layout nuovo |
|--------|---------------|--------------|
| `/` (index) | default | **landing** |
| `/form` | default | default (dashboard) |
| `/preview` | default | default (dashboard) |
| `/school` | default | default (dashboard) |
| `/presentation` | default | default (dashboard) |
| `/social/instagram` | default | default (dashboard) |
| `/social/instagram/[mode]` | fullscreen | fullscreen (invariato) |
