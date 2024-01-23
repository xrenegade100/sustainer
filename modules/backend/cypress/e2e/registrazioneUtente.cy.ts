describe('Registrazione utente', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/homepage');
    cy.get('.img-avatar').click();
    cy.get('.dropdown-content .text-black').click();
    cy.contains('Registrati').click();
  });

  it('TC-1.1-1', () => {
    cy.get('.nome').type('Giorgio');
    cy.get('.cognome').type('Leo');
    cy.get('.emailr').type('giorgio@gmail.com');
    cy.get('.passwordr').type('Giorgio_13');

    cy.get('.buttonsgupin').contains('Registrati').click();

    cy.contains('Utente giÃ  esistente').should('exist');
  });

  it('TC-1.1-2', () => {
    cy.get('.nome').type('Massimo');
    cy.get('.cognome').type('Lordi');
    cy.get('.emailr').type('maxlordi@gmail');
    cy.get('.passwordr').type('Max_125a');

    cy.get('.buttonsgupin').contains('Registrati').click();

    cy.contains('Email non rispetta il formato corretto').should('exist');
  });

  it('TC-1.1-3', () => {
    cy.get('.nome').type('Giuseppe');
    cy.get('.cognome').type('Rossi');
    cy.get('.emailr').type('rossigius@gmail.com');
    cy.get('.passwordr').type('Rossi35876');

    cy.get('.buttonsgupin').contains('Registrati').click();

    cy.contains('La password deve contenere almeno 8 caratteri').should(
      'exist',
    );
  });

  it('TC-1.1-4', () => {
    cy.get('.nome').type('M4auro');
    cy.get('.cognome').type('Caputo');
    cy.get('.emailr').type('caputom@gmail.com');
    cy.get('.passwordr').type('mauroC_258');

    cy.get('.buttonsgupin').contains('Registrati').click();

    cy.contains('Il nome deve contenere solo lettere').should('exist');
  });

  it('TC-1.1-5', () => {
    cy.get('.nome').type('Simone');
    cy.get('.cognome').type('M2urano');
    cy.get('.emailr').type('muranosimo@gmail.com');
    cy.get('.passwordr').type('M78rano_simo');

    cy.get('.buttonsgupin').contains('Registrati').click();

    cy.contains('Il cognome deve contenere solo lettere').should('exist');
  });

  it('TC-1.1-6', () => {
    cy.get('.nome').type('Antonio');
    cy.get('.cognome').type('Giorgio');
    cy.get('.emailr').type('giorgio45@gmail.com');
    cy.get('.passwordr').type('Giorgio45_Anto');

    cy.get('.buttonsgupin').contains('Registrati').click();

    cy.contains('Registrazione avvenuta con successo').should('exist');
  });
});
