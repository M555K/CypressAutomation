/// <reference types="cypress" />

describe('Input Form Tests', () => {
  beforeEach('Navigate to registration page', () => {
    // runs before each test case, beforeMethod in TestNG
    cy.clearCookies(); // cypress do it automatically, we can avoid it
    cy.visit('/registration_form');
  });

  it('Check Different Input Box fields and verify', () => {
    cy.get('input[name="firstname"]').type('Mike');
    cy.get('input[name="lastname"]').type('Braun');
    cy.get('input[name="username"]').type('believer');
    const email = `formtest${Math.floor(100000 + Math.random() * 900000)}@cydeo.com`;
    /**
     * Math.random() creates a number between 0 and 1 as ex 0.000234
     * Math.floor == makes it a whole number
     */

    cy.get('input[name="email"]').type(email);
    const password = `test${Math.floor(100000 + Math.random() * 900000)}`;
    cy.get('input[name="password"]').type(password);
    const phoneNumber = `555-000-${Math.floor(1000 + Math.random() * 9000)}`; // creates 4 digits extension
    cy.get('input[name="phone"]').type(phoneNumber);
    cy.get('input[name="birthday"]').type('01/05/1995');
  });
  it('Check different radio buttons actions', () => {
    /**
     * radio is Jquery element , cy.wrap(radio) turns it to the cypress object so that i can use cypres functions
     * first() select first element
     */
    cy.get('.radio')
      .find('[type=radio]')
      .then((radio) => {
        cy.wrap(radio).first().check().should('be.checked');
        // select the second radio buttons and verify it is checked and confirmation lable is visible
        cy.wrap(radio).eq(1).check().should('be.checked');
        cy.get('[data-bv-icon-for="gender"]').should('be.visible');
        cy.wrap(radio).eq(2).should('not.be.checked');
      });
  });
  it('Check different checkbox actions', () => {
    cy.get('[type="checkbox"]').then((checkbox) => {
      cy.wrap(checkbox).eq(1).check().should('be.checked');
      // unchecked java
      cy.wrap(checkbox).eq(1).uncheck().should('not.be.checked');
      cy.wrap(checkbox).eq(2).should('have.value', 'javascript').check().should('be.checked');
    });
  });
  it('Check selection of a single choice from a select dropdown ', () => {
    // select one element
    cy.get('select[name="job_title"]').select('SDET');
    // assert that dropdown has corerect text after selecting
    cy.get('select[name="job_title"]').contains('SDET');
  });
  it('Check selection of all select dropdowns options', () => {
    // we will provide our test data through fixtures folder as JSON object , then use data to verify select values
    // cy.fixture() look for json object
    cy.fixture('departments').then((departments) => {
      // get all options in the menu, iterate through these optionns
      cy.get('select[name="department"] > option').each((option, index) => {
        // get each option text
        const optionText = option.text();
        // cy.log(optionText);
        // cy.log(index);
        // cy.log(departments[index]);
        cy.get('select[name="department"]')
          .select(optionText)
          .should('have.value', option.val())
          // .should('have.text',departments[index])
          .contains(departments[index]);
      });
    });
  });
});
