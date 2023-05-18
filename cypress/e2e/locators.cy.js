/// <reference types="cypress" />

describe('Fing or get Elements by using different locators',()=>{
   
    beforeEach(()=>{
        //runs before each test case, beforeMethod in TestNG
        cy.clearCookies();
        cy.visit('/login');
    })
    
    it('Check different locatators strategies',()=>{
        // by css locator
        cy.get("input[name='username']").type("CydeoStudent");
        cy.get("[type='text']").clear();//clear what is typed
        cy.get('input').each((item,index,list)=>{
        expect(list).to.have.length(2);
        expect(item).has.attr("type");
        })
    })
   
})