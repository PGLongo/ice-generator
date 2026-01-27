# Redesign Landing Page - Stile Nuxt Landing Template

**Stato**: completed
**Creato**: 2026-01-27
**Ultimo aggiornamento**: 2026-01-27

## Descrizione

Copiare componenti dal [Nuxt Landing Template](https://github.com/nuxt-ui-templates/landing) e adattarli al progetto CareCard. **Mantenere i colori esistenti** (carecard-blue, carecard-cyan).

## Step

### Fase 1: Copia Componenti dal Template

- [x] **Step 1** - Copiare `StarsBg.vue` in `app/components/Landing/`
- [x] **Step 2** - Copiare `HeroBackground.vue` in `app/components/Landing/`
- [x] **Step 3** - Copiare immagini SVG decorative (`line-*.svg`) in `public/images/light/` e `public/images/dark/`

### Fase 2: Riscrivere Landing Page

- [x] **Step 4** - Creare nuova `index.vue` con struttura del template:
  - Hero con `HeroBackground` + `StarsBg`
  - Sezione Features (3 colonne)
  - Sezione Steps (3 passi)
  - CTA finale con `StarsBg`
- [x] **Step 5** - Adattare contenuto CareCard (titoli, descrizioni, CTA)
- [x] **Step 6** - Mantenere i18n esistente (en.json, it.json)

### Fase 3: Pulizia

- [x] **Step 7** - Rimuovere sezioni verbose (Story, What is ICE)
- [x] **Step 8** - Condensare Use Cases da 6 a 3
- [x] **Step 9** - Semplificare Integration section
- [x] **Step 10** - Rimuovere vecchi stili CSS non usati

### Fase 4: Test e Polish

- [x] **Step 11** - Verificare responsive (mobile/tablet/desktop)
- [x] **Step 12** - Verificare dark mode
- [x] **Step 13** - Test navigazione (/form, /preview)

## File da Copiare dal Template

```
/tmp/nuxt-landing-template/
├── app/components/
│   ├── StarsBg.vue          → app/components/Landing/StarsBg.vue
│   └── HeroBackground.vue   → app/components/Landing/HeroBackground.vue
└── public/images/
    ├── light/line-*.svg     → public/images/light/
    └── dark/line-*.svg      → public/images/dark/
```

## Note

- **NON cambiare i colori** - usare `--ui-primary` che punta a carecard-blue
- Template usa Nuxt Content per dati, noi usiamo i18n - adattare
- Template usa componenti UPageHero/UPageSection (Nuxt UI Pro) - usare UContainer/UCard standard
