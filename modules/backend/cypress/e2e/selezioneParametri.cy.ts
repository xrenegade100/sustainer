describe('Selezione parametri di addestramento', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/homepage');
    cy.get('a.text-white[href="/addestra"]').click();

    cy.get('.email ').type('aa@aa.it');
    cy.get('.password ').type('123456A!');
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
  });

  it('TC 3.1-1', () => {
    cy.get('.buttonA').click();

    cy.contains('Seleziona tipo di addestramento').should('exist');
  });

  it('TC 3.1-2', () => {
    cy.contains('button', 'Decision Tree').click();
    cy.get(':nth-child(1) > .custom-select').select('gini');
    cy.get(':nth-child(2) > .inputTxt').type('150');
    cy.get(':nth-child(3) > .inputTxt').type('10');
    cy.get(':nth-child(4) > .custom-select').select('Survived');

    cy.get('.buttonA').click();

    cy.contains('Formato dei dati non corretto').should('exist');
  });

  it('TC 3.1-3', () => {
    cy.contains('button', 'Decision Tree').click();
    cy.get(':nth-child(1) > .custom-select').select('gini');
    cy.get(':nth-child(2) > .inputTxt').type('5');
    cy.get(':nth-child(3) > .inputTxt').type('1500');
    cy.get(':nth-child(4) > .custom-select').select('Survived');

    cy.get('.buttonA').click();

    cy.contains('Formato dei dati non corretto').should('exist');
  });

  it('TC 3.1-4', () => {
    cy.contains('button', 'Decision Tree').click();
    cy.get(':nth-child(2) > .inputTxt').type('5');
    cy.get(':nth-child(3) > .inputTxt').type('10');
    cy.get(':nth-child(4) > .custom-select').select('Survived');

    cy.get('.buttonA').click();

    cy.contains('Compila tutti i campi obbligatori').should('exist');
  });

  it('TC 3.1-5', () => {
    cy.contains('button', 'Decision Tree').click();
    cy.get(':nth-child(1) > .custom-select').select('gini');
    cy.get(':nth-child(2) > .inputTxt').type('3');
    cy.get(':nth-child(3) > .inputTxt').type('10');
    cy.get(':nth-child(4) > .custom-select').should(
      'not.have.value',
      'AttributoNonPresente',
    );

    cy.get('.buttonA').click();

    cy.contains('Compila tutti i campi obbligatori').should('exist');
  });

  it('TC 3.1-6', () => {
    cy.contains('button', 'Naive Bayes').click();

    cy.get(':nth-child(2) > .inputTxt').type('0.8');
    cy.get(':nth-child(3) > .custom-select').select('Survived');

    cy.get('.buttonA').click();

    cy.contains('Compila tutti i campi obbligatori').should('exist');
  });

  it('TC 3.1-7', () => {
    cy.contains('button', 'Naive Bayes').click();

    cy.get(':nth-child(1) > .custom-select').select('multinomial');
    cy.get(':nth-child(2) > .inputTxt').type('12');
    cy.get(':nth-child(3) > .custom-select').select('Survived');

    cy.get('.buttonA').click();

    cy.contains('Formato dei dati non corretto').should('exist');
  });

  it('TC 3.1-8', () => {
    cy.contains('button', 'Naive Bayes').click();

    cy.get(':nth-child(1) > .custom-select').select('multinomial');
    cy.get(':nth-child(2) > .inputTxt').type('0.8');
    cy.get(':nth-child(3) > .custom-select').should('not.have.value', '');

    cy.get('.buttonA').click();

    cy.contains('Compila tutti i campi obbligatori').should('exist');
  });

  it('TC 3.1-9', () => {
    cy.contains('button', 'Naive Bayes').click();

    cy.get(':nth-child(1) > .custom-select').select('multinomial');
    cy.get(':nth-child(2) > .inputTxt').type('0.8');
    cy.get(':nth-child(3) > .custom-select').select('Survived');

    cy.get('.buttonA').click();

    cy.url().should('eq', 'http://localhost:5173/fairness');
  });
});
