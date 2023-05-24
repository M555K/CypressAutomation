/// <reference types="cypress" />

describe('Fing or get Elements by using different locators', () => {
  beforeEach(() => {
    // runs before each test case, beforeMethod in TestNG
    cy.clearCookies();
    cy.visit('/multiple_buttons');
  });

  it('Check Different Button Actions', () => {
    // select a button with text
    cy.contains('Button 2').should('be.visible').click();
    cy.contains('Clicked on button two!').should('be.visible');
    // find element with class attribute and create a list then select third element from the list
    cy.get('.btn.btn-primary').then(($buttons) => {
      cy.wrap($buttons).eq(2).click();
      cy.contains('Clicked on button three!').should('be.visible');
      cy.get('button').each((item, index, list) => {
        expect(list).to.have.length(6);
        expect(item).to.have.attr('onclick');
      });
      // approach before not accurate
      cy.get('button').each((item) => {
        if (item.text() === 'Button 4') {
          cy.log(item.text()); // this command write the text at the test console
          cy.wrap(item).click();
          cy.contains('Clicked on button four!').should('be.visible');
        }
      });
    });
  });
});
