/// <reference types="cypress" />

describe('Input Form Tests', () => {
    beforeEach('Navigate to registration page',() => {
      // runs before each test case, beforeMethod in TestNG
      cy.clearCookies();//cypress do it automatically, we can avoid it
      cy.get('/registration_form');
    });
  
    it('Check Different Input Box fields and verify', () => {
        
        });
      
  });
  