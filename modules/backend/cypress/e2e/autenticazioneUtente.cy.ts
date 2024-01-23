describe('Autenticazione utente', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/homepage');
    cy.get('.img-avatar').click();
    cy.get('.dropdown-content .text-black').click();
  });

  it('TC-1.2-1', () => {
    cy.get('.email').type('Email.inesistente@gmail.com');
    cy.get('.password').type('Password123!');

    cy.get('.buttonsgupin').contains('Accedi').click();

    cy.contains('Credenziali errate').should('exist');
  });

  it('TC-1.2-2', () => {
    cy.get('.email').type('Emailprova@gmail.com');
    cy.get('.password').type('Password222');

    cy.get('.buttonsgupin').contains('Accedi').click();

    cy.contains('Credenziali errate').should('exist');
  });

  it('TC-1.2-3', () => {
    // RAFFFFFFFEEEEEEEEEEEEEE', LEGGI QUI:
    // Ricordati che l'utente potrebbe non esistere nel tuo db, non aggiungerlo manualmente nel db ma aggiungilo manualmente con la registrazione per via
    // della tabella acquisto che mette il piano free all'utente quando registrato
    cy.get('.email').type('Emailprova@gmail.com');
    cy.get('.password').type('Password123!');

    cy.get('.buttonsgupin').contains('Accedi').click();

    cy.url().should('eq', 'http://localhost:5173/homepage');
  });
});
