/// <reference types="cypress" />

describe('Input Form Tests', () => {
    /**
     * Step 1
     * to uploadfile in Cypress we need to install plugin 
     * we will run following command:
     * npm install -dev cypress-file-upload
     * Step 2
     * we need to import necessary command to our project
     * in support folder we have commands.js file : good place for utility methods (functions)
     * add following line
     * import 'cypress-file-upload';
     * Step 3
     * file that you want to upload should be in your fixture folder
     */
    beforeEach('Navigate to upload page', () => {
      cy.clearCookies(); // cypress do it automatically, we can avoid it
      cy.visit('/upload');
    
    });
  
    it('Check upload action', () => {
     cy.get('input#file-upload').attachFile()
    });
})