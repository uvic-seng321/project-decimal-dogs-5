# BDD Report

We made use of Cucumber and Cypress with the help of the Badeball Cypress-Cucumber Preprocessor, which can be found at the Badeball [Github](https://github.com/badeball/cypress-cucumber-preprocessor). This preprocessing application allows the two platforms to be combined and allows for full use of Cucumber functionality in Cypress. In particular the "Given, When, And, and Then" keywords which can be seen below in our feature files.

## Register
```
Feature: Registering a new user on a website

  Scenario: Registering with a valid email and password
    Given I visit the website "http://localhost:3000" and select register
    When I enter my full name "test td2", email "testuser2@example.com", and password "password1234"
    And I submit the registration form
    Then I should be taken to the homepage
```

These generic steps allowed us to test user registration with a given name, email, and password./

Our steps can be defined as follows:
```
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
  ```

## Login

```
Feature: Logging in to a website and accessing the dashboard

  Scenario: Logging in to the website and accessing the dashboard
    Given I visit the website "http://localhost:3000/login"
    When I log in with the email "arufa@test.com" and password "test12345"
    Then I should be redirected to the homepage
```

```
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
```


## Booking



