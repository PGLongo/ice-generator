/**
 * School information (full)
 */
export interface SchoolData {
  name?: string
  address?: string
  city?: string
  phone?: string
  referentPhone?: string
  referentName?: string
  logoUrl?: string
  section?: string
}

/**
 * School info for card
 */
export interface School {
  name?: string
  address?: string
  city?: string
  phone?: string
  logoUrl?: string
}

/**
 * Student info for card
 */
export interface Student {
  name?: string
  section?: string
}

/**
 * Referent info for card
 */
export interface Referent {
  name?: string
  phone?: string
}
