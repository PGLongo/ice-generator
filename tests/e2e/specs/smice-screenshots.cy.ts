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
    cy.contains('Informazioni Personali').should('be.visible')

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
    cy.contains('Anteprima').should('be.visible')

    // Wait for preview to load
    cy.wait(2000)

    cy.takeResponsiveScreenshots('03-preview-page')
  })

  it('should capture school card page screenshots', () => {
    // First fill the form with data including school info
    cy.visit('/form')
    cy.fillSmiceForm()

    // Navigate to school card
    cy.visit('/school')
    cy.contains('Biglietto Scuola').should('be.visible')

    // Wait for school card to load
    cy.wait(2000)

    cy.takeResponsiveScreenshots('04-school-card')
  })

  it('should capture complete user flow', () => {
    // Start from landing page
    cy.visit('/')
    cy.takeResponsiveScreenshots('flow-01-landing')

    // Navigate to form
    cy.get('a[href="/form"]').click()
    cy.fillSmiceForm()
    cy.takeResponsiveScreenshots('flow-02-form-completed')

    // Navigate to preview
    cy.get('a[href="/preview"]').click()
    cy.wait(2000)
    cy.takeResponsiveScreenshots('flow-03-preview')

    // Navigate to school card
    cy.get('a[href="/school"]').click()
    cy.wait(2000)
    cy.takeResponsiveScreenshots('flow-04-school')
  })
})