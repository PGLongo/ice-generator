/**
 * Test fixtures for IceData
 * Reusable test data for unit and integration tests
 */

import type { IceData } from '@/types/ice'

/**
 * Minimal IceData (only required fields)
 * Use for basic functionality tests
 */
export const minimalIceData: IceData = {
  name: 'John Doe',
  age: 5,
  emergencyContacts: [],
  school: {}
}

/**
 * IceData with some optional fields
 * Use for moderate complexity tests
 */
export const partialIceData: IceData = {
  name: 'Jane Smith',
  age: 8,
  dateOfBirth: '2016-03-15',
  bloodType: 'O+',
  city: 'Boston',
  address: '123 Main Street',
  allergies: ['peanuts'],
  medicalConditions: ['asthma'],
  emergencyContacts: [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Mom',
      relationship: 'Parent',
      phone: '+1-617-555-0123',
      email: 'mom@example.com'
    }
  ],
  school: {
    name: 'Lincoln Elementary School'
  }
}

/**
 * Complete IceData with all fields populated
 * Use for comprehensive tests
 */
export const completeIceData: IceData = {
  name: 'Alice Johnson',
  age: 9,
  dateOfBirth: '2015-06-20',
  bloodType: 'AB+',
  city: 'New York',
  address: '456 Park Avenue',
  section: '4B',
  allergies: ['peanuts', 'shellfish', 'milk'],
  medicalConditions: ['asthma', 'eczema'],
  currentMedications: ['albuterol inhaler', 'hydrocortisone cream'],
  medicalNotes: 'Emergency action plan on file. Keep epinephrine auto-injector with student at all times.',
  emergencyContacts: [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Sarah Johnson',
      relationship: 'Mother',
      phone: '+1-212-555-0101',
      email: 'sarah.johnson@example.com'
    },
    {
      id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      name: 'Michael Johnson',
      relationship: 'Father',
      phone: '+1-212-555-0102',
      email: 'michael.johnson@example.com'
    },
    {
      id: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
      name: 'Dr. Emily Carter',
      relationship: 'Emergency Contact',
      phone: '+1-212-555-0103'
    }
  ],
  primaryDoctor: 'Dr. Michael Williams, MD',
  insuranceInfo: 'United Healthcare #UH123456789',
  specialInstructions: 'Student carries epinephrine auto-injector in backpack. Notify parents immediately in case of allergic reaction. Preferential seating near door for easier evacuation.',
  school: {
    name: 'Lincoln Elementary School',
    address: '789 Education Road',
    city: 'New York',
    phone: '+1-212-555-5000',
    referentPhone: '+1-212-555-5100',
    referentName: 'Ms. Jennifer Lee',
    logoUrl: 'https://example.com/lincoln-logo.png',
    section: '4B'
  },
  lastUpdated: '2024-11-14T10:30:00Z'
}

/**
 * IceData with special characters and unicode
 * Use for internationalization and special character tests
 */
export const unicodeIceData: IceData = {
  name: 'José García Müller',
  age: 7,
  dateOfBirth: '2017-01-15',
  bloodType: 'O-',
  city: 'São Paulo',
  address: 'Avenida Paulista, 1000 - Apt 202',
  section: '2º Ano B',
  allergies: ['penicilina', '花生 (peanuts)', '🥛 Dairy products'],
  medicalConditions: ['asma (asthma)', '아토피성 피부염'],
  currentMedications: ['알부테롤 (albuterol)', 'Cromoglicato disódico'],
  medicalNotes: '心脏状况良好 (Heart condition is good). Contato de emergência: José (pai)',
  emergencyContacts: [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'María José García',
      relationship: 'Mãe (Mother)',
      phone: '+55-11-99999-0001',
      email: 'maria.garcia@exemplo.com.br'
    },
    {
      id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      name: 'José Müller',
      relationship: 'Pai (Father)',
      phone: '+55-11-99999-0002'
    }
  ],
  primaryDoctor: 'Dra. Sofia Rodríguez Santos',
  insuranceInfo: 'Seguros Unimed #BR456789123',
  specialInstructions: 'Criança falante de português, espanhol e alemão. Manter inalador próximo. 🚨 EMERGÊNCIA: Contactar pai imediatamente.',
  school: {
    name: 'Escola Municipal da República',
    address: 'Rua da Educação, 2000 - São Paulo',
    city: 'São Paulo',
    phone: '+55-11-3333-5000',
    referentPhone: '+55-11-3333-5050',
    referentName: 'Prof. Eduardo Silva',
    logoUrl: 'https://example.com.br/escola-logo.png',
    section: '2º Ano B'
  }
}

/**
 * IceData with minimal emergency contacts
 * Use for sparse contact list tests
 */
