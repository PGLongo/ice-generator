import type { IceData } from '@/types/ice'

interface CompactData {
  n?: string
  a?: number
  dob?: string
  b?: string
  c?: string
  ad?: string
  sec?: string
  al?: string[]
  mc?: string[]
  cm?: string[]
  mn?: string
  ec?: CompactContact[]
  pd?: string
  ii?: string
  si?: string
  s?: CompactSchool
}

interface CompactContact {
  i?: string
  n?: string
  r?: string
  p?: string
  e?: string
}

interface CompactSchool {
  n?: string
  a?: string
  c?: string
  p?: string
  rp?: string
  rn?: string
  l?: string
  sec?: string
}

/**
 * Composable for encoding/decoding ICE data to/from URL query parameters
 * Uses server-side AES-256-GCM encryption for secure data sharing
 *
 * Flow:
 * 1. Client serializes data to compact format
 * 2. Client sends to /api/encrypt endpoint
 * 3. Server encrypts with secret key (never leaves server)
 * 4. Client embeds encrypted string in URL/QR
 * 5. On scan, /api/decrypt decodes the data
 *
 * Field abbreviations for minimal size:
 * n=name, a=age, dob=dateOfBirth, b=bloodType, c=city, ad=address,
 * al=allergies, mc=medicalConditions, cm=currentMedications,
 * mn=medicalNotes, ec=emergencyContacts, pd=primaryDoctor,
 * ii=insuranceInfo, si=specialInstructions
 */
