import { auth } from '../../support/pages/auth'; // .. means that it coming from parent to child
import { navigateTo } from '../../support/pages/navigation';

const LoginLocators = require('../../support/pages/auth');

describe('Auth: Login user with different ways', () => {
  // navigation to the test page
  beforeEach('navigate to login page', () => {
    cy.clearAllCookies();
    navigateTo.loginPage(); // this function we called from POM
  });
  it.skip('Happy Path scenario using POM function', () => {
    cy.fixture('user').then((user) => {
      auth.login(user.user2.username, user.user2.password);
    });

    // let's call our custom command to verify the text
    cy.textExist('You logged into a secure area!');
    auth.logout();
  });

  it.skip('Happy Path scenario using POM locators', () => {
    cy.fixture('user').then((user) => {
      // we need to import locators obj to use web element
      LoginLocators.locators.userName.type(user.user2.username);
      LoginLocators.locators.password.type(user.user2.password);
      LoginLocators.locators.submit.click();
    });

    // let's call our custom command to verify the text
    cy.textExist('You logged into a secure area!');
    auth.logout();
  });
  it('Check invalid user credentials', () => {
    auth.login('invalid123', 'invalid123');
    cy.textExist('Your username is invalid!');
  });
});
