var TRAIT = {
  ABILITY: 'ability_score_increase',
  SKILL: 'skill',
  APPEARANCE: 'appearance',
  ALIGNMENT: 'alignment',
  SPEED: 'speed',
  CHOICE: 'choice',
  LANGUAGE: 'language',
  GROUPED: 'grouped'
};

var ABILITY = {
  STR: 'strength',
  DEX: 'dexterity',
  CON: 'constitution',
  INT: 'intelligence',
  WIS: 'wisdom',
  CHA: 'charisma'
}

var races = [
  'Dwarf',
  'Elf',
  'Halfling',
  'Human',
  'Dragonborn',
  'Gnome',
  'Half-Elf',
  'Half-Orc',
  'Tiefling'
];

var subraces = {
  'Dwarf': [
    'Hill Dwarf',
    'Mountain Dwarf'
  ],
  'Elf': [
    'High Elf',
    'Wood Elf',
    'Dark Elf/Drow'
  ],
  'Halfling': [
    'Lightfoot',
    'Stout'
  ],
  'Human': [
    'Calashite',
    'Chondathan',
    'Damaran',
    'Illuskan',
    'Mulan',
    'Rashemi',
    'Shou',
    'Tethyrian',
    'Turami'
  ],
  'Dragonborn': [
    'Black',
    'Blue',
    'Brass',
    'Bronze',
    'Copper',
    'Gold',
    'Green',
    'Red',
    'Silver',
    'White'
  ],
  'Gnome': [
    'Forest Gnome',
    'Rock Gnome'
  ],
  'Half-Elf': [],
  'Half-Orc': [],
  'Tiefling': []
};

function createTrait( type, name, value, per_level, proficient ) {
  var o = {
    type: type,
    name: name
  };

  if ( value !== undefined ) {
    if ( type == TRAIT.CHOICE ) {
      o.options = value;
    } else {
      o.value = value;
    }
  }
  if ( per_level !== undefined ) o.per_level = per_level;
  if ( proficient !== undefined ) o.proficient = proficient;

  return o;
};

function createFeature( name, value ) {
  return {
    name: name,
    value: value
  };
};

