Feature: Verify if a given text is present on the webpage

Scenario: Check if the given text is present on the webpage
  Given I am on the website "http://localhost:3000"
  Then I should see the text "Welcome to our website"