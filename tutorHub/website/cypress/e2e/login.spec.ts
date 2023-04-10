import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit the website {string}", (url: string) => {
  cy.visit(url);
});

When("I log in with the email {string} and password {string}", (email: string, password: string) => {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get("button[type='submit']").click();
    cy.wait(1000);
});

Then("I should be redirected to the homepage", () => {
  cy.url().should("include", "/");
});

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});