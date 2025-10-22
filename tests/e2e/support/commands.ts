// Custom Cypress commands for SmICE testing

import { VIEWPORTS } from './e2e'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
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

      /**
       * Fill school information with real data
       */
      fillSchoolInfo(): Chainable<void>
    }
  }
}

// Command to fill the SmICE form with sample data
Cypress.Commands.add('fillSmiceForm', () => {
  // Wait for form to be ready
  cy.wait(1000)

  // Try to fill basic personal information with more robust selectors
  cy.get('input').first().clear().type('Mario Rossi', { force: true })
  cy.get('input[type="number"]').clear().type('35', { force: true })

  // Try to find and fill text areas
  cy.get('textarea').then($textareas => {
    if ($textareas.length > 0) {
      cy.wrap($textareas[0]).clear().type('Penicillina, Polline', { force: true })
    }
  })

  // Fill basic additional information (without school data)
  cy.get('input[name="primaryDoctor"]').clear().type('Dr. Giovanni Bianchi', { force: true })
  cy.get('input[name="city"]').clear().type('Milano', { force: true })
  cy.get('input[name="address"]').clear().type('Via Roma 123', { force: true })

  // Fill insurance and special instructions if present
  cy.get('textarea').then($textareas => {
    if ($textareas.length > 1) {
      cy.wrap($textareas[1]).clear().type('Assicurazione sanitaria privata XYZ', { force: true })
    }
    if ($textareas.length > 2) {
      cy.wrap($textareas[2]).clear().type('In caso di emergenza contattare immediatamente il medico', { force: true })
    }
  })

  // Try to add emergency contact if button exists
  cy.get('button').contains(/aggiungi|add/i).then($button => {
    if ($button.length > 0) {
      cy.wrap($button).click({ force: true })
      cy.wait(1000) // Wait for contact form to appear

      // Fill emergency contact with specific selectors
      cy.get('input[name*="contact-name"]').first().clear().type('Anna Rossi', { force: true })
      cy.get('input[name*="relationship"]').first().clear().type('Moglie', { force: true })
      cy.get('input[name*="phone"]').first().clear().type('+39 333 1234567', { force: true })
      cy.get('input[name*="email"]').first().clear().type('anna.rossi@email.com', { force: true })
    }
  })

  // Fill school information with specific command
  cy.fillSchoolInfo()
})

// Command to fill school information with real data
Cypress.Commands.add('fillSchoolInfo', () => {
  // Fill school fields with specific selectors
  cy.get('input[name="schoolName"]').clear().type('Istituto Scolastico Paritario "Contubernio D\'Albertis" Scuola dell\'infanzia', { force: true })
  cy.get('input[name="schoolPhone"]').clear().type('010 503306', { force: true })
  cy.get('input[name="schoolCity"]').clear().type('Genova', { force: true })
  cy.get('input[name="schoolAddress"]').clear().type('Via Amarena 11', { force: true })
  cy.get('input[name="schoolReferentName"]').clear().type('Maestra Valentina', { force: true })
  cy.get('input[name="schoolReferentPhone"]').clear().type('+39 3206290224', { force: true })
  cy.get('input[name="schoolSection"]').clear().type('BLU', { force: true })
  cy.get('input[name="schoolLogoUrl"]').clear().type('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbNoyPJtWVcDvWsbusFUgVkG2XUrQjXVNRDw&s', { force: true })
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
