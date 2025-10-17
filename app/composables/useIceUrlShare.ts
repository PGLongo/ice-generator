import type { IceData } from '@/types/ice'
import pako from 'pako'

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
 * Uses optimized serialization + gzip compression + Base64 encoding
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
   * Encode ICE data to a compressed URL-safe Base64 string
   */
  const encodeData = (data: IceData): string => {
    try {
      // Serialize to compact format
      const compact = serializeData(data)

      // Convert to JSON string
      const jsonString = JSON.stringify(compact)

      // Compress with gzip (level 9 for maximum compression)
      const compressed = pako.gzip(jsonString, { level: 9 })

      // Convert to Base64
      const base64 = btoa(String.fromCharCode(...compressed))

      // Make URL-safe by replacing characters
      const urlSafe = base64
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')

      return urlSafe
    } catch (error) {
      console.error('Failed to encode ICE data:', error)
      throw new Error('Encoding failed')
    }
  }

  /**
   * Decode compressed URL-safe Base64 string back to ICE data
   */
  const decodeData = (encoded: string): IceData | null => {
    try {
      // Restore Base64 characters
      let base64 = encoded
        .replace(/-/g, '+')
        .replace(/_/g, '/')

      // Add padding if needed
      while (base64.length % 4) {
        base64 += '='
      }

      // Decode from Base64
      const binaryString = atob(base64)

      // Convert to Uint8Array
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      // Decompress with gunzip
      const decompressed = pako.ungzip(bytes, { to: 'string' })

      // Parse JSON
      const compact = JSON.parse(decompressed)

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
  const generateShareableUrl = (data: IceData, baseUrl?: string): string => {
    const encoded = encodeData(data)

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
  const getDataFromUrl = (): IceData | null => {
    if (typeof window === 'undefined') return null

    const params = new URLSearchParams(window.location.search)
    const encodedData = params.get('data')

    if (!encodedData) return null

    return decodeData(encodedData)
  }

  /**
   * Copy shareable URL to clipboard
   */
  const copyShareableUrl = async (data: IceData): Promise<boolean> => {
    try {
      const url = generateShareableUrl(data)
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
  const getEncodedSize = (data: IceData): number => {
    try {
      const encoded = encodeData(data)
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
