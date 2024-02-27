describe('Homepage tests', () => {
  it('Content is presented and carousel works', () => {
    cy.visit('/');

    cy.findByAltText(/Game Logo/).should('be.visible');

    cy.findByAltText(/Red figure/).should('be.visible');
    cy.findByAltText(/Green figure/, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/Three figures/, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/flaming figure/, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/light beams/, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/Red figure/, { timeout: 10000 }).should('be.visible');
  });

  it('Header changes background color on scroll', () => {
    cy.visit('/');

    cy.findByAltText(/Game Logo/).should('be.visible');

    cy.findByTestId(/nav-holder/)
      .should('have.css', 'background-color')
      .and('eq', 'rgba(0, 0, 0, 0)');

    cy.scrollTo(0, 100);

    cy.findByTestId(/nav-holder/)
      .should('have.css', 'background-color')
      .and('eq', 'rgb(0, 0, 0)');
  });

  it('Hamburger only visible on smaller screens', () => {
    cy.viewport(1920, 1080);

    cy.visit('/');

    cy.findByLabelText(/Open the menu/, { timeout: 10000 }).should('not.be.visible');

    cy.viewport(400, 1080);

    cy.findByLabelText(/Open the menu/, { timeout: 10000 }).should('be.visible');
  });

  it('Drawer is toggled via hamburger', () => {
    cy.viewport(400, 1080);

    cy.visit('/');

    cy.findByAltText(/Game Logo/).should('be.visible');

    cy.findByTestId(/drawer/, { timeout: 10000 }).should('not.exist');

    cy.findByLabelText(/Open the menu/, { timeout: 10000 }).click();

    cy.findByTestId(/drawer/, { timeout: 10000 }).should('be.visible');

    cy.findByLabelText(/Close the menu/, { timeout: 10000 }).click();

    cy.findByTestId(/drawer/, { timeout: 10000 }).should('not.exist');
  });

  it('Drawer is removed on increasing screen size', () => {
    cy.viewport(400, 1080);

    cy.visit('/');

    cy.findByAltText(/Game Logo/).should('be.visible');

    cy.findByLabelText(/Open the menu/, { timeout: 10000 }).click();

    cy.findByTestId(/drawer/, { timeout: 10000 }).should('be.visible');

    cy.viewport(1920, 1080);

    cy.findByTestId(/drawer/, { timeout: 10000 }).should('not.exist');
  });
});