var race_traits = {
  'Dwarf': [
    createTrait( TRAIT.ABILITY, ABILITY.CON, 2 ),
    createTrait( TRAIT.APPEARANCE, 'age', 'Up to 350 years old' ),
    createTrait( TRAIT.ALIGNMENT, 'alignment', 'Lawful Good' ),
    createTrait( TRAIT.APPEARANCE, 'size', 'Medium' ),
    createTrait( TRAIT.APPEARANCE, 'height', '4 to 5 feet tall' ),
    createTrait( TRAIT.APPEARANCE, 'weight', 'About 150 pounds' ),
    createTrait( TRAIT.SPEED, 'speed', 25 ),
    createTrait( TRAIT.SKILL, 'battleaxe', undefined, undefined, true ),
    createTrait( TRAIT.SKILL, 'handaxe', undefined, undefined, true ),
    createTrait( TRAIT.SKILL, 'throwing hammer', undefined, undefined, true ),
    createTrait( TRAIT.SKILL, 'warhammer', undefined, undefined, true ),
    createTrait( TRAIT.CHOICE, 'tool proficiency', [
        createTrait( TRAIT.SKILL, 'smith\'s tools', undefined, undefined, true ),
        createTrait( TRAIT.SKILL, 'brewer\'s tools', undefined, undefined, true ),
        createTrait( TRAIT.SKILL, 'mason\'s tools', undefined, undefined, true )
      ]
    ),
    createTrait( TRAIT.LANGUAGE, 'common' ),
    createTrait( TRAIT.LANGUAGE, 'dwarvish' )
  ],
  'Elf': [
    createTrait( TRAIT.ABILITY, ABILITY.DEX, 2 ),
    createTrait( TRAIT.APPEARANCE, 'age', 'Up to 750 years old' ),
    createTrait( TRAIT.ALIGNMENT, 'alignment', 'Chaotic Good or Chaotic Evil if Dark Elf/Drow' ),
    createTrait( TRAIT.APPEARANCE, 'size', 'Medium' ),
    createTrait( TRAIT.APPEARANCE, 'height', 'Under 5 to over 6 feet tall' ),
    createTrait( TRAIT.APPEARANCE, 'weight', '100 to 145 pounds' ),
    createTrait( TRAIT.SPEED, 'speed', 30 ),
    createTrait( TRAIT.LANGUAGE, 'common' ),
    createTrait( TRAIT.LANGUAGE, 'elvish' )
  ],
  'Halfling': [
    createTrait( TRAIT.ABILITY, ABILITY.DEX, 2 ),
    createTrait( TRAIT.APPEARANCE, 'age', 'Up to 250 years old' ),
    createTrait( TRAIT.ALIGNMENT, 'alignment', 'Lawful Good' ),
    createTrait( TRAIT.APPEARANCE, 'size', 'Small' ),
    createTrait( TRAIT.APPEARANCE, 'height', 'About 3 feet tall' ),
    createTrait( TRAIT.APPEARANCE, 'weight', 'About 40 pounds' ),
    createTrait( TRAIT.SPEED, 'speed', 25 ),
    createTrait( TRAIT.LANGUAGE, 'common' ),
    createTrait( TRAIT.LANGUAGE, 'halfling' )
  ],
  'Human': [
    createTrait( TRAIT.ABILITY, ABILITY.STR, 1 ),
    createTrait( TRAIT.ABILITY, ABILITY.DEX, 1 ),
    createTrait( TRAIT.ABILITY, ABILITY.CON, 1 ),
    createTrait( TRAIT.ABILITY, ABILITY.INT, 1 ),
    createTrait( TRAIT.ABILITY, ABILITY.WIS, 1 ),
    createTrait( TRAIT.ABILITY, ABILITY.CHA, 1 ),
    createTrait( TRAIT.APPEARANCE, 'age', 'Less than 100 years old' ),
    createTrait( TRAIT.APPEARANCE, 'size', 'Medium' ),
    createTrait( TRAIT.APPEARANCE, 'height', 'About 5 to over 6 feet tall' ),
    createTrait( TRAIT.APPEARANCE, 'weight', '125 to 250 pounds' ),
    createTrait( TRAIT.SPEED, 'speed', 30 ),
    createTrait( TRAIT.LANGUAGE, 'common' ),
    createTrait( TRAIT.CHOICE, 'second language', [
        createTrait( TRAIT.LANGUAGE, 'dwarvish' ),
        createTrait( TRAIT.LANGUAGE, 'elvish' ),
        createTrait( TRAIT.LANGUAGE, 'giant' ),
        createTrait( TRAIT.LANGUAGE, 'gnomish' ),
        createTrait( TRAIT.LANGUAGE, 'goblin' ),
        createTrait( TRAIT.LANGUAGE, 'halfling' ),
        createTrait( TRAIT.LANGUAGE, 'orc' ),
        createTrait( TRAIT.LANGUAGE, 'abyssal' ),
        createTrait( TRAIT.LANGUAGE, 'celestial' ),
        createTrait( TRAIT.LANGUAGE, 'draconic' ),
        createTrait( TRAIT.LANGUAGE, 'deep speech' ),
        createTrait( TRAIT.LANGUAGE, 'infernal' ),
        createTrait( TRAIT.LANGUAGE, 'primordial' ),
        createTrait( TRAIT.LANGUAGE, 'sylvan' ),
        createTrait( TRAIT.LANGUAGE, 'undercommon' )
      ]
    )
  ],
  'Dragonborn': [
    createTrait( TRAIT.ABILITY, ABILITY.STR, 2 ),
    createTrait( TRAIT.ABILITY, ABILITY.CHA, 1 ),
    createTrait( TRAIT.APPEARANCE, 'age', 'Up to 80 years old' ),
    createTrait( TRAIT.ALIGNMENT, 'alignment', 'Neutral Good or Neutral Evil' ),
    createTrait( TRAIT.APPEARANCE, 'size', 'Medium' ),
    createTrait( TRAIT.APPEARANCE, 'height', 'Over 6 feet tall' ),
    createTrait( TRAIT.APPEARANCE, 'weight', 'About 250 pounds' ),
    createTrait( TRAIT.SPEED, 'speed', 30 ),
    createTrait( TRAIT.LANGUAGE, 'common' ),
    createTrait( TRAIT.LANGUAGE, 'draconic' )
  ],
  'Gnome': [
    createTrait( TRAIT.ABILITY, ABILITY.INT, 2 ),
    createTrait( TRAIT.APPEARANCE, 'age', 'Up to 500 years old' ),
    createTrait( TRAIT.ALIGNMENT, 'alignment', 'Lawful Good or Chaotic Good' ),
    createTrait( TRAIT.APPEARANCE, 'size', 'Small' ),
    createTrait( TRAIT.APPEARANCE, 'height', '3 to 4 feet tall' ),
    createTrait( TRAIT.APPEARANCE, 'weight', 'About 40 pounds' ),
    createTrait( TRAIT.SPEED, 'speed', 25 ),
    createTrait( TRAIT.LANGUAGE, 'common' ),
    createTrait( TRAIT.LANGUAGE, 'gnomish' )
  ],
  'Half-Elf': [
    createTrait( TRAIT.ABILITY, ABILITY.CHA, 2 ),
    createTrait( TRAIT.CHOICE, 'second ability increase', [
        createTrait( TRAIT.ABILITY, ABILITY.STR, 1 ),
        createTrait( TRAIT.ABILITY, ABILITY.DEX, 1 ),
        createTrait( TRAIT.ABILITY, ABILITY.CON, 1 ),
        createTrait( TRAIT.ABILITY, ABILITY.WIS, 1 ),
        createTrait( TRAIT.ABILITY, ABILITY.INT, 1 )
      ]
    ),
    createTrait( TRAIT.CHOICE, 'third ability increase', [
        createTrait( TRAIT.ABILITY, ABILITY.STR, 1 ),
        createTrait( TRAIT.ABILITY, ABILITY.DEX, 1 ),
        createTrait( TRAIT.ABILITY, ABILITY.CON, 1 ),
        createTrait( TRAIT.ABILITY, ABILITY.WIS, 1 ),
        createTrait( TRAIT.ABILITY, ABILITY.INT, 1 )
      ]
    ),
    createTrait( TRAIT.APPEARANCE, 'age', 'Up to 180 years' ),
    createTrait( TRAIT.ALIGNMENT, 'alignment', 'Chaotic Neutral' ),
    createTrait( TRAIT.APPEARANCE, 'size', 'Medium' ),
    createTrait( TRAIT.APPEARANCE, 'height', '5 to 6 feet tall' ),
    createTrait( TRAIT.APPEARANCE, 'weight', '125 to 250 pounds' ),
    createTrait( TRAIT.SPEED, 'speed', 30 ),
    createTrait( TRAIT.LANGUAGE, 'common' ),
    createTrait( TRAIT.LANGUAGE, 'elvish' ),
    createTrait( TRAIT.CHOICE, 'third language', [
        createTrait( TRAIT.LANGUAGE, 'dwarvish' ),
        createTrait( TRAIT.LANGUAGE, 'giant' ),
        createTrait( TRAIT.LANGUAGE, 'gnomish' ),
        createTrait( TRAIT.LANGUAGE, 'goblin' ),
        createTrait( TRAIT.LANGUAGE, 'halfling' ),
        createTrait( TRAIT.LANGUAGE, 'orc' ),
        createTrait( TRAIT.LANGUAGE, 'abyssal' ),
        createTrait( TRAIT.LANGUAGE, 'celestial' ),
        createTrait( TRAIT.LANGUAGE, 'draconic' ),
        createTrait( TRAIT.LANGUAGE, 'deep speech' ),
        createTrait( TRAIT.LANGUAGE, 'infernal' ),
        createTrait( TRAIT.LANGUAGE, 'primordial' ),
        createTrait( TRAIT.LANGUAGE, 'sylvan' ),
        createTrait( TRAIT.LANGUAGE, 'undercommon' )
      ]
    )
  ],
  'Half-Orc': [
    createTrait( TRAIT.ABILITY, ABILITY.STR, 2 ),
    createTrait( TRAIT.ABILITY, ABILITY.CON, 1 ),
    createTrait( TRAIT.APPEARANCE, 'age', 'Up to 75 years' ),
    createTrait( TRAIT.ALIGNMENT, 'alignment', 'Chaotic Good' ),
    createTrait( TRAIT.APPEARANCE, 'size', 'Medium' ),
    createTrait( TRAIT.APPEARANCE, 'height', '5 to over 6 feet tall' ),
    createTrait( TRAIT.APPEARANCE, 'weight', '125 to 250 pounds' ),
    createTrait( TRAIT.SPEED, 'speed', 30 ),
    createTrait( TRAIT.LANGUAGE, 'common' ),
    createTrait( TRAIT.LANGUAGE, 'orc' )
  ],
  'Tiefling': [
    createTrait( TRAIT.ABILITY, ABILITY.INT, 1 ),
    createTrait( TRAIT.ABILITY, ABILITY.CHA, 2 ),
    createTrait( TRAIT.APPEARANCE, 'age', 'Less than 100 years old' ),
    createTrait( TRAIT.ALIGNMENT, 'alignment', 'Chaotic Neutral or Chaotic Evil' ),
    createTrait( TRAIT.APPEARANCE, 'size', 'Medium' ),
    createTrait( TRAIT.APPEARANCE, 'height', 'About 5 to over 6 feet tall' ),
    createTrait( TRAIT.APPEARANCE, 'weight', '125 to 250 pounds' ),
    createTrait( TRAIT.SPEED, 'speed', 30 ),
    createTrait( TRAIT.LANGUAGE, 'common' ),
    createTrait( TRAIT.LANGUAGE, 'infernal' )
  ]
};

