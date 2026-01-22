/// <reference types="cypress" />

describe('Social Instagram Pages', () => {
  const socialConfigUrl = '/social/instagram'
  const socialPreviewUrl = '/social/instagram/preview'

  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.clear()
    })
  })

  it('should navigate to social instagram configuration page', () => {
    cy.visit(socialConfigUrl)
    cy.get('h1').should('contain', 'Configure CTA')
  })

  it('should generate preview and navigate to preview page', () => {
    cy.visit(socialConfigUrl)

    // Fill Required Fields
    cy.get('input[placeholder="Es. DungeonStore Genova"]').clear().type('DungeonStore Genova')
    cy.get('input[placeholder="Es. @dungeonstore_genova"]').clear().type('@dungeonstore_genova')
    cy.get('input[placeholder="Es. Shop Now"]').clear().type('Seguimi')
    cy.get('input[placeholder="https://example.com/image.jpg"]').clear().type('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ37dT6xYe5KVvPAVsPATkA1Quoa0FLAZwBiw&s')

    // Wait for Vue to update model
    cy.wait(500)

    // Check if button is enabled
    cy.contains('button', 'Generate Preview')
      .should('be.visible')
      .should('not.be.disabled')
      .click({ force: true })

    // Check if loading state appears
    cy.contains('button', 'Generating...').should('be.visible')

    // Explicit wait for navigation
    cy.wait(4000)

    // Log current URL for debugging
    cy.url().then(url => {
      cy.log('Current URL:', url)
    })

    // URL should change to preview
    cy.url().should('include', socialPreviewUrl)

    // Check if preview loads
    cy.contains('Seguimi').should('be.visible')
    cy.contains('button', 'Copy URL').should('exist')
  })

  it('should navigate back to configuration from preview error state', () => {
    // Visit preview without data to trigger error state
    cy.visit(socialPreviewUrl)

    cy.contains('Impossibile caricare l\'anteprima').should('be.visible')
    cy.contains('Torna alla configurazione').click()

    cy.url().should('include', socialConfigUrl)
  })
})
