describe('How to do API tests with cypress', () => {
  xit('Simple GET request, check status headers and body', () => {
    // docs.cypress.io/api/commands/request
    cy.request({
      // this function takes a json object as a parameters andn inside the object we define core parts of HTTP request
      method: 'GET',
      url: `${Cypress.env('apiUrl')}${Cypress.env('apiBooks')}`,
      // other then methos and url the rest of option depends on your test case
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(200);
      cy.log(response);
      cy.log(response.body.books[0].isbn);
      expect(response.body.books[1].title).to.equal('Learning JavaScript Design Patterns');
      expect(response.headers.connection).to.equal('keep-alive');
      const {books} = response.body.books;
      // loop for verification title

      cy.fixture('bookTitles').then((expectedBookTitle) => {
        for (let i = 0; i < 8; i++) {
          expect(response.body.books[i].title).to.equal(expectedBookTitle[i]);
          console.log(expectedBookTitle[i]);
        }
      });
    });
  });
});
