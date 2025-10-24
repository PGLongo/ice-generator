/// <reference types="cypress" />

describe('SmICE Application Screenshots', () => {
  beforeEach(() => {
    // Clear any existing data
    cy.window().then((win) => {
      win.localStorage.clear()
    })
  })

  it('should capture landing page screenshots', () => {
    cy.visit('/')
    cy.contains('SmICE').should('be.visible')

    // Wait for animations to complete
    cy.wait(2000)

    cy.takeResponsiveScreenshots('01-landing-page')
  })

  it('should capture form page screenshots with filled data', () => {
    cy.visit('/form')
    // Wait for page to load completely
    cy.wait(2000)

    // Check if we're on the form page by looking for any form element
    cy.get('form, input, textarea').should('exist')

    // Fill the form with sample data
    cy.fillSmiceForm()

    // Wait for form to be populated
    cy.wait(1000)

    cy.takeResponsiveScreenshots('02-form-filled')
  })

  it('should capture preview page screenshots', () => {
    // First fill the form with data
    cy.visit('/form')
    cy.fillSmiceForm()

    // Navigate to preview
    cy.visit('/preview')
    // Just wait and check for any content, don't look for specific Italian text
    cy.wait(3000)
    cy.get('body').should('be.visible')

    cy.takeResponsiveScreenshots('03-preview-page')
  })

  it('should capture school card page screenshots', () => {
    // First fill the form with data including school info
    cy.visit('/form')
    cy.fillSmiceForm()

    // Navigate to school card
    cy.visit('/school')
    // Just wait and check for any content, don't look for specific Italian text
    cy.wait(3000)
    cy.get('body').should('be.visible')

    cy.takeResponsiveScreenshots('04-school-card')
  })

  it('should capture complete user flow', () => {
    // Start from landing page
    cy.visit('/')
    cy.takeResponsiveScreenshots('flow-01-landing')

    // Navigate to form - use more flexible selector
    cy.get('a').contains(/form|modulo/i).first().click()
    cy.wait(2000)
    cy.fillSmiceForm()
    cy.takeResponsiveScreenshots('flow-02-form-completed')

    // Navigate to preview - try direct URL navigation
    cy.visit('/preview')
    cy.wait(2000)
    cy.takeResponsiveScreenshots('flow-03-preview')

    // Navigate to school card - try direct URL navigation
    cy.visit('/school')
    cy.wait(2000)
    cy.takeResponsiveScreenshots('flow-04-school')
  })
})
