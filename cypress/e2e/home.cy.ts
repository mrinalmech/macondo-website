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

  it('Language switching works and German language content is presented', () => {
    cy.viewport(1920, 1080);

    cy.visit('/');

    cy.findByRole('link', { name: /de/ }).should('exist').click();

    cy.findByAltText(/Spiellogo/).should('be.visible');

    cy.findByAltText(/animierte mittelalterliche Rüstungen zu kämpfen/).should('be.visible');
    cy.findByAltText(/Verrostetes Artilleriegeschütz im Vordergrund/, { timeout: 10000 }).should(
      'be.visible',
    );
    cy.findByAltText(/vor einem Monitor/, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/brennenden Figur/, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/schwarzen Frau mit Afro/, { timeout: 10000 }).should('be.visible');
    cy.findByAltText(/animierte mittelalterliche Rüstungen zu kämpfen/, { timeout: 10000 }).should(
      'be.visible',
    );
  });

  it('Steam widget is loaded correctly on scroll and becomes visible when it is in view', () => {
    cy.viewport(1920, 1000);

    cy.visit('/');

    cy.findByTitle(/steam-widget/).should('not.exist');

    cy.scrollTo(0, 10);

    cy.findByTitle(/steam-widget/).should('exist');
    cy.findByTitle(/steam-widget/).should('not.be.visible');

    cy.scrollTo(0, 250);

    cy.findByTitle(/steam-widget/).should('be.visible');

    cy.findByTitle(/steam-widget/)
      .iframe()
      .then(iframes => {
        cy.wrap(iframes[0])
          .findByText(/Wishlist on Steam/)
          .should('be.visible');
      });
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

  it('Features images fade into view on scroll', () => {
    cy.viewport(1920, 1080);

    cy.visit('/');

    cy.findByAltText(/Three figures leaping into action/).should('not.be.visible');

    cy.scrollTo(0, 750);

    cy.findByAltText(/Three figures leaping into action/).should('be.visible');
    cy.findByAltText(/Four figures in a menacing pose/).should('not.be.visible');

    cy.scrollTo(0, 1250);

    cy.findByAltText(/Four figures in a menacing pose/).should('be.visible');
    cy.findByAltText(/Three different guns/).should('not.be.visible');

    cy.scrollTo(0, 1750);

    cy.findByAltText(/Three different guns/).should('be.visible');
  });
});
