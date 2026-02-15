import type { SchoolData } from './school'

/**
 * Person in the school form people list
 */
export interface Person {
  id: string
  fullName: string
}

/**
 * School form complete data structure
 */
export interface SchoolFormData {
  school: SchoolData
  people: Person[]
}
