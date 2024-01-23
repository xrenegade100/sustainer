describe('Autenticazione amministratore', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/homepage');
    cy.visit('http://localhost:5173/loginAm');
  });

  it('TC-1.3-1', () => {
    cy.get('.emailAM').type('susadddmin@gmail.com');
    cy.get('.passwordAM').type('123456A!');

    cy.get('.buttonloginAM').contains('Accedi').click();

    cy.contains('Credenziali errate').should('exist');
  });

  it('TC-1.3-2', () => {
    cy.get('.emailAM').type('susadmin@gmail.com');
    cy.get('.passwordAM').type('1234567A!');

    cy.get('.buttonloginAM').contains('Accedi').click();

    cy.contains('Credenziali errate').should('exist');
  });

  it('TC-1.3-3', () => {
    cy.get('.emailAM').type('susadmin@gmail.com');
    cy.get('.passwordAM').type('123456A!');

    cy.get('.buttonloginAM').contains('Accedi').click();

    cy.url().should('eq', 'http://localhost:5173/homepage');
  });
});
