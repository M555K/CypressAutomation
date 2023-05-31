/// <reference types="cypress" />

describe('Cypress WebTable Tests', { baseUrl: 'https://demoqa.com' }, () => {
  /**
   * if you need t navigate to another url you can define in the describe block or in the it block if it is one test case
   */

  beforeEach('Navigate to upload page', () => {
    cy.clearCookies(); // cypress do it automatically, we can avoid it
    cy.visit('/webtables');
  });

  it('Check finding and editing a record', () => {
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
  it('Search for different age group', () => {
    // define age groups
    const ageGroup = [29, 39, 45, 77];
    // for each age of group perform same test scenario
    cy.wrap(ageGroup).each((age) => {
      cy.get('#searchBox').clear().type(age);
      // negative scenario
      if (age === 77) {
        cy.get('.rt-tbody').find('.rt-tr-group').first().should('not.contain', age);
        cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
      } else {
        // positive scenario
        // verify if that age exist, second number of records
        cy.get('.rt-tbody').find('.rt-tr-group').first().should('contain', age);
        cy.get('.rt-tbody').contains('.rt-tr-group', age).should('have.length', 1);
      }
    });
  });
  it('Check adding a new record - Bad code practice', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type('Harvey');
    cy.get('#lastName').type('Specter');
    cy.get('#userEmail').type('specter@example.com');
    cy.get('#age').type('36');
    cy.get('#salary').type('234000');
    cy.get('#department').type('legal');
    cy.get('#submit').click();
    // assert that new record is added

    cy.get('.rt-tbody') // get my table body
      .contains('.rt-tr-group', 'Harvey')
      .then((row) => {
        cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Harvey');
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Specter');
        cy.wrap(row).find('.rt-td').eq(2).should('contain', '36');
        cy.wrap(row).find('.rt-td').eq(3).should('contain', 'specter@example.com');
        cy.wrap(row).find('.rt-td').eq(4).should('contain', '234000');
        cy.wrap(row).find('.rt-td').eq(5).should('contain', 'legal');
      });
  });
  it('Adding a new record - Better practice', () => {
    // click on add button
    cy.get('#addNewRecordButton').click();
    cy.fixture('user').then((user) => {
      const columnNames = Object.keys(user.user1); // goes to fixture folder and gets user1 object and stores into columNames Array
      const userData = Object.values(user.user1);
      cy.wrap(columnNames).each((columnName, index) => {
        // cy.log(columName);
        // cy.log(userData[index]);
        cy.get(`#${columnName}`).type(`${userData[index]}`);
      });
      cy.get('#submit').click();
      // assert that new recird is added
      cy.get('.rt-tbody')
        .contains('.rt-tr-group', userData[0])
        .then((row) => {
          cy.wrap(userData).each((value, index) => {
            cy.wrap(row).find('.rt-td').eq(index).should('contain', value);
          });
        });
    });
  });
});
