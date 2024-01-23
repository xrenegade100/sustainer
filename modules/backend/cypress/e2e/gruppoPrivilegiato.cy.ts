describe('Selezione gruppo privilegiato', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/homepage');
    cy.get('a.text-white[href="/addestra"]').click();

    cy.get('.email ').type('alfonso.scognamiglio@gmail.com');
    cy.get('.password ').type('Alfonsocannavale01!');
    cy.get('.buttonsgupin').click();
    cy.get('a.text-white[href="/addestra"]').click();
    cy.contains('button', 'Browse files').click();

    cy.get('input[type=file]').selectFile(
      'cypress/fixtures/Titanic-Dataset.csv',
      {
        action: 'drag-drop',
        force: true,
      },
    );
    cy.wait(5500);
    cy.get('.avantiButton').click();

    cy.contains('button', 'Naive Bayes').click();

    cy.get(':nth-child(1) > .custom-select').select('multinomial');
    cy.get(':nth-child(2) > .inputTxt').type('0.8');
    cy.get(':nth-child(3) > .custom-select').select('Survived');

    cy.get('.buttonA').click();
  });

  it('TC-3.3-1', () => {
    cy.get('.css-blESqp').click();
    cy.get('#bui6').contains('NonEsiste').should('not.exist');
  });

  it('TC-3.3-2', () => {
    cy.get('.css-jYsWkC').click();
    cy.contains('Sex').click();
    cy.get('span.css-krCBTw[title="Sex"]').should('contain', 'Sex');
  });
});
