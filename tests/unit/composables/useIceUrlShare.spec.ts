import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { IceData } from '@/types/ice'

/**
 * Unit tests for useIceUrlShare composable
 *
 * Tests the client-side wrapper for encryption/decryption APIs
 * - encodeData: Serializes and encrypts ICE data
 * - decodeData: Decrypts and deserializes data
 * - generateShareableUrl: Creates URL with encoded data
 * - getDataFromUrl: Extracts data from URL query params
 * - copyShareableUrl: Copies URL to clipboard
 * - getEncodedSize: Calculates encoded data size
 * - serializeData: Internal serialization logic
 * - deserializeData: Internal deserialization logic
 */

describe('useIceUrlShare', () => {
  // Sample minimal ICE data
  const minimalData: IceData = {
    name: 'John Doe',
    age: 5,
    emergencyContacts: [],
    school: {}
  }

  // Sample complete ICE data
  const completeData: IceData = {
    name: 'Alice Smith',
    age: 8,
    dateOfBirth: '2016-03-15',
    bloodType: 'O+',
    city: 'New York',
    address: '123 Main Street',
    section: '3A',
    allergies: ['peanuts', 'shellfish'],
    medicalConditions: ['asthma'],
    currentMedications: ['albuterol'],
    medicalNotes: 'Emergency action plan on file',
    emergencyContacts: [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Mom',
        relationship: 'Parent',
        phone: '+1-555-123-4567',
        email: 'mom@example.com'
      },
      {
        id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        name: 'Dad',
        relationship: 'Parent',
        phone: '+1-555-987-6543'
      }
    ],
    primaryDoctor: 'Dr. Smith',
    insuranceInfo: 'Blue Cross #123456',
    specialInstructions: 'Allergy action plan in backpack',
    school: {
      name: 'Lincoln Elementary',
      address: '456 School Ave',
      city: 'New York',
      phone: '+1-555-000-0000',
      referentPhone: '+1-555-111-2222',
      referentName: 'Ms. Johnson',
      logoUrl: 'https://example.com/logo.png',
      section: '3A'
    },
    lastUpdated: new Date().toISOString()
  }

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks()

    // Setup window mock for browser APIs
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'https://example.com',
        pathname: '/app/',
        search: '',
        href: 'https://example.com/app/'
      },
      writable: true
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  // ==================== serializeData Tests ====================

  describe('serializeData', () => {
    /**
     * Test: Serialize minimal data (only name and age)
     * Expected: Returns compact object with only 'n' and 'a' fields
     */
    it('should serialize minimal data', async () => {
      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const _composable = useIceUrlShare()

      // Access private function through serialization test
      const serialized = serializeTestData(minimalData)

      expect(serialized.n).toBe('John Doe')
      expect(serialized.a).toBe(5)
      expect(serialized.al).toBeUndefined()
      expect(serialized.mc).toBeUndefined()
      expect(serialized.ec).toBeUndefined()
    })

    /**
     * Test: Serialize complete data structure
     * Expected: All populated fields are abbreviated correctly
     */
    it('should serialize complete data with all fields', async () => {
      const serialized = serializeTestData(completeData)

      expect(serialized.n).toBe('Alice Smith')
      expect(serialized.a).toBe(8)
      expect(serialized.dob).toBe('2016-03-15')
      expect(serialized.b).toBe('O+')
      expect(serialized.c).toBe('New York')
      expect(serialized.ad).toBe('123 Main Street')
      expect(serialized.sec).toBe('3A')
      expect(serialized.al).toEqual(['peanuts', 'shellfish'])
      expect(serialized.mc).toEqual(['asthma'])
      expect(serialized.cm).toEqual(['albuterol'])
      expect(serialized.mn).toBe('Emergency action plan on file')
      expect(serialized.pd).toBe('Dr. Smith')
      expect(serialized.ii).toBe('Blue Cross #123456')
      expect(serialized.si).toBe('Allergy action plan in backpack')
    })

    /**
     * Test: Serialize emergency contacts
     * Expected: Contacts abbreviated correctly with all fields
     */
    it('should serialize emergency contacts correctly', async () => {
      const serialized = serializeTestData(completeData)

      expect(serialized.ec).toHaveLength(2)
      expect(serialized.ec?.[0]).toEqual({
        i: '550e8400-e29b-41d4-a716-446655440000',
        n: 'Mom',
        r: 'Parent',
        p: '+1-555-123-4567',
        e: 'mom@example.com'
      })
      expect(serialized.ec?.[1]).toEqual({
        i: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        n: 'Dad',
        r: 'Parent',
        p: '+1-555-987-6543'
      })
    })

    /**
     * Test: Serialize school information
     * Expected: School object abbreviated correctly
     */
    it('should serialize school information', async () => {
      const serialized = serializeTestData(completeData)

      expect(serialized.s).toBeDefined()
      expect(serialized.s?.n).toBe('Lincoln Elementary')
      expect(serialized.s?.a).toBe('456 School Ave')
      expect(serialized.s?.c).toBe('New York')
      expect(serialized.s?.p).toBe('+1-555-000-0000')
      expect(serialized.s?.rp).toBe('+1-555-111-2222')
      expect(serialized.s?.rn).toBe('Ms. Johnson')
      expect(serialized.s?.l).toBe('https://example.com/logo.png')
      expect(serialized.s?.sec).toBe('3A')
    })

    /**
     * Test: Don't include empty fields
     * Expected: Only non-empty fields are in serialized data
     */
    it('should omit empty fields from serialization', async () => {
      const dataWithEmpty: IceData = {
        name: 'Test',
        age: null,
        allergies: [],
        medicalConditions: [],
        emergencyContacts: [],
        school: {}
      }

      const serialized = serializeTestData(dataWithEmpty)

      expect(serialized.n).toBe('Test')
      expect(serialized.a).toBeUndefined()
      expect(serialized.al).toBeUndefined()
      expect(serialized.mc).toBeUndefined()
      expect(serialized.ec).toBeUndefined()
      expect(serialized.s).toBeUndefined()
    })

    /**
     * Test: Serialize empty school object separately
     * Expected: School field not included if all nested fields empty
     */
    it('should not include empty school object', async () => {
      const dataWithEmptySchool: IceData = {
        name: 'Test',
        age: 5,
        emergencyContacts: [],
        school: {
          name: '',
          address: '',
          city: ''
        }
      }

      const serialized = serializeTestData(dataWithEmptySchool)

      expect(serialized.s).toBeUndefined()
    })

    /**
     * Test: Handle contacts with missing optional fields
     * Expected: Only populated fields are included in contact
     */
    it('should serialize contacts with partial fields', async () => {
      const dataWithPartialContacts: IceData = {
        name: 'Test',
        age: 5,
        emergencyContacts: [
          {
            id: '123',
            name: 'Mom',
            relationship: 'Parent',
            phone: '555-1234'
          }
        ],
        school: {}
      }

      const serialized = serializeTestData(dataWithPartialContacts)

      expect(serialized.ec?.[0]).toEqual({
        i: '123',
        n: 'Mom',
        r: 'Parent',
        p: '555-1234'
      })
      expect(serialized.ec?.[0].e).toBeUndefined()
    })
  })

  // ==================== deserializeData Tests ====================

  describe('deserializeData', () => {
    /**
     * Test: Deserialize minimal compact data
     * Expected: Returns full IceData with empty fields populated
     */
    it('should deserialize minimal compact data', async () => {
      const compact = { n: 'John Doe', a: 5 }

      const deserialized = deserializeTestData(compact)

      expect(deserialized.name).toBe('John Doe')
      expect(deserialized.age).toBe(5)
      expect(deserialized.dateOfBirth).toBe('')
      expect(deserialized.bloodType).toBe('')
      expect(deserialized.allergies).toEqual([])
      expect(deserialized.emergencyContacts).toEqual([])
      expect(deserialized.school).toEqual({})
      expect(deserialized.lastUpdated).toBeDefined()
    })

    /**
     * Test: Deserialize complete compact data
     * Expected: All fields restored correctly
     */
    it('should deserialize complete compact data', async () => {
      const compact = {
        n: 'Alice Smith',
        a: 8,
        dob: '2016-03-15',
        b: 'O+',
        c: 'New York',
        ad: '123 Main Street',
        sec: '3A',
        al: ['peanuts', 'shellfish'],
        mc: ['asthma'],
        cm: ['albuterol'],
        mn: 'Emergency action plan',
        pd: 'Dr. Smith',
        ii: 'Blue Cross #123456',
        si: 'Allergy action plan',
        ec: [
          {
            i: '550e8400-e29b-41d4-a716-446655440000',
            n: 'Mom',
            r: 'Parent',
            p: '+1-555-123-4567',
            e: 'mom@example.com'
          }
        ],
        s: {
          n: 'Lincoln Elementary',
          a: '456 School Ave',
          c: 'New York'
        }
      }

      const deserialized = deserializeTestData(compact)

      expect(deserialized.name).toBe('Alice Smith')
      expect(deserialized.age).toBe(8)
      expect(deserialized.dateOfBirth).toBe('2016-03-15')
      expect(deserialized.bloodType).toBe('O+')
      expect(deserialized.allergies).toEqual(['peanuts', 'shellfish'])
      expect(deserialized.emergencyContacts).toHaveLength(1)
      expect(deserialized.emergencyContacts[0].name).toBe('Mom')
      expect(deserialized.school.name).toBe('Lincoln Elementary')
    })

    /**
     * Test: Deserialize generates new IDs for contacts without ID
     * Expected: Each contact gets a generated UUID
     */
    it('should generate UUIDs for contacts without IDs', async () => {
      const compact = {
        n: 'Test',
        a: 5,
        ec: [
          { n: 'Mom', r: 'Parent', p: '555-1234' },
          { n: 'Dad', r: 'Parent', p: '555-5678' }
        ]
      }

      const deserialized = deserializeTestData(compact)

      expect(deserialized.emergencyContacts).toHaveLength(2)
      expect(deserialized.emergencyContacts[0].id).toBeDefined()
      expect(deserialized.emergencyContacts[1].id).toBeDefined()
      // UUIDs should be different
      expect(deserialized.emergencyContacts[0].id).not.toBe(
        deserialized.emergencyContacts[1].id
      )
    })

    /**
     * Test: Round-trip serialization/deserialization
     * Expected: Data is preserved through full cycle
     */
    it('should preserve data through serialize/deserialize cycle', async () => {
      const serialized = serializeTestData(completeData)
      const deserialized = deserializeTestData(serialized)

      // Check key fields are preserved
      expect(deserialized.name).toBe(completeData.name)
      expect(deserialized.age).toBe(completeData.age)
      expect(deserialized.bloodType).toBe(completeData.bloodType)
      expect(deserialized.allergies).toEqual(completeData.allergies)
      expect(deserialized.emergencyContacts).toHaveLength(
        completeData.emergencyContacts.length
      )
      expect(deserialized.school.name).toBe(completeData.school.name)
    })
  })

  // ==================== encodeData Tests ====================

  describe('encodeData', () => {
    /**
     * Test: Successfully encode minimal data
     * Expected: Returns URL-safe encoded string
     */
    it('should successfully encode minimal data', async () => {
      // Mock $fetch for encryption
      global.$fetch = vi.fn().mockResolvedValueOnce({
        encrypted: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz+'
      })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { encodeData } = useIceUrlShare()

      const encoded = await encodeData(minimalData)

      expect(encoded).toBeDefined()
      expect(typeof encoded).toBe('string')
      // Should be URL-safe (no +, /, =)
      expect(encoded).not.toContain('+')
      expect(encoded).not.toContain('/')
      expect(encoded).not.toContain('=')
    })

    /**
     * Test: Successfully encode complete data
     * Expected: Handles complex data structure
     */
    it('should successfully encode complete data', async () => {
      global.$fetch = vi.fn().mockResolvedValueOnce({
        encrypted: 'abc123:def456:ghi789jkl012mno345pqr678stu901vwx234yz+'
      })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { encodeData } = useIceUrlShare()

      const encoded = await encodeData(completeData)

      expect(encoded).toBeDefined()
      expect(typeof encoded).toBe('string')
      expect(global.$fetch).toHaveBeenCalledWith('/api/encrypt', {
        method: 'POST',
        body: expect.objectContaining({
          data: expect.any(String)
        })
      })
    })

    /**
     * Test: URL-safe character replacement
     * Expected: + becomes -, / becomes _, = removed, : becomes ~
     */
    it('should replace special characters for URL safety', async () => {
      const encryptedWithSpecialChars = 'abc+def/ghi=jkl:mno'
      global.$fetch = vi.fn().mockResolvedValueOnce({
        encrypted: encryptedWithSpecialChars
      })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { encodeData } = useIceUrlShare()

      const encoded = await encodeData(minimalData)

      // Should transform: + → -, / → _, = → removed, : → ~
      expect(encoded).toBe('abc-def_ghijkl~mno')
      expect(encoded).not.toContain('+')
      expect(encoded).not.toContain('/')
      expect(encoded).not.toContain('=')
      expect(encoded).not.toContain(':')
    })

    /**
     * Test: Handle API call failure
     * Expected: Throws error with descriptive message
     */
    it('should throw error when encryption API fails', async () => {
      global.$fetch = vi
        .fn()
        .mockRejectedValueOnce(new Error('Network error'))

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { encodeData } = useIceUrlShare()

      try {
        await encodeData(minimalData)
        expect.fail('Should have thrown error')
      } catch (error: unknown) {
        expect(error instanceof Error && error.message).toContain('Encoding failed')
      }
    })

    /**
     * Test: Reject response without encrypted field
     * Expected: Throws error
     */
    it('should throw error when response missing encrypted field', async () => {
      global.$fetch = vi.fn().mockResolvedValueOnce({})

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { encodeData } = useIceUrlShare()

      try {
        await encodeData(minimalData)
        expect.fail('Should have thrown error')
      } catch (error: unknown) {
        expect(error instanceof Error && error.message).toContain('Encoding failed')
      }
    })

    /**
     * Test: Sends correct request to API
     * Expected: Serializes data before sending
     */
    it('should send serialized data to encryption API', async () => {
      global.$fetch = vi.fn().mockResolvedValueOnce({
        encrypted: 'abc123'
      })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { encodeData } = useIceUrlShare()

      await encodeData(minimalData)

      const callArgs = (global.$fetch as ReturnType<typeof vi.fn>).mock.calls[0]
      expect(callArgs[0]).toBe('/api/encrypt')
      expect(callArgs[1].method).toBe('POST')
      expect(callArgs[1].body.data).toBeDefined()

      const sentData = JSON.parse(callArgs[1].body.data)
      expect(sentData.n).toBe('John Doe')
      expect(sentData.a).toBe(5)
    })
  })

  // ==================== decodeData Tests ====================

  describe('decodeData', () => {
    /**
     * Test: Successfully decode valid encoded data
     * Expected: Returns IceData object
     */
    it('should successfully decode valid encoded data', async () => {
      const decodedJson = JSON.stringify({ n: 'John Doe', a: 5 })
      global.$fetch = vi.fn().mockResolvedValueOnce({
        data: decodedJson
      })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { decodeData } = useIceUrlShare()

      const decoded = await decodeData('abc-def_ghi~jkl')

      expect(decoded).toBeDefined()
      expect(decoded?.name).toBe('John Doe')
      expect(decoded?.age).toBe(5)
    })

    /**
     * Test: Restore URL-safe characters
     * Expected: - becomes +, _ becomes /, ~ becomes :
     */
    it('should restore URL-safe characters before decryption', async () => {
      const decodedJson = JSON.stringify({ n: 'Test' })
      global.$fetch = vi.fn().mockResolvedValueOnce({
        data: decodedJson
      })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { decodeData } = useIceUrlShare()

      await decodeData('abc-def_ghi~jkl')

      const callArgs = (global.$fetch as ReturnType<typeof vi.fn>).mock.calls[0]
      const bodyData = callArgs[1].body.encrypted

      // Should restore: - → +, _ → /, ~ → :
      expect(bodyData).toBe('abc+def/ghi:jkl')
    })

    /**
     * Test: Handle complex decrypted data
     * Expected: Deserializes to full IceData structure
     */
    it('should deserialize complex decrypted data', async () => {
      const decodedJson = JSON.stringify({
        n: 'Alice',
        a: 8,
        ec: [
          { i: '123', n: 'Mom', r: 'Parent', p: '555-1234' }
        ]
      })
      global.$fetch = vi.fn().mockResolvedValueOnce({
        data: decodedJson
      })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { decodeData } = useIceUrlShare()

      const decoded = await decodeData('encoded123')

      expect(decoded?.name).toBe('Alice')
      expect(decoded?.age).toBe(8)
      expect(decoded?.emergencyContacts).toHaveLength(1)
      expect(decoded?.emergencyContacts[0].name).toBe('Mom')
    })

    /**
     * Test: Return null on API failure
     * Expected: Returns null instead of throwing
     */
    it('should return null when decryption API fails', async () => {
      global.$fetch = vi
        .fn()
        .mockRejectedValueOnce(new Error('API error'))

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { decodeData } = useIceUrlShare()

      const result = await decodeData('invalid')

      expect(result).toBeNull()
    })

    /**
     * Test: Return null when response missing data field
     * Expected: Returns null
     */
    it('should return null when response missing data field', async () => {
      global.$fetch = vi.fn().mockResolvedValueOnce({})

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { decodeData } = useIceUrlShare()

      const result = await decodeData('encoded123')

      expect(result).toBeNull()
    })

    /**
     * Test: Return null on invalid JSON
     * Expected: Returns null
     */
    it('should return null when decrypted data is invalid JSON', async () => {
      global.$fetch = vi.fn().mockResolvedValueOnce({
        data: 'not valid json'
      })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { decodeData } = useIceUrlShare()

      const result = await decodeData('encoded123')

      expect(result).toBeNull()
    })
  })

  // ==================== generateShareableUrl Tests ====================

  describe('generateShareableUrl', () => {
    /**
     * Test: Generate URL with provided baseUrl
     * Expected: Returns URL pointing to /preview with encoded data
     */
    it('should generate URL with provided baseUrl', async () => {
      global.$fetch = vi.fn().mockResolvedValueOnce({
        encrypted: 'encodeddata123'
      })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { generateShareableUrl } = useIceUrlShare()

      const url = await generateShareableUrl(minimalData, 'https://myapp.com/app')

      expect(url).toBe('https://myapp.com/app/preview?data=encodeddata123')
    })

    /**
     * Test: Generate URL from window.location
     * Expected: Constructs proper URL from origin and pathname
     */
    it('should generate URL from window.location when no baseUrl', async () => {
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'https://example.com',
          pathname: '/app/',
          search: '',
          href: 'https://example.com/app/'
        },
        writable: true
      })

      global.$fetch = vi.fn().mockResolvedValueOnce({
        encrypted: 'encodeddata456'
      })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { generateShareableUrl } = useIceUrlShare()

      const url = await generateShareableUrl(minimalData)

      expect(url).toBe('https://example.com/app/preview?data=encodeddata456')
    })

    /**
     * Test: Generate URL with pathname that doesn't end with /
     * Expected: Finds correct base path
     */
    it('should handle pathname without trailing slash', async () => {
      Object.defineProperty(window, 'location', {
        value: {
          origin: 'https://example.com',
          pathname: '/ice-generator/app/form',
          search: ''
        },
        writable: true
      })

      global.$fetch = vi.fn().mockResolvedValueOnce({
        encrypted: 'data789'
      })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { generateShareableUrl } = useIceUrlShare()

      const url = await generateShareableUrl(minimalData)

      expect(url).toContain('https://example.com/ice-generator/app/')
      expect(url).toContain('preview?data=data789')
    })

    /**
     * Test: Propagates encoding errors
     * Expected: Throws error if encoding fails
     */
    it('should propagate encoding errors', async () => {
      global.$fetch = vi
        .fn()
        .mockRejectedValueOnce(new Error('Encryption failed'))

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { generateShareableUrl } = useIceUrlShare()

      try {
        await generateShareableUrl(minimalData)
        expect.fail('Should have thrown error')
      } catch (error: unknown) {
        expect(error).toBeDefined()
      }
    })
  })

  // ==================== getDataFromUrl Tests ====================

  describe('getDataFromUrl', () => {
    /**
     * Test: Extract data from URL query parameter
     * Expected: Decodes and returns IceData
     */
    it('should extract and decode data from URL', async () => {
      Object.defineProperty(window, 'location', {
        value: {
          search: '?data=abc-def_ghi~jkl'
        },
        writable: true
      })

      const decodedJson = JSON.stringify({ n: 'John Doe', a: 5 })
      global.$fetch = vi.fn().mockResolvedValueOnce({
        data: decodedJson
      })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { getDataFromUrl } = useIceUrlShare()

      const data = await getDataFromUrl()

      expect(data?.name).toBe('John Doe')
      expect(data?.age).toBe(5)
    })

    /**
     * Test: Return null when no data parameter
     * Expected: Returns null
     */
    it('should return null when no data parameter in URL', async () => {
      Object.defineProperty(window, 'location', {
        value: { search: '' },
        writable: true
      })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { getDataFromUrl } = useIceUrlShare()

      const data = await getDataFromUrl()

      expect(data).toBeNull()
    })

    /**
     * Test: Return null when window is undefined (SSR)
     * Expected: Returns null gracefully
     */
    it('should return null on server-side (no window)', async () => {
      // Simulate SSR environment
      const originalWindow = global.window
      ;(global as typeof globalThis & { window?: Window }).window = undefined

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { getDataFromUrl } = useIceUrlShare()

      const data = await getDataFromUrl()

      expect(data).toBeNull()

      // Restore window
      ;(global as typeof globalThis & { window?: Window }).window = originalWindow
    })

    /**
     * Test: Handle decoding error gracefully
     * Expected: Returns null
     */
    it('should return null if decoding fails', async () => {
      Object.defineProperty(window, 'location', {
        value: {
          search: '?data=invalid'
        },
        writable: true
      })

      global.$fetch = vi
        .fn()
        .mockRejectedValueOnce(new Error('Decryption failed'))

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { getDataFromUrl } = useIceUrlShare()

      const data = await getDataFromUrl()

      expect(data).toBeNull()
    })

    /**
     * Test: Parse URL with multiple parameters
     * Expected: Extracts correct data parameter
     */
    it('should extract data from URL with multiple parameters', async () => {
      Object.defineProperty(window, 'location', {
        value: {
          search: '?page=preview&data=encoded123&v=1'
        },
        writable: true
      })

      const decodedJson = JSON.stringify({ n: 'Test' })
      global.$fetch = vi.fn().mockResolvedValueOnce({
        data: decodedJson
      })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { getDataFromUrl } = useIceUrlShare()

      const data = await getDataFromUrl()

      expect(data?.name).toBe('Test')
    })
  })

  // ==================== copyShareableUrl Tests ====================

  describe('copyShareableUrl', () => {
    /**
     * Test: Successfully copy URL to clipboard
     * Expected: Returns true and copies URL
     */
    it('should successfully copy URL to clipboard', async () => {
      const mockClipboard = {
        writeText: vi.fn().mockResolvedValueOnce(undefined)
      }
      Object.defineProperty(navigator, 'clipboard', {
        value: mockClipboard,
        writable: true
      })

      global.$fetch = vi.fn().mockResolvedValueOnce({
        encrypted: 'data123'
      })

      Object.defineProperty(window, 'location', {
        value: {
          origin: 'https://example.com',
          pathname: '/app/'
        },
        writable: true
      })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { copyShareableUrl } = useIceUrlShare()

      const success = await copyShareableUrl(minimalData)

      expect(success).toBe(true)
      expect(mockClipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining('preview?data=data123')
      )
    })

    /**
     * Test: Return false when clipboard fails
     * Expected: Returns false, handles error gracefully
     */
    it('should return false when clipboard write fails', async () => {
      const mockClipboard = {
        writeText: vi
          .fn()
          .mockRejectedValueOnce(new Error('Clipboard error'))
      }
      Object.defineProperty(navigator, 'clipboard', {
        value: mockClipboard,
        writable: true
      })

      global.$fetch = vi.fn().mockResolvedValueOnce({
        encrypted: 'data123'
      })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { copyShareableUrl } = useIceUrlShare()

      const success = await copyShareableUrl(minimalData)

      expect(success).toBe(false)
    })

    /**
     * Test: Return false when URL generation fails
     * Expected: Returns false
     */
    it('should return false when URL generation fails', async () => {
      global.$fetch = vi
        .fn()
        .mockRejectedValueOnce(new Error('Encoding failed'))

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { copyShareableUrl } = useIceUrlShare()

      const success = await copyShareableUrl(minimalData)

      expect(success).toBe(false)
    })
  })

  // ==================== getEncodedSize Tests ====================

  describe('getEncodedSize', () => {
    /**
     * Test: Calculate size of encoded data
     * Expected: Returns size in bytes
     */
    it('should return encoded data size in bytes', async () => {
      global.$fetch = vi.fn().mockResolvedValueOnce({
        encrypted: 'abc123def456' // 12 characters
      })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { getEncodedSize } = useIceUrlShare()

      const size = await getEncodedSize(minimalData)

      expect(size).toBeGreaterThan(0)
      expect(typeof size).toBe('number')
    })

    /**
     * Test: Return 0 on encoding error
     * Expected: Returns 0 instead of throwing
     */
    it('should return 0 when encoding fails', async () => {
      global.$fetch = vi
        .fn()
        .mockRejectedValueOnce(new Error('Encoding error'))

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { getEncodedSize } = useIceUrlShare()

      const size = await getEncodedSize(minimalData)

      expect(size).toBe(0)
    })

    /**
     * Test: Size increases with more data
     * Expected: Larger data produces larger encoded size
     */
    it('should produce larger size for more data', async () => {
      // First call for minimal data
      global.$fetch = vi
        .fn()
        .mockResolvedValueOnce({
          encrypted: 'abc123' // Small
        })
        .mockResolvedValueOnce({
          encrypted: 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz+abc' // Larger
        })

      const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
      const { getEncodedSize } = useIceUrlShare()

      const sizeSmall = await getEncodedSize(minimalData)
      const sizeLarge = await getEncodedSize(completeData)

      expect(sizeLarge).toBeGreaterThan(sizeSmall)
    })
  })
})

