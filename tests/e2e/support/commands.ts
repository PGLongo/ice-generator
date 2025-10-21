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

  // Fill any other visible inputs including school data
  cy.get('input[type="text"]').then($inputs => {
    const texts = [
      'Milano', 
      'Via Roma 123', 
      'Dr. Giovanni Bianchi',
      'Istituto Scolastico Paritario "Contubernio D\'Albertis" Scuola dell\'infanzia',
      'Via Amarena 11',
      'Genova',
      '010 503306',
      'Maestra Valentina',
      '+39 3206290224',
      'BLU'
    ]
    $inputs.each((index, input) => {
      if (index < texts.length && index > 1) { // Skip first two already filled
        cy.wrap(input).clear().type(texts[index - 2], { force: true })
      }
    })
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
  const schoolData = {
    name: 'Istituto Scolastico Paritario "Contubernio D\'Albertis" Scuola dell\'infanzia',
    address: 'Via Amarena 11',
    city: 'Genova', 
    phone: '010 503306',
    referentName: 'Maestra Valentina',
    referentPhone: '+39 3206290224',
    section: 'BLU'
  }

  // Try to fill school fields by looking for school-related inputs
  cy.get('input').then($inputs => {
    const schoolTexts = Object.values(schoolData)
    let schoolIndex = 0
    
    $inputs.each((index, input) => {
      // Try to fill the last inputs (likely school fields)
      if (index >= Math.max(0, $inputs.length - schoolTexts.length) && schoolIndex < schoolTexts.length) {
        cy.wrap(input).clear().type(schoolTexts[schoolIndex], { force: true })
        schoolIndex++
      }
    })
  })
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
