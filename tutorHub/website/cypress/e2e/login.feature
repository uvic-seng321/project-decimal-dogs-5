Feature: Logging in to a website and accessing the dashboard

  Scenario: Logging in to the website and accessing the dashboard
    Given I visit the website "http://localhost:3000/login"
    When I log in with the email "arufa@test.com" and password "test12345"
    Then I should be redirected to the dashboard page