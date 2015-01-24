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

  Scenario: A User should never receive duplicate features
    Given I am on "/choose-race"
    And I have selected "Dark Elf/Drow"
    Then I should have the following features: '[{"name": "Keen Senses","value": "You have proficiency in the Perception skill."},{"name": "Fey Ancestry","value": "You have advantage on saving throws against being charmed, and magic can't put you to sleep."},{"name": "Trance","value": "Elves don't need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is \"trance.\") While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep."},{"name": "Darkvision","value": "You can see in dim light within 120 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray."},{"name": "Sunlight Sensitivity","value": "You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in the direct sunlight."},{"name": "Drow Magic","value": "You know the \"dancing lights\" cantrip. When you reach 3rd level, you can cast the \"faerie fire\" spell once per day. When you reach 5th level, you can also cast the \"darkness\" spell once per day. Charisma is your spellcasting ability for these spells."}]'