export const useIceUrlShare = () => {
  /**
   * Serialize ICE data to compact format (remove empty fields, abbreviate keys)
   */
  const serializeData = (data: IceData): CompactData => {
    const compact: CompactData = {}

    // Only include non-empty fields with abbreviated keys
    if (data.name) {
      compact.n = data.name
    }
    if (data.age) {
      compact.a = data.age
    }
    if (data.dateOfBirth) {
      compact.dob = data.dateOfBirth
    }
    if (data.bloodType) {
      compact.b = data.bloodType
    }
    if (data.city) {
      compact.c = data.city
    }
    if (data.address) {
      compact.ad = data.address
    }
    if (data.section) {
      compact.sec = data.section
    }
    if (data.allergies?.length) {
      compact.al = data.allergies
    }
    if (data.medicalConditions?.length) {
      compact.mc = data.medicalConditions
    }
    if (data.currentMedications?.length) {
      compact.cm = data.currentMedications
    }
    if (data.medicalNotes) {
      compact.mn = data.medicalNotes
    }
    if (data.primaryDoctor) {
      compact.pd = data.primaryDoctor
    }
    if (data.insuranceInfo) {
      compact.ii = data.insuranceInfo
    }
    if (data.specialInstructions) {
      compact.si = data.specialInstructions
    }

    // Compact emergency contacts
    if (data.emergencyContacts?.length) {
      compact.ec = data.emergencyContacts.map((contact): CompactContact => {
        const c: CompactContact = {}
        if (contact.id) {
          c.i = contact.id
        }
        if (contact.name) {
          c.n = contact.name
        }
        if (contact.relationship) {
          c.r = contact.relationship
        }
        if (contact.phone) {
          c.p = contact.phone
        }
        if (contact.email) {
          c.e = contact.email
        }
        return c
      })
    }

    // Compact school information
    if (data.school) {
      const s: CompactSchool = {}
      if (data.school.name) {
        s.n = data.school.name
      }
      if (data.school.address) {
        s.a = data.school.address
      }
      if (data.school.city) {
        s.c = data.school.city
      }
      if (data.school.phone) {
        s.p = data.school.phone
      }
      if (data.school.referentPhone) {
        s.rp = data.school.referentPhone
      }
      if (data.school.referentName) {
        s.rn = data.school.referentName
      }
      if (data.school.logoUrl) {
        s.l = data.school.logoUrl
      }
      if (data.school.section) {
        s.sec = data.school.section
      }
      if (Object.keys(s).length > 0) {
        compact.s = s
      }
    }

    return compact
  }

  /**
   * Deserialize compact format back to ICE data
   */
  const deserializeData = (compact: CompactData): IceData => {
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

    // Restore emergency contacts
    if (compact.ec?.length) {
      data.emergencyContacts = compact.ec.map((c) => ({
        id: c.i || crypto.randomUUID(),
        name: c.n || '',
        relationship: c.r || '',
        phone: c.p || '',
        email: c.e || ''
      }))
    }

    // Restore school information
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

  /**
   * Encode ICE data using server-side encryption
   */
  const encodeData = async (data: IceData): Promise<string> => {
    try {
      // Serialize to compact format
      const compact = serializeData(data)

      // Convert to JSON string
      const jsonString = JSON.stringify(compact)

      // Send to server for encryption
      const response = await $fetch<{ encrypted: string }>('/api/encrypt', {
        method: 'POST',
        body: { data: jsonString }
      })

      if (!response.encrypted) {
        throw new Error('Server returned invalid encrypted data')
      }

      // Make URL-safe by replacing characters
      const urlSafe = response.encrypted
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
        .replace(/:/g, '~') // Replace : with ~ for URL safety

      return urlSafe
    } catch (error) {
      console.error('Failed to encode ICE data:', error)
      throw new Error('Encoding failed')
    }
  }

  /**
   * Decode encrypted string back to ICE data using server-side decryption
   */
  const decodeData = async (encoded: string): Promise<IceData | null> => {
    try {
      // Restore encrypted string from URL-safe format
      const encrypted = encoded
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .replace(/~/g, ':') // Restore : separator

      // Send to server for decryption
      const response = await $fetch<{ data: string }>('/api/decrypt', {
        method: 'POST',
        body: { encrypted }
      })

      if (!response.data) {
        throw new Error('Server returned invalid decrypted data')
      }

      // Parse JSON
      const compact = JSON.parse(response.data)

      // Deserialize back to full format
      const data = deserializeData(compact)

      return data
    } catch (error) {
      console.error('Failed to decode ICE data:', error)
      return null
    }
  }

  /**
   * Generate shareable URL with encoded data (points to /preview)
   */
  const generateShareableUrl = async (data: IceData, baseUrl?: string): Promise<string> => {
    const encoded = await encodeData(data)

    // If baseUrl is provided, use it
    if (baseUrl) {
      return `${baseUrl}/preview?data=${encoded}`
    }

    // Otherwise, construct from window.location with proper base path
    const { origin, pathname } = window.location
    // Get the base path (everything except the current page)
    // e.g., /ice-generator/ from /ice-generator/index.html
    const basePath = pathname.endsWith('/')
      ? pathname
      : pathname.substring(0, pathname.lastIndexOf('/') + 1)

    return `${origin}${basePath}preview?data=${encoded}`
  }

  /**
   * Extract and decode data from current URL query params
   */
  const getDataFromUrl = async (): Promise<IceData | null> => {
    if (typeof window === 'undefined') return null

    const params = new URLSearchParams(window.location.search)
    const encodedData = params.get('data')

    if (!encodedData) return null

    return await decodeData(encodedData)
  }

  /**
   * Copy shareable URL to clipboard
   */
  const copyShareableUrl = async (data: IceData): Promise<boolean> => {
    try {
      const url = await generateShareableUrl(data)
      await navigator.clipboard.writeText(url)
      return true
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      return false
    }
  }

  /**
   * Get estimated size of encoded data (in bytes)
   */
  const getEncodedSize = async (data: IceData): Promise<number> => {
    try {
      const encoded = await encodeData(data)
      return new Blob([encoded]).size
    } catch {
      return 0
    }
  }

  return {
    encodeData,
    decodeData,
    generateShareableUrl,
    getDataFromUrl,
    copyShareableUrl,
    getEncodedSize
  }
}
