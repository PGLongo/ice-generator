# Integrazione Scraping Instagram

**Stato**: completed
**Creato**: 2026-01-20
**Ultimo aggiornamento**: 2026-01-20

## Descrizione

Sviluppo di una funzionalità per recuperare informazioni pubbliche da profili Instagram (Nome completo e Immagine profilo) tramite scraping HTML. L'obiettivo è facilitare l'importazione di dati nei form dell'applicazione.

Il sistema utilizzerà un approccio ibrido:
- **Server API**: Proxy per aggirare CORS e ottenere l'HTML di Instagram.
- **Composable Vue 3**: Logica di business per validazione, caching e parsing dati.

## Specifiche Tecniche

### API Server (`server/api/instagram/scrape.get.ts`)
- Metodo: GET
- Parametro: `username`
- Funzionalità: Fetch della pagina pubblica Instagram con User-Agent desktop.
- Ritorno: HTML raw o errore gestito (404, 500).

### Composable (`app/composables/useInstagramProfileScrape.ts`)
- **State**: `profile` (ref), `loading` (ref), `error` (ref).
- **Input**: Accetta username con/senza `@`.
- **Validazione**: Regex `^[a-zA-Z0-9._]{1,30}$`.
- **Parsing**: Estrazione meta tags (`og:title`, `og:image`) da HTML.
- **Caching**: Map in-memory con TTL 10 minuti.
- **Output**: `{ username, fullName, profileImageUrl, sourceUrl }`.

## Step

- [x] Creare endpoint server API `server/api/instagram/scrape.get.ts` per fetch HTML raw.
- [x] Creare composable `app/composables/useInstagramProfileScrape.ts` con logica fetch, parsing, validazione e cache.
- [x] Implementare UI di test/integrazione in `app/pages/social-preview.vue` (input username + button).
- [x] Verificare il funzionamento con username validi e gestire errori (404, CORS, invalid format).
