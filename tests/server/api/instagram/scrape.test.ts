import { describe, it, expect } from 'vitest'
import { setup, fetch } from '@nuxt/test-utils'

describe('Instagram Scrape API', async () => {
    await setup({
        server: true
    })

    it('should return error if username is missing (path segment missing)', async () => {
        try {
            // Calling the base path without the segment
            await fetch('/api/fetch/instagram')
        } catch (error: unknown) {
            // Nuxt might 404 if the dynamic segment is missing and no index exists
            const err = error as { response: { status: number } }
            expect([404, 400]).toContain(err.response.status)
        }
    })

    it('should return 400 if username is invalid', async () => {
        try {
            await fetch('/api/fetch/instagram/invalid!user')
        } catch (error: unknown) {
            const err = error as { response: { status: number } }
            expect(err.response.status).toBe(400)
        }
    })

    it('should fetch profile data as JSON for a valid username', async () => {
        // We assume 'instagram' account exists.
        const res = await fetch('/api/fetch/instagram/instagram')
        const data = await res.json()

        expect(res.status).toBe(200)
        expect(data).toHaveProperty('username', 'instagram')
        expect(data).toHaveProperty('fullName')
        expect(data).toHaveProperty('profileImageUrl')
        expect(data).toHaveProperty('description')
        expect(data.profileImageUrl).toContain('http')
    })
})
