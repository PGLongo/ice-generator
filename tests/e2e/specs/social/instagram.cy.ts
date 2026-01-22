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
    cy.get('[data-cy="input-name"]').should('be.visible').clear().type('DungeonStore Genova').should('have.value', 'DungeonStore Genova')
    cy.get('[data-cy="input-handle"]').should('be.visible').clear().type('@dungeonstore_genova').should('have.value', '@dungeonstore_genova')
    cy.get('[data-cy="input-cta"]').should('be.visible').clear().type('Seguimi', { delay: 100 }).blur()
    cy.get('[data-cy="input-bg-url"]').should('be.visible').clear().type('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ37dT6xYe5KVvPAVsPATkA1Quoa0FLAZwBiw&s')

    // Wait for Vue to update model
    cy.wait(1000)
    cy.get('[data-cy="debug-cta"]').should('have.text', 'Seguimi')

    // Check if button is enabled
    cy.contains('button', 'Generate Preview')
      .should('be.visible')
      .should('not.be.disabled')
      .click({ force: true })



    // Explicit wait for navigation
    cy.wait(4000)

    // Log current URL for debugging
    cy.url().then(url => {
      cy.log('Current URL:', url)
    })

    // URL should change to preview
    cy.url().should('include', socialPreviewUrl)

    // Check if preview loads
    cy.get('[data-cy="cta-button"]').should('be.visible').and('contain', 'Seguimi')
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
