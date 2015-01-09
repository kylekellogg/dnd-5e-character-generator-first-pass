Feature: Choose Race
  As a User of dnd-5e-character-generator
  I want to choose the race for my generated character
  So that I can specify what character I'd like to play

  Scenario: A User is presented with Race options
    Given I am on "/choose-race"
    When the page has loaded
    Then the title should be "Choose a Race"

  Scenario: A User selects a Race to learn more
    Given I am on "/choose-race"
    When the page has loaded
    And I have clicked "label" with text "Hill Dwarf"
    Then I should see "Dwarven Toughness" in "#features"
