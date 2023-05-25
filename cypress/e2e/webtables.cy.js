/// <reference types="cypress" />

describe('Cypress WebTable Tests', { baseUrl: 'https://demoqa.com' }, () => {
  /**
   * if you need t navigate to another url you can define in the describe block or in the it block if it is one test case
   */

  beforeEach('Navigate to upload page', () => {
    cy.clearCookies(); // cypress do it automatically, we can avoid it
    cy.visit('/webtables');
  });

  it.skip('Check finding and editing a record', () => {
    // locate table boy - then navigate through this element to find Adlen, then update info with another person
    cy.get('.rt-tbody') // get my table body
      .contains('.rt-tr-group', 'Alden') // get me specific row, in our case row that contains Alden
      .then((row) => {
        // click on edit button for Alden record
        // cy.wrap(row).find('[title="Edit"]').click();
        cy.wrap(row).find('[id="edit-record-2"]').click();
        cy.get('#firstName').clear().type('Harvey');
        cy.get('#lastName').clear().type('Specter');
        cy.get('#submit').click();
        // from cypress test perspective we are still inside row element: need to do assertion
        cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Harvey');
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Specter');
      });
  });

  it('Check finding and deleting a record', () => {
    cy.get('.rt-tbody')
      .contains('.rt-tr-group', 'Alden')
      .then((row) => {
        cy.wrap(row).find('[title="Delete"]').click();
      });
    cy.get('.rt-tbody').should('not.contain', 'Alden');
    cy.get('#searchBox').type('Alden');
    // assert that there ois no record of Alden
    cy.get('.rt-tbody').should('not.contain', 'Alden');
    // no data found eleent is visible or not
    cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
  });
});
