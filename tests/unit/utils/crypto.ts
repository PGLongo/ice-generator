/**
 * Test utilities for encryption/decryption operations
 * Used by both API and composable tests
 */

import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'

/**
 * Manually encrypt data using AES-256-GCM
 * Used to prepare test data for decryption tests
 */
export function encryptManually(data: string, keyHex: string): string {
  const iv = randomBytes(16)
  const cipher = createCipheriv('aes-256-gcm', Buffer.from(keyHex, 'hex'), iv)

  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  const authTag = cipher.getAuthTag().toString('hex')

  return `${iv.toString('hex')}:${authTag}:${encrypted}`
}

/**
 * Manually decrypt data using AES-256-GCM
 * Used to verify encryption test results
 */
export function decryptManually(encrypted: string, keyHex: string): string {
  const parts = encrypted.split(':')
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted format')
  }

  const iv = Buffer.from(parts[0], 'hex')
  const authTag = Buffer.from(parts[1], 'hex')
  const encryptedData = parts[2]

  const decipher = createDecipheriv('aes-256-gcm', Buffer.from(keyHex, 'hex'), iv)
  decipher.setAuthTag(authTag)

  let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}

/**
 * Generate test encryption key (32 bytes = 256 bits)
 * Returns 64 hex characters
 */
export function generateTestKey(): string {
  return '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
}

/**
 * Verify encrypted data format
 */
export function isValidEncryptedFormat(encrypted: string): boolean {
  const parts = encrypted.split(':')
  if (parts.length !== 3) return false

  const [iv, authTag, encryptedData] = parts

  // IV should be 32 hex chars (16 bytes)
  if (!/^[0-9a-f]{32}$/i.test(iv)) return false

  // Auth tag should be 32 hex chars (16 bytes)
  if (!/^[0-9a-f]{32}$/i.test(authTag)) return false

  // Encrypted data should be non-empty hex
  if (!/^[0-9a-f]+$/i.test(encryptedData)) return false

  return true
}

/**
 * URL-safe encode string
 * Replacement: + → -, / → _, = removed, : → ~
 */
export function urlSafeEncode(value: string): string {
  return value
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
    .replace(/:/g, '~')
}

/**
 * URL-safe decode string
 * Restoration: - → +, _ → /, ~ → :
 */
export function urlSafeDecode(value: string): string {
  return value
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .replace(/~/g, ':')
}

/**
 * Extract parts from encrypted format
 */
export function parseEncryptedFormat(encrypted: string): {
  iv: string
  authTag: string
  encryptedData: string
} | null {
  const parts = encrypted.split(':')
  if (parts.length !== 3) return null

  return {
    iv: parts[0],
    authTag: parts[1],
    encryptedData: parts[2]
  }
}
