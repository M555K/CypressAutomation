/// <reference types="cypress" />

describe('Alerts in Cypress Test Environment', { baseUrl: 'https://demoqa.com' }, () => {
  beforeEach('Navigate to upload page', () => {
    cy.clearCookies(); // cypress do it automatically, we can avoid it
    cy.visit('/alerts');
  });

  it('Check alert confirmation', () => {
    /**
     * Browser commands such as : window:alert, window:confirm, window:on
     */
    // we need this command to see the alert
    const stub = cy.stub();
    cy.on('window:confirm', stub); // when this commant initiated store and give the control to stub function

    cy.get('#confirmButton')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
      });
    cy.on('window:confirm', () => true); // confirm the alert
    cy.contains('You selected Ok').should('be.visible');
  });
  it('Check alert cancelation', () => {
    /**
     * Browser commands such as : window:alert, window:confirm, window:on
     */
    // we need this command to see the alert
    const stub = cy.stub();
    cy.on('window:confirm', stub); // when this commant initiated store and give the control to stub function

    cy.get('#confirmButton')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
      });
    cy.on('window:confirm', () => false); // cancel the alert confirmation
    cy.contains('You selected Cancel').should('be.visible');
  });
});
