Feature: Choose Race
  As a User of dnd-5e-character-generator
  I want to choose the race for my generated character
  So that I can specify what character I'd like to play

  Scenario: A User is presented with Race options
    Given I am on the homepage
    When the page has loaded
    Then I should see "Choose a Race"
