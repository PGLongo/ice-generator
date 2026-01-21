export default defineEventHandler(async (event) => {
    const username = getRouterParam(event, 'username')

    if (!username) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Username is required'
        })
    }

    // Validate username format basic
    const usernameRegex = /^[a-zA-Z0-9._]{1,30}$/
    if (!usernameRegex.test(username)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid username format'
        })
    }

    const url = `https://www.instagram.com/${username}/`

    const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0'
    ]

    let lastError: unknown = null
    let htmlContent = ''

    const extractMeta = (html: string, property: string) => {
        const regex1 = new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i')
        const regex2 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i')
        const match = html.match(regex1) || html.match(regex2)
        return (match && match[1]) ? decodeHtmlEntities(match[1]) : null
    }

    const decodeHtmlEntities = (text: string) => {
        if (!text) return text
        return text.replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, '\'')
            .replace(/&#064;/g, '@')
            .replace(/&#x2022;/g, '•')
            .replace(/&middot;/g, '•')
            .replace(/&#183;/g, '•')
            .replace(/&nbsp;/g, ' ')
    }

    for (const ua of userAgents) {
        try {
            console.warn(`[Instagram Scrape] Trying UA: ${ua.substring(0, 50)}...`)
            const response = await fetch(url, {
                headers: {
                    'User-Agent': ua,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
                    'Sec-Ch-Ua-Mobile': '?0',
                    'Sec-Ch-Ua-Platform': '"macOS"',
                    'Sec-Fetch-Dest': 'document',
                    'Sec-Fetch-Mode': 'navigate',
                    'Sec-Fetch-Site': 'none',
                    'Sec-Fetch-User': '?1',
                    'Upgrade-Insecure-Requests': '1',
                    'Referer': 'https://www.google.com/'
                }
            })

            if (!response.ok) {
                if (response.status === 404) throw createError({ statusCode: 404, statusMessage: 'User not found' })
                lastError = createError({ statusCode: response.status, statusMessage: 'Failed to fetch' })
                continue
            }

            const html = await response.text()
            const ogTitle = extractMeta(html, 'og:title')
            const ogImage = extractMeta(html, 'og:image')

            // Check if we hit the login wall
            if (ogTitle === 'Instagram') {
                console.warn('[Instagram Scrape] Hit login wall (Title: Instagram)')
                lastError = createError({ statusCode: 403, statusMessage: 'Instagram requires login (IP blocked)' })
                continue
            }

            if (ogTitle || ogImage) {
                let fullName = ogTitle || username

                // Remove unwanted suffix common in Instagram title
                // or "@user • Instagram photos and videos"
                if (ogTitle) {
                    // Try to extract Name from "Name (@user)"
                    const nameRegex = /^(.*?)\s\(@[a-zA-Z0-9._]+\)/
                    const match = ogTitle.match(nameRegex)
                    if (match && match[1]) {
                        fullName = match[1].trim()
                    } else {
                        // Else just take everything before the first bullet/separator
                        const parts = ogTitle.split(/[•·|]/)
                        fullName = (parts[0] || username).trim()
                        // If it's just the username (starts with @), fallback to username
                        if (fullName.startsWith('@')) fullName = username
                    }
                }

                if (fullName === 'Instagram') {
                    // Double check: if extraction resulted in "Instagram", it's invalid
                    console.warn('[Instagram Scrape] Invalid parsed name (Instagram)')
                    lastError = createError({ statusCode: 403, statusMessage: 'Instagram requires login' })
                    continue
                }

                return {
                    username,
                    fullName,
                    profileImageUrl: ogImage,
                    description: extractMeta(html, 'og:description'),
                    sourceUrl: extractMeta(html, 'og:url') || url
                }
            } else {
                if (!htmlContent) htmlContent = html
            }
        } catch (err: unknown) {
            lastError = err
            const e = err as { statusCode?: number }
            if (e.statusCode === 404) throw err
        }
    }

    if (htmlContent) {
        throw createError({ statusCode: 500, statusMessage: 'Profile metadata could not be found' })
    }

    if (lastError) throw lastError
    throw createError({ statusCode: 500, statusMessage: 'Failed to scrape profile' })
})
