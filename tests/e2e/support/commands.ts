// Custom Cypress commands for SmICE testing

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Fill the SmICE form with sample data
       */
      fillSmiceForm(): Chainable<void>
      
      /**
       * Take screenshots at all standard resolutions
       */
      takeResponsiveScreenshots(name: string): Chainable<void>
    }
  }
}

import { VIEWPORTS, type ViewportName } from './e2e'

// Command to fill the SmICE form with sample data
Cypress.Commands.add('fillSmiceForm', () => {
  // Personal Information
  cy.get('input[name="name"]').type('Mario Rossi')
  cy.get('input[name="age"]').type('35')
  cy.get('input[name="bloodType"]').type('A+')
  cy.get('input[name="city"]').type('Milano')
  cy.get('input[name="address"]').type('Via Roma 123')

  // Medical Information
  cy.get('textarea[name="allergies"]').type('Penicillina, Polline')
  cy.get('textarea[name="medicalConditions"]').type('Diabete tipo 2')
  cy.get('textarea[name="currentMedications"]').type('Metformina 500mg')
  cy.get('textarea[name="medicalNotes"]').type('Controlli glicemici regolari')

  // Emergency Contacts
  cy.get('[data-cy="add-emergency-contact"]').click()
  cy.get('input[name="emergencyContacts.0.name"]').type('Anna Rossi')
  cy.get('input[name="emergencyContacts.0.relationship"]').type('Moglie')
  cy.get('input[name="emergencyContacts.0.phone"]').type('+39 333 1234567')
  cy.get('input[name="emergencyContacts.0.email"]').type('anna.rossi@email.com')

  // Additional Information
  cy.get('input[name="primaryDoctor"]').type('Dr. Giovanni Bianchi')
  cy.get('textarea[name="insuranceInfo"]').type('Assicurazione sanitaria privata XYZ')
  cy.get('textarea[name="specialInstructions"]').type('In caso di emergenza contattare immediatamente il medico')

  // School Information
  cy.get('input[name="school.name"]').type('Scuola Primaria Manzoni')
  cy.get('input[name="school.address"]').type('Via Manzoni 45, Milano')
  cy.get('input[name="school.phone"]').type('+39 02 1234567')
  cy.get('input[name="school.referent"]').type('Maestra Elena Verdi')
  cy.get('input[name="school.referentPhone"]').type('+39 333 7654321')
})

// Command to take screenshots at all resolutions
Cypress.Commands.add('takeResponsiveScreenshots', (name: string) => {
  Object.entries(VIEWPORTS).forEach(([viewport, size]) => {
    cy.viewport(size.width, size.height)
    cy.wait(1000) // Wait for responsive adjustments
    cy.screenshot(`${name}-${viewport}`, { 
      capture: 'viewport',
      overwrite: true 
    })
  })
})