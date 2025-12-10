import { createCipheriv, randomBytes } from 'node:crypto'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { data } = body

    if (!data || typeof data !== 'string') {
      throw createError({
        statusCode: 400,
        message: 'Invalid data format'
      })
    }

    // Get encryption key from environment (32 bytes for AES-256)
    const encryptionKey = process.env['NUXT_ENCRYPTION_KEY']
    if (!encryptionKey) {
      throw createError({
        statusCode: 500,
        message: 'Encryption key not configured'
      })
    }

    // Generate random IV (Initialization Vector)
    const iv = randomBytes(16)

    // Create cipher (AES-256-GCM for authenticated encryption)
    const cipher = createCipheriv('aes-256-gcm', Buffer.from(encryptionKey, 'hex'), iv)

    // Encrypt data
    let encrypted = cipher.update(data, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    // Get authentication tag
    const authTag = cipher.getAuthTag().toString('hex')

    // Combine IV + authTag + encrypted data
    const result = `${iv.toString('hex')}:${authTag}:${encrypted}`

    return {
      encrypted: result
    }
  } catch (error: unknown) {
    console.error('Encryption error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Encryption failed'
    throw createError({
      statusCode: 500,
      message: errorMessage
    })
  }
})
