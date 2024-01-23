describe('Caricamento Dataset', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/homepage');
    cy.get('.img-avatar').click();
    cy.get('.dropdown-content .text-black').click();
    cy.get('.email').type('alfonso.scognamiglio@gmail.com');
    cy.get('.password').type('Alfonsocannavale01!');

    cy.get('.buttonsgupin').contains('Accedi').click();
    cy.get('a.text-white[href="/addestra"]').click();
  });

  it('TC-3.2-1', () => {
    cy.get('input[type=file]').selectFile('cypress/fixtures/prova.png', {
      action: 'drag-drop',
      force: true,
    });
    cy.wait(6000);
    cy.contains('Errore: puoi caricare solo file .csv').should('exist');
  });

  it('TC-3.2-2', () => {
    cy.get('input[type=file]').selectFile('cypress/fixtures/dataset1.csv', {
      action: 'drag-drop',
      force: true,
    });
    cy.wait(6000);
    cy.contains('Errore: il contenuto del file non è valido').should('exist');
  });

  it('TC-3.2-3', () => {
    cy.get('input[type=file]').selectFile('cypress/fixtures/dataset2.csv', {
      action: 'drag-drop',
      force: true,
    });
    cy.wait(6000);
    cy.contains('Errore: il contenuto del file non è valido').should('exist');
  });

  it('TC-3.2-4', () => {
    cy.get('input[type=file]').selectFile(
      'cypress/fixtures/Titanic-Dataset.csv',
      {
        action: 'drag-drop',
        force: true,
      },
    );
    cy.wait(6000);
    cy.contains('File caricato con successo').should('exist');
  });
});
