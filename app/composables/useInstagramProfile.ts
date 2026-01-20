export interface InstagramProfile {
    username: string
    fullName: string
    profileImageUrl: string
    description: string | null
    sourceUrl: string
}

const CACHE_TTL = 10 * 60 * 1000 // 10 minutes
const cache = new Map<string, { data: InstagramProfile, timestamp: number }>()

export const useInstagramProfile = () => {
    const profile = ref<InstagramProfile | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const reset = () => {
        profile.value = null
        error.value = null
        loading.value = false
    }

    const validateUsername = (username: string): boolean => {
        // Letters, numbers, periods, underscores. 1-30 chars.
        const regex = /^[a-zA-Z0-9._]{1,30}$/
        return regex.test(username)
    }

    const fetchProfile = async (inputUsername: string) => {
        reset()

        // 1. Normalize input
        if (!inputUsername) {
            error.value = 'Username cannot be empty'
            return
        }

        let username = inputUsername.trim().toLowerCase()
        if (username.startsWith('@')) {
            username = username.substring(1)
        }

        // 2. Validate
        if (!validateUsername(username)) {
            error.value = 'Invalid username format. Use only letters, numbers, periods, and underscores.'
            return
        }

        // 3. Check Cache
        const cached = cache.get(username)
        if (cached) {
            if (Date.now() - cached.timestamp < CACHE_TTL) {
                profile.value = cached.data
                return
            } else {
                cache.delete(username)
            }
        }

        loading.value = true

        try {
            // 4. Fetch JSON from Server API
            const data = await $fetch<InstagramProfile>(`/api/fetch/instagram/${username}`)

            if (!data) {
                throw new Error('Received empty response from server.')
            }

            // 5. Update State and Cache
            profile.value = data
            cache.set(username, { data, timestamp: Date.now() })
        } catch (e: unknown) {
            console.error('Instagram Scrape Error:', e)
            const err = e as { statusCode?: number, message?: string }
            if (err.statusCode === 404) {
                error.value = 'User not found on Instagram.'
            } else if (err.message?.includes('Profile metadata could not be found')) {
                error.value = 'Profile could not be verified automatically. Please fill details manually.'
            } else {
                error.value = err.message || 'An unexpected error occurred.'
            }
        } finally {
            loading.value = false
        }
    }

    return {
        profile,
        loading,
        error,
        fetchProfile,
        reset
    }
}
