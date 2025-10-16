/**
 * Emergency contact information
 */
export interface EmergencyContact {
  id: string
  name: string
  relationship: string
  phone: string
  email?: string
}

/**
 * ICE (In Case of Emergency) data structure
 * Contains personal information, medical details, and emergency contacts
 */
export interface IceData {
  // Personal Information
  name: string
  age: number | null
  dateOfBirth?: string
  bloodType?: string
  city?: string
  address?: string

  // Medical Information
  allergies?: string[]
  medicalConditions?: string[]
  currentMedications?: string[]
  medicalNotes?: string

  // Emergency Contacts
  emergencyContacts: EmergencyContact[]

  // Additional Information
  primaryDoctor?: string
  insuranceInfo?: string
  specialInstructions?: string

  // Metadata
  lastUpdated?: string
}
