import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit the website {string}", (url: string) => {
  cy.visit(url);
});

When("When I click book", () => {
    cy.wait(500);
    cy.get('button:contains("Book")').click();
});

// Then("I should be redirected to the dashboard page", () => {
//   cy.url().should("include", "/dashboard");
// });

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
});