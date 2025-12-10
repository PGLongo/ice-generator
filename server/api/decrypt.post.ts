import { createDecipheriv } from 'node:crypto'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { encrypted } = body

    if (!encrypted || typeof encrypted !== 'string') {
      throw createError({
        statusCode: 400,
        message: 'Invalid encrypted data format'
      })
    }

    // Get encryption key from environment
    const encryptionKey = process.env['NUXT_ENCRYPTION_KEY']
    if (!encryptionKey) {
      throw createError({
        statusCode: 500,
        message: 'Encryption key not configured'
      })
    }

    // Split IV:authTag:encrypted
    const parts = encrypted.split(':')
    if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) {
      throw createError({
        statusCode: 400,
        message: 'Invalid encrypted data format'
      })
    }

    const ivHex: string = parts[0]
    const authTagHex: string = parts[1]
    const encryptedData: string = parts[2]

    // Convert hex to buffers
    const iv = Buffer.from(ivHex, 'hex')
    const authTag = Buffer.from(authTagHex, 'hex')

    // Create decipher
    const decipher = createDecipheriv('aes-256-gcm', Buffer.from(encryptionKey, 'hex'), iv)
    decipher.setAuthTag(authTag)

    // Decrypt data
    const decryptedBuffer = decipher.update(encryptedData, 'hex')
    const finalBuffer = decipher.final()
    const decrypted = Buffer.concat([decryptedBuffer, finalBuffer]).toString('utf8')

    return {
      data: decrypted
    }
  } catch (error: any) {
    console.error('Decryption error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Decryption failed - data may be corrupted'
    })
  }
})
