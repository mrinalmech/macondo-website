describe('Presskit tests', () => {
  it('Navigates to press kit and content is presented', () => {
    cy.visit('/');
    cy.findByRole('link', { name: /Press/i }).should('exist').click();

    cy.findByText(/We are a small indie studio located in/i).should('exist');

    cy.findAllByRole('link', { name: /Global Steel/i })
      .should('have.length.greaterThan', 0)
      .first()
      .click();

    cy.findByText(
      /Global Steel is a 2d run-and-gun video game inspired by Saturday-morning cartoons/i,
    ).should('exist');
  });
});
