import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I am logged in as a tutor with the email {string} and password {string}", (email: string, password: string) => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get("button[type='submit']").click();
    cy.wait(2000);
    cy.visit("http://localhost:3000/tutors");
    });
When("I navigate to the tutors page", () => {
    cy.visit("http://localhost:3000/tutors");
    });

Then("I should see my profile on the list of tutors with my specified price {string}", (price: string) => {
    cy.get