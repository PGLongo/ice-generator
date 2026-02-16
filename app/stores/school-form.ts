import { defineStore } from 'pinia'
import type { SchoolFormData, Person } from '@/types/school-form'

export const useSchoolFormStore = defineStore('school-form', {
  state: (): { data: SchoolFormData } => ({
    data: {
      school: {},
      people: []
    }
  }),

  actions: {
    addPerson(fullName: string) {
      const newPerson: Person = {
        id: crypto.randomUUID(),
        fullName: fullName.trim()
      }
      this.data.people.push(newPerson)
    },

    removePerson(id: string) {
      this.data.people = this.data.people.filter(p => p.id !== id)
    },

    importPeople(people: Person[]) {
      // Append imported people to existing list
      this.data.people.push(...people)
    },

    clearPeople() {
      this.data.people = []
    },

    loadData(saved: SchoolFormData) {
      this.data.school = saved.school || {}
      this.data.people = saved.people || []
    },

    clearAll() {
      this.data.school = {}
      this.data.people = []
    }
  },

  getters: {
    hasPeople(): boolean {
      return this.data.people.length > 0
    },

    peopleCount(): number {
      return this.data.people.length
    }
  }
})
