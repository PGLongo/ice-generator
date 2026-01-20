# Social Page Preview Implementation

**Stato**: in-progress
**Creato**: 2026-01-20
**Ultimo aggiornamento**: 2026-01-20

## Descrizione

Implementazione della pagina di anteprima per la condivisione "Social". L'utente inserirà manualmente il **Nome Profilo** nel form di configurazione. La pagina di anteprima userà immagini di default (placeholder) per avatar e sfondo, in attesa di implementazioni future.

## Step

- [ ] Aggiornare `app/pages/social.vue`: aggiungere campo "Nome Profilo" e includerlo nei dati codificati
- [ ] Implementare `app/pages/social-preview.vue`:
    - Ricevere `profileName` dai dati
    - Usare props con default per `profileImage` e `backgroundImage`
    - Gestire logica countdown e redirect
- [ ] Rimuovere/Adattare `useSocialProfile` (non più necessario per il fetching)
- [ ] Verificare il flusso completo