export const singleContactData: IceData = {
  name: 'Bobby Brown',
  age: 6,
  emergencyContacts: [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Emergency Guardian',
      relationship: 'Guardian',
      phone: '+1-555-0000'
    }
  ],
  school: {}
}

/**
 * IceData with many emergency contacts
 * Use for large contact list tests
 */
export const manyContactsData: IceData = {
  name: 'Charlie Cooper',
  age: 8,
  emergencyContacts: [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Mom',
      relationship: 'Parent',
      phone: '+1-555-0001',
      email: 'mom1@example.com'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'Dad',
      relationship: 'Parent',
      phone: '+1-555-0002',
      email: 'dad1@example.com'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'Grandma',
      relationship: 'Grandparent',
      phone: '+1-555-0003',
      email: 'grandma@example.com'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      name: 'Uncle John',
      relationship: 'Uncle',
      phone: '+1-555-0004'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440005',
      name: 'Aunt Sarah',
      relationship: 'Aunt',
      phone: '+1-555-0005',
      email: 'aunt.sarah@example.com'
    }
  ],
  school: {}
}

/**
 * IceData with extensive medical information
 * Use for medical data tests
 */
export const extensiveMedicalData: IceData = {
  name: 'David Delgado',
  age: 10,
  dateOfBirth: '2014-03-10',
  bloodType: 'B-',
  allergies: [
    'penicillin',
    'sulfonamides',
    'aspirin',
    'peanuts',
    'tree nuts',
    'shellfish',
    'soy',
    'latex'
  ],
  medicalConditions: [
    'Type 1 Diabetes',
    'Asthma',
    'Eczema',
    'GERD',
    'Seasonal Allergies',
    'Migraine disorder'
  ],
  currentMedications: [
    'Insulin (Humalog) - 4 units meal time',
    'Insulin (Lantus) - 10 units at night',
    'Albuterol inhaler - as needed',
    'Omeprazole - 20mg daily',
    'Cetirizine - 5mg daily for allergies',
    'Hydrocortisone cream - as needed for eczema'
  ],
  medicalNotes: 'Type 1 Diabetic on insulin pump therapy. Blood glucose target: 100-150 mg/dL. Check blood sugar before meals and snacks. Hyperglycemia action plan: if >250 mg/dL, check ketones and notify parents. Hypoglycemia action plan: if <70 mg/dL, give 15g fast-acting carbs and retest after 15 min. Carries Dexcom CGM. Emergency glucagon kit must be available.',
  emergencyContacts: [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Maria Delgado',
      relationship: 'Mother',
      phone: '+1-555-0001',
      email: 'maria.delgado@example.com'
    }
  ],
  primaryDoctor: 'Dr. Richard Endocrinologist, MD - Pediatric Endocrinology',
  insuranceInfo: 'Aetna Insurance #AE9876543210 (Group #45678)',
  specialInstructions: 'Student is Type 1 Diabetic and wears insulin pump. Must have unrestricted access to water, bathroom, and glucose monitoring. Snacks provided by school must be carbohydrate-counted. No participation restrictions - normal physical activity encouraged with proper supervision.',
  school: {
    name: 'Riverside Middle School',
    address: '1500 River Road',
    city: 'Denver',
    phone: '+1-303-555-5000',
    referentPhone: '+1-303-555-5100',
    referentName: 'School Nurse Patricia Brown'
  }
}

/**
 * IceData with no optional fields (empty strings/arrays)
 * Use for edge case tests
 */
export const emptyFieldsData: IceData = {
  name: 'Emma Wilson',
  age: null,
  dateOfBirth: '',
  bloodType: '',
  city: '',
  address: '',
  section: '',
  allergies: [],
  medicalConditions: [],
  currentMedications: [],
  medicalNotes: '',
  emergencyContacts: [],
  primaryDoctor: '',
  insuranceInfo: '',
  specialInstructions: '',
  school: {}
}

/**
 * IceData for school-related tests
 * Includes detailed school information
 */
export const schoolData: IceData = {
  name: 'Frank Foster',
  age: 7,
  emergencyContacts: [],
  school: {
    name: 'Greenfield Academy',
    address: '2000 Greenfield Drive',
    city: 'Portland',
    phone: '+1-503-555-0000',
    referentPhone: '+1-503-555-0100',
    referentName: 'Mr. Thomas Howard (Principal)',
    logoUrl: 'https://greenfield-academy.edu/logo.png',
    section: '2A'
  }
}

/**
 * Factory function to create custom IceData
 */
export function createIceData(overrides: Partial<IceData> = {}): IceData {
  return {
    ...minimalIceData,
    ...overrides,
    emergencyContacts: overrides.emergencyContacts || minimalIceData.emergencyContacts,
    school: overrides.school || minimalIceData.school
  }
}
