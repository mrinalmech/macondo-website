describe('Homepage tests', () => {
  it('Content is presented and carousel works', () => {
    cy.visit('/');

    cy.findByText(/SUIT UP/i).should('exist');

    cy.findByAltText(/Red figure/).should('be.visible');
    cy.findByAltText(/Green figure/, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/Three figures/, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/flaming figure/, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/light beams/, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/Red figure/, { timeout: 10000 }).should('be.visible');
  });

  it('Header changes background color on scroll', () => {
    cy.visit('/');
    cy.findByTestId(/nav-holder/)
      .should('have.css', 'background-color')
      .and('eq', 'rgba(0, 0, 0, 0)');

    cy.scrollTo(0, 50);

    cy.findByTestId(/nav-holder/)
      .should('have.css', 'background-color')
      .and('eq', 'rgb(0, 0, 0)');
  });
});
