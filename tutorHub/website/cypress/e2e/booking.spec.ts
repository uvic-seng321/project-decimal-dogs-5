import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit the website {string}", (url: string) => {
  cy.visit(url);
});

Given("I log in with {string} and {string}", (email: string, password: string) => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get("button[type='submit']").click();
    cy.wait(2000);
    cy.visit("http://localhost:3000/tutors?subject=MATH&price=40&year=1");
});

When("I visit the booking page", () => {
    cy.url().should("include", "/tutors?subject=MATH&price=40&year=1");
  });

When("I click Book Tutor", () => {
    cy.get('a[href="/tutor/1"]').contains('Book Tutor').click();
});

Then("I should be redirected to the tutors booking page", () => {
  cy.url().should("include", "/tutor/1");
});


When("I click book", () => {
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