Feature: Choose Class
  As a User of dnd-5e-character-generator
  I want to choose the class for my generated character
  So that I can specify what character I'd like to play

  Scenario: A User is presented with Class options
    Given I am on the homepage
    When I have selected my race
    Then I should see "Choose a Class"
