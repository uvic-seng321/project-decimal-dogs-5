import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the website {string}', (url) => {
    cy.visit(url)
  })
  
  Then('I should see the text {string}', (text) => {
    cy.contains(text).should('exist')
  })

