describe('Selezione parametri di addestramento', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/homepage');
    cy.get('a.text-white[href="/addestra"]').click();

    cy.get('.email ').type('aa@aa.it');
    cy.get('.password ').type('123456A!');
    cy.get('.buttonsgupin').click();
    cy.get('a.text-white[href="/addestra"]').click();
    cy.contains('button', 'Browse files').click();

    /*
    cy.get('.avantiButton')
      .should('have.attr', 'disabled')
      .then(() => {
        datasetCaricato = false;
      });
    */
    cy.get('.avantiButton').should('have.attr', 'disabled');

    cy.get('input[type=file]').selectFile(
      'cypress/fixtures/Titanic-Dataset.csv',
      {
        action: 'drag-drop',
        force: true,
      },
    );

    cy.wait(5500);

    cy.get('.avantiButton').click();
  });
  /*
  it('TC 3.1-1', () => {
    cy.contains('button', 'Naive Bayes').click();
    cy.get(':nth-child(1) > .custom-select').select('gini');
    cy.get(':nth-child(2) > .inputTxt').type('42');
    cy.get(':nth-child(3) > .inputTxt').type('67');
    cy.get(':nth-child(4) > .custom-select').select('Survived');

    cy.get('.buttonA').click();
    cy.url().should('eq', 'http://localhost:5173/fairness');
  });
  */

  it('TC 3.1-12', () => {
    cy.contains('button', 'Decision Tree').click();
    cy.get(':nth-child(1) > .custom-select').select('gini');
    cy.get(':nth-child(2) > .inputTxt').type('42');
    cy.get(':nth-child(3) > .inputTxt').type('67');
    cy.get(':nth-child(4) > .custom-select').select('Survived');

    cy.get('.buttonA').click();
    cy.url().should('eq', 'http://localhost:5173/fairness');
  });
});
