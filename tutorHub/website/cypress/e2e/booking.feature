Feature: Creating a booking with a tutor

  Scenario: Selecting a tutor to book with
    Given I log in with "arufa@test.com" and "test12345"
    When I visit the website "http://localhost:3000/tutors?subject=MATH&price=40&year=1"
    When I click Book Tutor
    Then I should be redirected to the tutors booking page

  Scenario: Creating a booking with a tutor
    Given I visit the website "http://localhost:3000/tutor/1"
    When I click book
