Feature: Registering a new user on a website

  Scenario: Registering with a valid email and password
    Given I visit the website "http://localhost:3000" and select register
    When I enter my full name "test td2", email "testuser2@example.com", and password "password1234"
    And I submit the registration form
    Then I should be taken to the homepage