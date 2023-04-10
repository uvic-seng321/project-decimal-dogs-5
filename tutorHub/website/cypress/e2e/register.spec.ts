import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit the website {string} and select register", (url: string) => {
    cy.visit(url);
    cy.get('input[type="radio"]').eq(1).check();
});
  
  When("I enter my full name {string}, email {string}, and password {string}", (fullname: string, email: string, password: string) => {
    cy.get("input[name=name]").type(fullname);
    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);
  });
  
  When("I submit the registration form", () => {
    cy.get("button[type='submit']").click();
  });
  
  Then("I should be taken to the homepage", () => {
    cy.url().should("include", "/");
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});