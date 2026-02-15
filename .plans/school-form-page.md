# School Form Page (/form/school)

**Stato**: in-progress
**Creato**: 2026-02-15
**Ultimo aggiornamento**: 2026-02-15 16:15

## Descrizione

Creare una nuova pagina `/form/school` che permetta di:
1. Compilare le informazioni della scuola riutilizzando `FormSchoolInfo.vue`
2. Inserire un elenco di persone (Nome e Cognome in un unico campo) manualmente
3. Caricare un file Excel (.xlsx) o CSV con l'elenco delle persone
4. Utilizzare un Pinia store dedicato (`useSchoolFormStore`) separato dall'`iceStore`

Lo store dedicato gestirà i dati della scuola e la lista persone, con persistenza LocalForage come gli altri store del progetto.

## Step

- [x] **Step 1** - Creare il tipo `SchoolFormData` in `app/types/school-form.ts`
  - Interfaccia `Person` con campo `fullName: string` e `id: string`
  - Interfaccia `SchoolFormData` con `school: SchoolData` e `people: Person[]`

- [x] **Step 2** - Creare lo store Pinia `useSchoolFormStore` in `app/stores/school-form.ts`
  - State: `school: SchoolData` (riusa il tipo esistente), `people: Person[]`
  - Actions: `addPerson`, `removePerson`, `importPeople(people: Person[])`, `clearPeople`, `clearAll`
  - Getters: `hasPeople`, `peopleCount`

- [x] **Step 3** - Aggiungere persistenza LocalForage per il nuovo store
  - Aggiornare `app/plugins/pinia-localforage.client.ts` per sottoscrivere anche `useSchoolFormStore`
  - Usare key `school-form-data` in LocalForage
  - Caricare i dati salvati all'avvio

- [x] **Step 4** - Creare componente `FormPeopleList.vue` in `app/components/Form/`
  - **Props/Emit pattern** (NO accesso diretto allo store):
    - `modelValue: Person[]` (v-model)
    - `emit('update:modelValue', people)`
  - Input manuale: campo testo + bottone "Aggiungi" per aggiungere persone una alla volta
  - Lista delle persone aggiunte con possibilità di rimuoverle
  - Upload file: bottone per caricare CSV/Excel (.csv, .xlsx)
  - Parsing CSV: split per righe, ogni riga = un nome completo
  - Parsing Excel: usare libreria `xlsx` (SheetJS) per leggere .xlsx

- [x] **Step 5** - Installare dipendenza `xlsx` (SheetJS) per parsing Excel
  - `pnpm add xlsx`

- [x] **Step 6** - Creare la pagina `app/pages/form/school.vue`
  - **La pagina è l'unico punto che accede allo store Pinia**
  - Usa `useSchoolFormStore` e passa dati ai componenti via props/v-model
  - `<FormSchoolInfo v-model="schoolFormStore.data.school" />` (temporaneamente inline)
  - `<FormPeopleList v-model="schoolFormStore.data.people" />`
  - Layout coerente con `form.vue` esistente (UContainer, UCard)
  - Bottoni azione: genera card per tutti, reset

- [x] **Step 7** - Refactoring `FormSchoolInfo.vue` a props/v-model/emit
  - Rimuovere import diretto di `useIceStore`
  - Aggiungere `modelValue: SchoolData` prop con `v-model`
  - Emettere `update:modelValue` su ogni cambio campo
  - Rimuovere `FormSchoolInfo` dalla pagina `/form` (non più usato lì)
  - Il componente diventa riutilizzabile e indipendente dallo store

- [x] **Step 8** - Aggiungere traduzioni i18n (en.json e it.json)
  - Sezione `schoolForm`: titolo pagina, sottotitolo, placeholder, bottoni
  - Labels: "Add person", "Upload file", "People list", "Remove", "Clear all"
  - Messaggi: "File uploaded successfully", "X people imported", ecc.

- [x] **Step 9** - Aggiungere navigazione verso `/form/school`
  - Aggiungere link nel menu di navigazione (`TemplateMenu.vue`)
  - Opzionale: bottone nella pagina `/form` per navigare a `/form/school`

- [~] **Step 10** - Verificare TypeScript e ESLint
  - `pnpm typecheck`
  - `pnpm lint`
  - Correggere eventuali errori
