export class NavigateTo {
  loginPage() {
    cy.visit(Cypress.env('login')); // Cypress.env takes parameters of defining the parameters
  }
}
export const navigateTo = new NavigateTo();
