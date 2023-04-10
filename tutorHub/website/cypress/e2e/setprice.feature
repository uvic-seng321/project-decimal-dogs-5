Feature: As a tutor I want to be able to offer my services at a specific price

Scenario: When signed in as a tutor I want to be able to offer my services at a specific price
    Given I am logged in as a tutor with the email "afaru@test.com" and password "password12345"
    When I navigate to the tutor page
    Then I should see my profile on the list of tutors with my specified price