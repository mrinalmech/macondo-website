describe('Homepage tests', () => {
  it('Content is presented and slideshow works', () => {
    cy.visit('/');

    cy.findByText(/SUIT UP/i).should('exist');

    cy.findByAltText(/Red figure/i).should('be.visible');
    cy.findByAltText(/Green figure/i, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/Three figures/i, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/flaming figure/i, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/light beams/i, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/Red figure/i, { timeout: 10000 }).should('be.visible');
  });
});
