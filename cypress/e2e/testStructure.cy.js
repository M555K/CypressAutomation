/// <reference types="cypress" />

describe('Context: My First Test', () => {
  before(() => {
    // like beforeClass in TestNG
  });
  beforeEach(() => {
    // runs before each test case, beforeMethod in TestNG
    cy.clearCookies();
  });
  after(() => {
    // afterClass
  });
  afterEach(() => {
    // afrterMethod in TestNG
  });
  it('Opening a web application', () => {
    cy.visit('checkboxes');
  });
  it('Test 2 ', () => {
    expect(false).equal(false); // as verify
  });
  it('Test 3', () => {
    expect(false).not.to.equal(true);
  });
  it('Test 4', () => {
    expect(5).to.equal(5);
  });
  it('Test 5', () => {
    // or it.only
    expect(true).to.equal('5' == 5);
  });
});