var race_features = {
  'Dwarf': [
    createFeature( 'Speed', 'Your speed is not reduced by wearing heavy armor.' ),
    createFeature( 'Darkvision', 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.' ),
    createFeature( 'Dwarven Resilience', 'You have advantage on saving throws against poison, and you have resistance against poison damage.' ),
    createFeature( 'Stonecunning', 'Wherever you make an Intelligence (History) check related to the origin of stonework, you are considered "proficient" in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.' )
  ],
  'Elf': [
    createFeature( 'Darkvision', 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.' ),
    createFeature( 'Keen Senses', 'You have proficiency in the Perception skill.' ),
    createFeature( 'Fey Ancestry', 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.' ),
    createFeature( 'Trance', 'Elves don\'t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is "trance.") While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.' )
  ],
  'Halfling': [
  createFeature( 'Lucky', 'When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.' ),
  createFeature( 'Brave', 'You have advantage on saving throws against being frightened.' ),
  createFeature( 'Halfling Nimbleness', 'You can move through the space of any creature that is of a size larger than yours.' )
  ],
  'Human': [],
  'Dragonborn': [
    createFeature( 'Breath Weapon', 'You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level. After you use your breath weapon, you can\'t use it again until you complete a short or long rest.' ),
    createFeature( 'Damage Resistance', 'You have resistance to the damage type associated with your draconic ancestry.' )
  ],
  'Gnome': [
    createFeature( 'Darkvision', 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.' ),
    createFeature( 'Gnome Cunning', 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.' )
  ],
  'Half-Elf': [
    createFeature( 'Darkvision', 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.' ),
    createFeature( 'Fey Ancestry', 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.' ),
    createFeature( 'Skill Versatility', 'You gain proficiency in two skills of your choice.' )
  ],
  'Half-Orc': [
    createFeature( 'Darkvision', 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.' ),
    createFeature( 'Menacing', 'You gain proficiency in the Intimidation skill.' ),
    createFeature( 'Relentless Endurance', 'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can\'t use this feature again until you finish a long rest.' ),
    createFeature( 'Savage Attacks', 'When you score a critical hit with a melee weapon attack, you can roll one of the weapons damage dice one additional time and add it to the extra damage of the critical hit.' )
  ],
  'Tiefling': [
    createFeature( 'Darkvision', 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.' ),
    createFeature( 'Hellish Resistance', 'You have resistance to fire damage.' ),
    createFeature( 'Infernal Legacy', 'You know the "thaumaturgy" cantrip. Once you reach 3rd level, you can cast the "hellish rebuke" spell once per day as a 2nd-level spell. ONce you reach 5th level, you can also cast the "darkness" spell once per day. Charisma is your spellcasting ability for these spells.' )
  ]
};

var subrace_traits = {
  'Hill Dwarf': [
    createTrait( TRAIT.ABILITY, ABILITY.WIS, 1 ),
    createTrait( TRAIT.ABILITY, 'hp', 1, true )
  ],
  'Mountain Dwarf': [
    createTrait( TRAIT.ABILITY, ABILITY.STR, 2 ),
    createTrait( TRAIT.SKILL, 'light armor', undefined, undefined, true ),
    createTrait( TRAIT.SKILL, 'medium armor', undefined, undefined, true )
  ],
  'High Elf': [
    createTrait( TRAIT.ABILITY, ABILITY.INT, 1 ),
    createTrait( TRAIT.SKILL, 'longsword', undefined, undefined, true ),
    createTrait( TRAIT.SKILL, 'shortsword', undefined, undefined, true ),
    createTrait( TRAIT.SKILL, 'shortbow', undefined, undefined, true ),
    createTrait( TRAIT.SKILL, 'longbow', undefined, undefined, true ),
    createTrait( TRAIT.CHOICE, 'extra language', [
        createTrait( TRAIT.LANGUAGE, 'dwarvish' ),
        createTrait( TRAIT.LANGUAGE, 'giant' ),
        createTrait( TRAIT.LANGUAGE, 'gnomish' ),
        createTrait( TRAIT.LANGUAGE, 'goblin' ),
        createTrait( TRAIT.LANGUAGE, 'halfling' ),
        createTrait( TRAIT.LANGUAGE, 'orc' ),
        createTrait( TRAIT.LANGUAGE, 'abyssal' ),
        createTrait( TRAIT.LANGUAGE, 'celestial' ),
        createTrait( TRAIT.LANGUAGE, 'draconic' ),
        createTrait( TRAIT.LANGUAGE, 'deep speech' ),
        createTrait( TRAIT.LANGUAGE, 'infernal' ),
        createTrait( TRAIT.LANGUAGE, 'primordial' ),
        createTrait( TRAIT.LANGUAGE, 'sylvan' ),
        createTrait( TRAIT.LANGUAGE, 'undercommon' )
      ]
    )
  ],
  'Wood Elf': [
    createTrait( TRAIT.ABILITY, ABILITY.WIS, 1 ),
    createTrait( TRAIT.SKILL, 'longsword', undefined, undefined, true ),
    createTrait( TRAIT.SKILL, 'shortsword', undefined, undefined, true ),
    createTrait( TRAIT.SKILL, 'shortbow', undefined, undefined, true ),
    createTrait( TRAIT.SKILL, 'longbow', undefined, undefined, true ),
    createTrait( TRAIT.SPEED, 'speed', 35 )
  ],
  'Dark Elf/Drow': [
    createTrait( TRAIT.ABILITY, ABILITY.CHA, 1 ),
    createTrait( TRAIT.SKILL, 'rapier', undefined, undefined, true ),
    createTrait( TRAIT.SKILL, 'shortsword', undefined, undefined, true ),
    createTrait( TRAIT.SKILL, 'hand crossbow', undefined, undefined, true )
  ],
  'Lightfoot': [
    createTrait( TRAIT.ABILITY, ABILITY.CHA, 1 )
  ],
  'Stout': [
    createTrait( TRAIT.ABILITY, ABILITY.CON, 1 )
  ],
  'Calashite': [],
  'Chondathan': [],
  'Damaran': [],
  'Illuskan': [],
  'Mulan': [],
  'Rashemi': [],
  'Shou': [],
  'Tethyrian': [],
  'Turami': [],
  'Black': [],
  'Blue': [],
  'Brass': [],
  'Bronze': [],
  'Copper': [],
  'Gold': [],
  'Green': [],
  'Red': [],
  'Silver': [],
  'White': [],
  'Forest Gnome': [
    createTrait( TRAIT.ABILITY, ABILITY.DEX, 1 )
  ],
  'Rock Gnome': [
    createTrait( TRAIT.ABILITY, ABILITY.CON, 1 )
  ]
}

var subrace_features = {
  'Hill Dwarf': [
    createFeature( 'Dwarven Toughness', 'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.' )
  ],
  'Mountain Dwarf': [],
  'High Elf': [
    createFeature( 'Cantrip', 'You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it.' )
  ],
  'Wood Elf': [
    createFeature( 'Mask of the Wild', 'You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.' )
  ],
  'Dark Elf/Drow': [
    createFeature( 'Darkvision', 'You can see in dim light within 120 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.' ),
    createFeature( 'Sunlight Sensitivity', 'You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in the direct sunlight.' ),
    createFeature( 'Drow Magic', 'You know the "dancing lights" cantrip. When you reach 3rd level, you can cast the "faerie fire" spell once per day. When you reach 5th level, you can also cast the "darkness" spell once per day. Charisma is your spellcasting ability for these spells.' )
  ],
  'Lightfoot': [
    createFeature( 'Naturally Stealthy', 'You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.' )
  ],
  'Stout': [
    createFeature( 'Stout Resilience', 'You have advantage on saving throws against poison, and you have resistance against poison damage.' )
  ],
  'Calashite': [],
  'Chondathan': [],
  'Damaran': [],
  'Illuskan': [],
  'Mulan': [],
  'Rashemi': [],
  'Shou': [],
  'Tethyrian': [],
  'Turami': [],
  'Black': [
    createFeature( 'Your Draconic Ancestry Breath Weapon', '5 by 30 ft. line (Dex. save)' ),
    createFeature( 'Your Draconic Ancestry Damage Resistance', 'Acid' )
  ],
  'Blue': [
    createFeature( 'Your Draconic Ancestry Breath Weapon', '5 by 30 ft. line (Dex. save)' ),
    createFeature( 'Your Draconic Ancestry Damage Resistance', 'Lightning' )
  ],
  'Brass': [
    createFeature( 'Your Draconic Ancestry Breath Weapon', '5 by 30 ft. line (Dex. save)' ),
    createFeature( 'Your Draconic Ancestry Damage Resistance', 'Fire' )
  ],
  'Bronze': [
    createFeature( 'Your Draconic Ancestry Breath Weapon', '5 by 30 ft. line (Dex. save)' ),
    createFeature( 'Your Draconic Ancestry Damage Resistance', 'Lightning' )
  ],
  'Copper': [
    createFeature( 'Your Draconic Ancestry Breath Weapon', '5 by 30 ft. line (Dex. save)' ),
    createFeature( 'Your Draconic Ancestry Damage Resistance', 'Acid' )
  ],
  'Gold': [
    createFeature( 'Your Draconic Ancestry Breath Weapon', '15 ft. cone (Dex. save)' ),
    createFeature( 'Your Draconic Ancestry Damage Resistance', 'Fire' )
  ],
  'Green': [
    createFeature( 'Your Draconic Ancestry Breath Weapon', '15 ft. cone (Con. save)' ),
    createFeature( 'Your Draconic Ancestry Damage Resistance', 'Poison' )
  ],
  'Red': [
    createFeature( 'Your Draconic Ancestry Breath Weapon', '15 ft. cone (Dex. save)' ),
    createFeature( 'Your Draconic Ancestry Damage Resistance', 'Fire' )
  ],
  'Silver': [
    createFeature( 'Your Draconic Ancestry Breath Weapon', '15 ft. cone (Con. save)' ),
    createFeature( 'Your Draconic Ancestry Damage Resistance', 'Cold' )
  ],
  'White': [
    createFeature( 'Your Draconic Ancestry Breath Weapon', '15 ft. cone (Con. save)' ),
    createFeature( 'Your Draconic Ancestry Damage Resistance', 'Cold' )
  ],
  'Forest Gnome': [
    createFeature( 'Natural Illusionist', 'You know the "minor illusion" cantrip. Intelligence is your spellcasting ability for it.' ),
    createFeature( 'Speak with Small Beasts', 'Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts. Forest gnomes love animals and often keep squirrels, badgers, rabbits, moles, woodpeckers, and other creatures as beloved pets.' )
  ],
  'Rock Gnome': [
    createFeature( 'Artificer\'s Lore', 'Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.' ),
    createFeature( 'Tinker', 'You have proficiency with artisan\'s tools (tinker\'s tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device functioning), or when you use your action to dismantle it; at that time, you can reclaim the materials used to create it. You can have up to three such devices active at a time. When you create a device, choose one of the following options: "Clockwork Toy" - This toy is a clockwork animal, monster, or person, such as a frog, mouse, bird, dragon, or soldier. When placed on the ground, the toy moves 5 feet across the ground on each of your turns in a random direction. It makes noises as appropriate to the creature it represents. "Fire Starter" - The device produces a miniature flame, which you can use to light a candle, torch, or campfire. Using the device requires your action. "Music Box" - When opened, this music box plays a single song at a moderate volume. The box stops playing when it reaches the song\'s end or when it is closed.' )
  ]
}

function createDoc() {
  var doc = {
    title: 'Choose a Race',
    races: races.map( createRace )
  };

  return JSON.stringify( doc );
};

function createRace( name ) {
  var race = {
    name: name,
    subraces: subraces[name].map( createSubrace ),
    traits: race_traits[name],
    features: race_features[name]
  };

  return race;
};

function createSubrace( name ) {
  var subrace = {
    name: name,
    traits: subrace_traits[name],
    features: subrace_features[name]
  };

  return subrace;
};

console.log( createDoc() );
