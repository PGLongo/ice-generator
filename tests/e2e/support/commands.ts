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
    }
  }
}

// Command to fill the SmICE form with sample data
Cypress.Commands.add('fillSmiceForm', () => {
  // Wait for form to be ready
  cy.wait(1000)

  // Try to fill basic personal information with more robust selectors
  cy.get('input').first().type('Mario Rossi', { force: true })
  cy.get('input[type="number"]').type('35', { force: true })

  // Try to find and fill text areas
  cy.get('textarea').then($textareas => {
    if ($textareas.length > 0) {
      cy.wrap($textareas[0]).type('Penicillina, Polline', { force: true })
    }
  })

  // Fill any other visible inputs
  cy.get('input[type="text"]').then($inputs => {
    const texts = ['Milano', 'Via Roma 123', 'Dr. Giovanni Bianchi']
    $inputs.each((index, input) => {
      if (index < texts.length && index > 1) { // Skip first two already filled
        cy.wrap(input).type(texts[index - 2], { force: true })
      }
    })
  })

  // Try to add emergency contact if button exists
  cy.get('button').contains(/aggiungi|add/i).then($button => {
    if ($button.length > 0) {
      cy.wrap($button).click({ force: true })
      cy.wait(500)

      // Fill emergency contact details (nome, relazione, telefono)
      cy.get('input').then($inputs => {
        const emergencyData = ['Anna Rossi', 'Moglie', '+39 333 1234567']
        let emergencyIndex = 0

        $inputs.each((index, input) => {
          // Fill the last few inputs (emergency contact fields)
          if (index >= $inputs.length - 3 && emergencyIndex < emergencyData.length) {
            cy.wrap(input).clear().type(emergencyData[emergencyIndex], { force: true })
            emergencyIndex++
          }
        })
      })
    }
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
