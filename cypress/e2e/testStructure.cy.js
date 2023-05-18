/// <reference types="cypress" />

describe('Context: My First Test',()=>{
    before(()=>{
        // like beforeClass in TestNG
    })
    beforeEach(()=>{
        //runs before each test case, beforeMethod in TestNG
        cy.clearCookies();
    })
    after(()=>{
        //afterClass
    })
    afterEach(()=>{
        //afrterMethod in TestNG
    })
    it('Opening a web application',()=>{
        cy.visit('checkboxes');
        
    })

})