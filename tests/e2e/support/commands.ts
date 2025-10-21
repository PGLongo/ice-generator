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
  // Personal Information section
  cy.get('[name="name"] input').type('Mario Rossi')
  cy.get('[name="age"] input').type('35')
  cy.get('[name="bloodType"] button').click()
  cy.contains('A+').click()
  cy.get('[name="city"] input').type('Milano')
  cy.get('[name="address"] input').type('Via Roma 123')

  // Medical Information section
  cy.get('[name="allergies"] textarea').type('Penicillina, Polline')
  cy.get('[name="medicalConditions"] textarea').type('Diabete tipo 2')
  cy.get('[name="currentMedications"] textarea').type('Metformina 500mg')
  cy.get('[name="medicalNotes"] textarea').type('Controlli glicemici regolari')

  // Emergency Contacts section
  cy.contains('Aggiungi Contatto').click()
  cy.get('[data-cy="emergency-contact-0"] [name="name"] input').type('Anna Rossi')
  cy.get('[data-cy="emergency-contact-0"] [name="relationship"] input').type('Moglie')
  cy.get('[data-cy="emergency-contact-0"] [name="phone"] input').type('+39 333 1234567')
  cy.get('[data-cy="emergency-contact-0"] [name="email"] input').type('anna.rossi@email.com')

  // Additional Information section
  cy.get('[name="primaryDoctor"] input').type('Dr. Giovanni Bianchi')
  cy.get('[name="insuranceInfo"] textarea').type('Assicurazione sanitaria privata XYZ')
  cy.get('[name="specialInstructions"] textarea').type('In caso di emergenza contattare immediatamente il medico')

  // School Information section
  cy.get('[name="schoolName"] input').type('Scuola Primaria Manzoni')
  cy.get('[name="schoolAddress"] input').type('Via Manzoni 45, Milano')
  cy.get('[name="schoolPhone"] input').type('+39 02 1234567')
  cy.get('[name="schoolReferent"] input').type('Maestra Elena Verdi')
  cy.get('[name="schoolReferentPhone"] input').type('+39 333 7654321')
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