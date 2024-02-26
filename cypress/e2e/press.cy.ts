describe('Presskit tests', () => {
  it('Navigates to press kit and content is presented', () => {
    cy.viewport(1920, 1080);
    cy.visit('/');
    cy.findByRole('link', { name: /Press/ }).should('exist').click();

    cy.findByText(/We are a small indie studio located in/).should('exist');

    cy.findAllByRole('link', { name: /Global Steel/ })
      .should('have.length.greaterThan', 0)
      .first()
      .click();

    cy.findByText(
      /Global Steel is a 2d run-and-gun video game inspired by Saturday-morning cartoons/,
    ).should('exist');
  });
});
