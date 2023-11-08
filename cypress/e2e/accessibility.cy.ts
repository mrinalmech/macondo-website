describe('Accessibility tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('Has no detectable accessibility violations on load', () => {
    cy.checkA11y();
  });
});
