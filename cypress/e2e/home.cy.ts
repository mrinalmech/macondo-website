describe('Homepage tests', () => {
  it('Content is presented and carousel works', () => {
    cy.visit('/');

    cy.findByAltText(/Game Logo/).should('be.visible');

    cy.findByAltText(/animated suits of medieval armor/).should('be.visible');
    cy.findByAltText(/Rusted artillery gun in the foreground/, { timeout: 10000 }).should(
      'be.visible',
    );
    cy.findByAltText(/in front of a monitor screen/, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/flaming figure/, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/black woman with an afro/, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/animated suits of medieval armor/, { timeout: 10000 }).should('be.visible');
  });

  it('Steam widget is loaded correctly', () => {
    const getIframeDocument = () => {
      return cy.get('iframe[title="steam-widget"]').its('0.contentDocument').should('exist');
    };

    const getIframeBody = () => {
      return getIframeDocument().its('body').should('not.be.undefined').then(cy.wrap);
    };

    cy.visit('/');

    cy.findByAltText(/Game Logo/).should('be.visible');

    getIframeBody()
      .findByText(/Wishlist on Steam/)
      .should('be.visible');
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
