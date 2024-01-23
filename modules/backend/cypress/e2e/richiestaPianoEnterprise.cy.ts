describe('Richiesta piano Enterpise', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/homepage');
      cy.get('.img-avatar').click();
      cy.get('.dropdown-content .text-black').click();
      cy.get('.email').type('aa@aa.it');
      cy.get('.password').type('123456A!');
  
      cy.get('.buttonsgupin').contains('Accedi').click();
      cy.get('a.text-white[href="/richiesta-Enterprise"]').click();
    });
  
    // ludooooo, ricordati di cancellare dal db l'entry del preventivo
    // poi controlla anche se hai l'utente aa@aa.it nel caso non si loggasse
    it('TC-2.1-1', () => {
      cy.get('input[placeholder="min.5 max.20"]').type('150');
      cy.get('input[placeholder="min.11 max.50"]').type('20');
      cy.contains('Avanti').click();
  
      cy.contains('Personalizza la tua soluzione').should('exist');
    });
  
    it('TC-2.1-2', () => {
      cy.get('input[placeholder="min.5 max.20"]').type('10');
      cy.get('input[placeholder="min.11 max.50"]').type('100');
      cy.contains('Avanti').click();
  
      cy.contains('Personalizza la tua soluzione').should('exist');
    });
  
    it('TC-2.1-3', () => {
      cy.get('input[placeholder="min.5 max.20"]').type('10');
      cy.get('input[placeholder="min.11 max.50"]').type('45');
      cy.contains('Avanti').click();
  
      cy.get('h3').should('exist');
    });
  });