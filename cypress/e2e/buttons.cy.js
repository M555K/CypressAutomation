/// <reference types="cypress" />

describe('Fing or get Elements by using different locators',()=>{
   
    beforeEach(()=>{
        //runs before each test case, beforeMethod in TestNG
        cy.clearCookies();
        cy.visit('/multiple_buttons');
    })
    
    it('Check Different Button Actions',()=>{
        // select a button with text
        cy.contains('Button 2').should('be.visible').click();
        cy.contains('Clicked on button two!').should('be.visible');
        
    })
    })
