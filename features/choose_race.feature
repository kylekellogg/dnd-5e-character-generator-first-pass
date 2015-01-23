Feature: Choose Race
  As a User of dnd-5e-character-generator
  I want to choose the race for my generated character
  So that I can specify what character I'd like to play

  Scenario: A User is presented with Race options
    Given I am on "/choose-race"
    Then the title should be "Choose a Race"

  Scenario: A User selects a Race to learn more
    Given I am on "/choose-race"
    And I have selected "Hill Dwarf"
    Then I should have the following features: '[{"name":"Dwarven Toughness","value":"Your hit point maximum increases by 1, and it increases by 1 every time you gain a level."},{"name":"Speed","value":"Your speed is not reduced by wearing heavy armor."},{"name":"Darkvision","value":"You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray."},{"name":"Dwarven Resilience","value":"You have advantage on saving throws against poison, and you have resistance against poison damage."},{"name":"Stonecunning","value":"Wherever you make an Intelligence (History) check related to the origin of stonework, you are considered \"proficient\" in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus."}]'
