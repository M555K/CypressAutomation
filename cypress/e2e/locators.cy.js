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

        // tagName
        cy.get("[type='text']").clear();//clear what is typed
        cy.get('input').each((item,index,list)=>{
        expect(list).to.have.length(2);
        expect(item).has.attr("type");
        })

        // attribute name
        cy.get('[type]');
        // class attribute value or className
        cy.get('.btn.btn-primary');

        // by id
        cy.get('#wooden_spoon');
        // if I want to use text: no xpath  in cypress, but it still posisble
        cy.get('button').should('contain', 'Login').click();

    })
    it('Check finding elements by traveling through the DOM',()=>{
        // travel to find the login button : 1-locate username box ; 2- go to parent form; 3- find the button
        cy.get('input[name="username"]').parents('form').find('button').should('contain','Login').click();

    })
    it.only('Check different type of assertions',()=>{
        // cypress bundless(uses) assertions provided by Chai. Sinon and jQuery libraries
        //Should assertion
        cy.get('#wooden_spoon').should('contain','Login')
        .and('have.class','btn btn-primary');
        //different approach: creates a subject of our test, then we can implement different actions
        cy.get('#wooden_spoon').then((buttonElement)=>{
            expect(buttonElement).to.have.text('Login');
            expect(buttonElement).to.have.class('btn btn-primary');
        })

    })
   
})