// ==================== Helper Functions ====================

/**
 * Helper: Serialize test data
 */
function serializeTestData(data: IceData): Record<string, unknown> {
  const compact: Record<string, unknown> = {}

  if (data.name) compact.n = data.name
  if (data.age) compact.a = data.age
  if (data.dateOfBirth) compact.dob = data.dateOfBirth
  if (data.bloodType) compact.b = data.bloodType
  if (data.city) compact.c = data.city
  if (data.address) compact.ad = data.address
  if (data.section) compact.sec = data.section
  if (data.allergies?.length) compact.al = data.allergies
  if (data.medicalConditions?.length) compact.mc = data.medicalConditions
  if (data.currentMedications?.length) compact.cm = data.currentMedications
  if (data.medicalNotes) compact.mn = data.medicalNotes
  if (data.primaryDoctor) compact.pd = data.primaryDoctor
  if (data.insuranceInfo) compact.ii = data.insuranceInfo
  if (data.specialInstructions) compact.si = data.specialInstructions

  if (data.emergencyContacts?.length) {
    compact.ec = data.emergencyContacts.map((contact) => {
      const c: Record<string, unknown> = {}
      if (contact.id) c.i = contact.id
      if (contact.name) c.n = contact.name
      if (contact.relationship) c.r = contact.relationship
      if (contact.phone) c.p = contact.phone
      if (contact.email) c.e = contact.email
      return c
    })
  }

  if (data.school) {
    const s: Record<string, unknown> = {}
    if (data.school.name) s.n = data.school.name
    if (data.school.address) s.a = data.school.address
    if (data.school.city) s.c = data.school.city
    if (data.school.phone) s.p = data.school.phone
    if (data.school.referentPhone) s.rp = data.school.referentPhone
    if (data.school.referentName) s.rn = data.school.referentName
    if (data.school.logoUrl) s.l = data.school.logoUrl
    if (data.school.section) s.sec = data.school.section
    if (Object.keys(s).length > 0) compact.s = s
  }

  return compact
}

