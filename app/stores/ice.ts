import { defineStore } from 'pinia'

export interface EmergencyContact {
  id: string
  name: string
  relationship: string
  phone: string
  email?: string
}

export interface IceData {
  // Personal Information
  name: string
  age: number | null
  dateOfBirth?: string
  bloodType?: string
  city?: string
  address?: string
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

export const useIceStore = defineStore('ice', {
  state: (): { data: IceData } => ({
    data: {
      name: '',
      age: null,
      bloodType: '',
      city: '',
      address: '',
      allergies: [],
      medicalConditions: [],
      currentMedications: [],
      medicalNotes: '',
      emergencyContacts: [],
      primaryDoctor: '',
      insuranceInfo: '',
      specialInstructions: '',
      lastUpdated: ''
    }
  }),

  actions: {
    addEmergencyContact(contact: Omit<EmergencyContact, 'id'>) {
      const newContact: EmergencyContact = {
        id: crypto.randomUUID(),
        ...contact
      }
      this.data.emergencyContacts.push(newContact)
      this.data.lastUpdated = new Date().toISOString()
    },

    updateEmergencyContact(id: string, updates: Partial<EmergencyContact>) {
      const index = this.data.emergencyContacts.findIndex(c => c.id === id)
      if (index !== -1) {
        this.data.emergencyContacts[index] = {
          ...this.data.emergencyContacts[index],
          ...updates
        }
        this.data.lastUpdated = new Date().toISOString()
      }
    },

    removeEmergencyContact(id: string) {
      this.data.emergencyContacts = this.data.emergencyContacts.filter(c => c.id !== id)
      this.data.lastUpdated = new Date().toISOString()
    },

    clearData() {
      this.data = {
        name: '',
        age: null,
        bloodType: '',
        city: '',
        address: '',
        allergies: [],
        medicalConditions: [],
        currentMedications: [],
        medicalNotes: '',
        emergencyContacts: [],
        primaryDoctor: '',
        insuranceInfo: '',
        specialInstructions: '',
        lastUpdated: ''
      }
    },

    exportData(): string {
      return JSON.stringify(this.data, null, 2)
    },

    importData(jsonData: string) {
      try {
        const imported = JSON.parse(jsonData)
        this.data = imported
        this.data.lastUpdated = new Date().toISOString()
      } catch (error) {
        console.error('Failed to import ICE data:', error)
        throw new Error('Invalid JSON data')
      }
    },

    loadFromUrlData(urlData: IceData) {
      this.data = {
        ...urlData,
        lastUpdated: new Date().toISOString()
      }
    }
  },

  getters: {
    hasData(): boolean {
      return !!(this.data.name && this.data.age)
    },

    hasEmergencyContacts(): boolean {
      return this.data.emergencyContacts.length > 0
    },

    isComplete(): boolean {
      return this.hasData && this.hasEmergencyContacts
    }
  }
})
