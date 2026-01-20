export const useIcons = () => {
    const search = ref('')

    const iconDefinitions = [
        { name: 'i-heroicons-shopping-bag', keywords: ['shopping', 'bag', 'shop', 'borsa', 'spesa', 'acquisto'] },
        { name: 'i-heroicons-arrow-right', keywords: ['arrow', 'right', 'freccia', 'destra', 'avanti'] },
        { name: 'i-heroicons-heart', keywords: ['heart', 'love', 'like', 'cuore', 'amore', 'mi piace'] },
        { name: 'i-heroicons-shopping-cart', keywords: ['shopping', 'cart', 'carrello', 'spesa', 'acquista'] },
        { name: 'i-heroicons-bolt', keywords: ['bolt', 'lightning', 'energy', 'flash', 'fulmine', 'energia', 'saetta'] },
        { name: 'i-heroicons-link', keywords: ['link', 'url', 'collegamento', 'connessione', 'catena'] },
        { name: 'i-heroicons-star', keywords: ['star', 'favorite', 'stella', 'preferito', 'voto'] },
        { name: 'i-heroicons-rocket-launch', keywords: ['rocket', 'launch', 'space', 'razzo', 'lancio', 'spazio', 'decollo'] },
        { name: 'i-heroicons-paper-airplane', keywords: ['paper', 'airplane', 'send', 'fly', 'aereo', 'carta', 'invia', 'volare', 'messaggio'] },
        { name: 'i-heroicons-envelope', keywords: ['envelope', 'mail', 'email', 'busta', 'lettera', 'posta', 'contatto'] },
        { name: 'i-heroicons-play-circle', keywords: ['play', 'circle', 'video', 'start', 'riproduci', 'cerchio', 'avvia'] },
        { name: 'i-heroicons-arrow-down-tray', keywords: ['arrow', 'down', 'tray', 'download', 'save', 'freccia', 'giù', 'scarica', 'salva'] },
        { name: 'i-heroicons-share', keywords: ['share', 'social', 'condividi', 'condivisione', 'invia'] },
        { name: 'i-heroicons-arrow-top-right-on-square', keywords: ['arrow', 'top', 'right', 'square', 'external', 'open', 'freccia', 'alto', 'destra', 'esterno', 'apri'] },
        { name: 'i-heroicons-calendar', keywords: ['calendar', 'date', 'schedule', 'calendario', 'data', 'programma', 'agenda'] },
        { name: 'i-heroicons-home', keywords: ['home', 'house', 'main', 'casa', 'abitazione', 'principale'] },
        { name: 'i-heroicons-user', keywords: ['user', 'profile', 'account', 'person', 'utente', 'profilo', 'persona'] },
        { name: 'i-heroicons-cog', keywords: ['cog', 'gear', 'settings', 'options', 'ingranaggio', 'impostazioni', 'opzioni', 'configurazione'] },
        { name: 'i-heroicons-bell', keywords: ['bell', 'notification', 'alert', 'campana', 'notifica', 'avviso'] },
        { name: 'i-heroicons-camera', keywords: ['camera', 'photo', 'picture', 'image', 'fotocamera', 'foto', 'immagine', 'scatto'] },
        { name: 'i-heroicons-map', keywords: ['map', 'location', 'place', 'mappa', 'luogo', 'posizione', 'dove'] },
        { name: 'i-heroicons-phone', keywords: ['phone', 'call', 'mobile', 'telefono', 'cellulare', 'chiamata', 'contatta'] },
        { name: 'i-heroicons-chat-bubble-left', keywords: ['chat', 'bubble', 'message', 'comment', 'messaggio', 'commento', 'fumetto', 'parla'] },
        { name: 'i-heroicons-check-circle', keywords: ['check', 'circle', 'success', 'done', 'ok', 'spunta', 'fatto', 'successo', 'conferma'] },
        { name: 'i-heroicons-x-circle', keywords: ['x', 'circle', 'error', 'cancel', 'close', 'errore', 'cancella', 'chiudi', 'croce'] },
        { name: 'i-heroicons-cloud', keywords: ['cloud', 'weather', 'storage', 'nuvola', 'meteo', 'archivio'] },
        { name: 'i-heroicons-document', keywords: ['document', 'file', 'paper', 'text', 'documento', 'foglio', 'testo'] },
        { name: 'i-heroicons-folder', keywords: ['folder', 'directory', 'archive', 'cartella', 'archivio'] },
        { name: 'i-heroicons-square-2-stack', keywords: ['square', 'stack', 'layers', 'collection', 'livelli', 'strati', 'raccolta'] },
        { name: 'i-heroicons-globe-alt', keywords: ['globe', 'world', 'internet', 'web', 'globo', 'mondo', 'terra'] }
    ]

    const filteredIcons = computed(() => {
        if (!search.value) {
            return iconDefinitions.map(def => def.name)
        }
        const query = search.value.toLowerCase().trim()
        return iconDefinitions
            .filter(def =>
                def.name.toLowerCase().includes(query) ||
                def.keywords.some(k => k.toLowerCase().includes(query))
            )
            .map(def => def.name)
    })

    return {
        search,
        filteredIcons
    }
}