/**
 * Helper: Deserialize test data
 */
function deserializeTestData(compact: Record<string, unknown>): IceData {
  const data: IceData = {
    name: compact.n || '',
    age: compact.a || null,
    dateOfBirth: compact.dob || '',
    bloodType: compact.b || '',
    city: compact.c || '',
    address: compact.ad || '',
    section: compact.sec || '',
    allergies: compact.al || [],
    medicalConditions: compact.mc || [],
    currentMedications: compact.cm || [],
    medicalNotes: compact.mn || '',
    emergencyContacts: [],
    primaryDoctor: compact.pd || '',
    insuranceInfo: compact.ii || '',
    specialInstructions: compact.si || '',
    school: {},
    lastUpdated: new Date().toISOString()
  }

  if (compact.ec?.length) {
    data.emergencyContacts = (compact.ec as Record<string, unknown>[]).map((c: Record<string, unknown>) => ({
      id: c.i || crypto.randomUUID(),
      name: c.n || '',
      relationship: c.r || '',
      phone: c.p || '',
      email: c.e || ''
    }))
  }

  if (compact.s) {
    data.school = {
      name: compact.s.n || '',
      address: compact.s.a || '',
      city: compact.s.c || '',
      phone: compact.s.p || '',
      referentPhone: compact.s.rp || '',
      referentName: compact.s.rn || '',
      logoUrl: compact.s.l || '',
      section: compact.s.sec || ''
    }
  }

  return data
}
