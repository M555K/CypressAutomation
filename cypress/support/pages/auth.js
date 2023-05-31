class Auth {
  // clsss name doen not has to be the same as a file name
  // you can put more than one class in a file, and none of them have any superiority over each other
  login(user_name, password) {
    cy.get('[name="username"]').type(user_name);
    cy.get('[name="password"]').type(password);
    cy.get('#wooden_spoon').click();
  }

  logout() {
    cy.contains('Logout').should('be.visible').click();
  }
}
const auth = new Auth(); // object of the class we've made

class Locators {
  // we can use findBy annotation of Selenium with Cypress
  get userName() {
    // it is the webelement variable name
    return cy.get('[name="username"]', { timeout: 10000 }); // defining custom timeout for the specific web element
  }

  get password() {
    return cy.get('[name="password"]', { timeout: 10000 }); // it is like implicitly wait, when it finds time stop,
  }

  get submit() {
    return cy.get('#wooden_spoon');
  }
}
const locators = new Locators();

module.exports = {
  auth,
  locators,
};
