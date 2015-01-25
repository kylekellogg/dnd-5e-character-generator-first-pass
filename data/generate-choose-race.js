var TRAIT = {
  ABILITY: 'ability_score_increase',
  SKILL: 'skill',
  APPEARANCE: 'appearance',
  ALIGNMENT: 'alignment',
  SPEED: 'speed',
  CHOICE: 'choice',
  LANGUAGE: 'language'
};

var ABILITY = {
  STR: 'strength',
  DEX: 'dexterity',
  CON: 'constitution',
  INT: 'intelligence',
  WIS: 'wisdom',
  CHA: 'charisma'
};

var L = {
  AB: 'abyssal',
  CE: 'celestial',
  CO: 'common',
  DS: 'deep speech',
  DR: 'draconic',
  DW: 'dwarvish',
  EL: 'elvish',
  GI: 'giant',
  GN: 'gnomish',
  GO: 'goblin',
  HA: 'halfling',
  IN: 'infernal',
  OR: 'orc',
  PR: 'primordial',
  SY: 'sylvan',
  UC: 'undercommon'
};

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

function t( type, name, value, per_level, proficient ) {
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
}

function tab( name, value, per_level, proficient ) {
  return t( TRAIT.ABILITY, name, value, per_level, proficient );
}

function tap( name, value, per_level, proficient ) {
  return t( TRAIT.APPEARANCE, name, value, per_level, proficient );
}

function tal( value, per_level, proficient ) {
  return t( TRAIT.ALIGNMENT, 'alignment', value, per_level, proficient );
}

function tsp( value, per_level, proficient ) {
  return t( TRAIT.SPEED, 'speed', value, per_level, proficient );
}

function tsk( name, value, per_level, proficient ) {
  return t( TRAIT.SKILL, name, value, per_level, proficient );
}

function tch( name, options, per_level, proficient ) {
  return t( TRAIT.CHOICE, name, options, per_level, proficient );
}

function f( name, value ) {
  return {
    name: name,
    value: value
  };
}

function l( keys, include ) {
  keys = !!keys ? keys : [];
  include = include === undefined ? true : !!include;

  if ( !Array.isArray( keys ) ) {
    keys = [keys];
  }

  var langs = [L.AB, L.CE, L.CO, L.DS, L.DR, L.DW, L.EL, L.GI, L.GN, L.GO, L.HA, L.IN, L.OR, L.PR, L.SY, L.UC];
  var ret_langs = include ? [] : langs.slice();
  var idx;

  keys.forEach( function( el ) {
    idx = langs.indexOf( el );

    if ( include ) {
      if ( idx < 0 ) idx = 2; //  Reset to COMMON
      ret_langs.push( langs[idx] );
    } else {
      idx = ret_langs.indexOf( el );
      if ( idx >= 0 ) {
        ret_langs.splice( idx, 1 );
      }
    }
  } );

  if ( ret_langs.length === 1 ) {
    return t( TRAIT.LANGUAGE, ret_langs[0] );
  } else if ( ret_langs.length > 0 ) {
    return ret_langs.map( function( el ) {
      return t( TRAIT.LANGUAGE, el );
    } );
  } else {
    return t( TRAIT.LANGUAGE, L.CO );
  }
}

var race_traits = {
  'Dwarf': [
    tab( ABILITY.CON, 2 ),
    tap( 'age', 'Up to 350 years old' ),
    tal( 'Lawful Good' ),
    tap( 'size', 'Medium' ),
    tap( 'height', '4 to 5 feet tall' ),
    tap( 'weight', 'About 150 pounds' ),
    tsp( 25 ),
    tsk( 'battleaxe', undefined, undefined, true ),
    tsk( 'handaxe', undefined, undefined, true ),
    tsk( 'throwing hammer', undefined, undefined, true ),
    tsk( 'warhammer', undefined, undefined, true ),
    tch( 'tool proficiency', [
        tsk( 'smith\'s tools', undefined, undefined, true ),
        tsk( 'brewer\'s tools', undefined, undefined, true ),
        tsk( 'mason\'s tools', undefined, undefined, true )
      ]
    ),
    l( L.CO ),
    l( L.DW )
  ],
  'Elf': [
    tab( ABILITY.DEX, 2 ),
    tap( 'age', 'Up to 750 years old' ),
    tal( 'Chaotic Good or Chaotic Evil if Dark Elf/Drow' ),
    tap( 'size', 'Medium' ),
    tap( 'height', 'Under 5 to over 6 feet tall' ),
    tap( 'weight', '100 to 145 pounds' ),
    tsp( 30 ),
    l( L.CO ),
    l( L.EL )
  ],
  'Halfling': [
    tab( ABILITY.DEX, 2 ),
    tap( 'age', 'Up to 250 years old' ),
    tal( 'Lawful Good' ),
    tap( 'size', 'Small' ),
    tap( 'height', 'About 3 feet tall' ),
    tap( 'weight', 'About 40 pounds' ),
    tsp( 25 ),
    l( L.CO ),
    l( L.HA )
  ],
  'Human': [
    tab( ABILITY.STR, 1 ),
    tab( ABILITY.DEX, 1 ),
    tab( ABILITY.CON, 1 ),
    tab( ABILITY.INT, 1 ),
    tab( ABILITY.WIS, 1 ),
    tab( ABILITY.CHA, 1 ),
    tap( 'age', 'Less than 100 years old' ),
    tap( 'size', 'Medium' ),
    tap( 'height', 'About 5 to over 6 feet tall' ),
    tap( 'weight', '125 to 250 pounds' ),
    tsp( 30 ),
    l( L.CO ),
    tch( 'second language', l( L.CO, false ) )
  ],
  'Dragonborn': [
    tab( ABILITY.STR, 2 ),
    tab( ABILITY.CHA, 1 ),
    tap( 'age', 'Up to 80 years old' ),
    tal( 'Neutral Good or Neutral Evil' ),
    tap( 'size', 'Medium' ),
    tap( 'height', 'Over 6 feet tall' ),
    tap( 'weight', 'About 250 pounds' ),
    tsp( 30 ),
    l( L.CO ),
    l( L.DR )
  ],
  'Gnome': [
    tab( ABILITY.INT, 2 ),
    tap( 'age', 'Up to 500 years old' ),
    tal( 'Lawful Good or Chaotic Good' ),
    tap( 'size', 'Small' ),
    tap( 'height', '3 to 4 feet tall' ),
    tap( 'weight', 'About 40 pounds' ),
    tsp( 25 ),
    l( L.CO ),
    l( L.GN )
  ],
  'Half-Elf': [
    tab( ABILITY.CHA, 2 ),
    tch( 'second ability increase', [
        tab( ABILITY.STR, 1 ),
        tab( ABILITY.DEX, 1 ),
        tab( ABILITY.CON, 1 ),
        tab( ABILITY.WIS, 1 ),
        tab( ABILITY.INT, 1 )
      ]
    ),
    tch( 'third ability increase', [
        tab( ABILITY.STR, 1 ),
        tab( ABILITY.DEX, 1 ),
        tab( ABILITY.CON, 1 ),
        tab( ABILITY.WIS, 1 ),
        tab( ABILITY.INT, 1 )
      ]
    ),
    tap( 'age', 'Up to 180 years' ),
    tal( 'Chaotic Neutral' ),
    tap( 'size', 'Medium' ),
    tap( 'height', '5 to 6 feet tall' ),
    tap( 'weight', '125 to 250 pounds' ),
    tsp( 30 ),
    l( L.CO ),
    l( L.EL ),
    tch( 'third language', l( [L.CO, L.EL], false ) )
  ],
  'Half-Orc': [
    tab( ABILITY.STR, 2 ),
    tab( ABILITY.CON, 1 ),
    tap( 'age', 'Up to 75 years' ),
    tal( 'Chaotic Good' ),
    tap( 'size', 'Medium' ),
    tap( 'height', '5 to over 6 feet tall' ),
    tap( 'weight', '125 to 250 pounds' ),
    tsp( 30 ),
    l( L.CO ),
    l( L.OR )
  ],
  'Tiefling': [
    tab( ABILITY.INT, 1 ),
    tab( ABILITY.CHA, 2 ),
    tap( 'age', 'Less than 100 years old' ),
    tal( 'Chaotic Neutral or Chaotic Evil' ),
    tap( 'size', 'Medium' ),
    tap( 'height', 'About 5 to over 6 feet tall' ),
    tap( 'weight', '125 to 250 pounds' ),
    tsp( 30 ),
    l( L.CO ),
    l( L.IN )
  ]
};

var race_features = {
  'Dwarf': [
    f( 'Speed', 'Your speed is not reduced by wearing heavy armor.' ),
    f( 'Darkvision', 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.' ),
    f( 'Dwarven Resilience', 'You have advantage on saving throws against poison, and you have resistance against poison damage.' ),
    f( 'Stonecunning', 'Wherever you make an Intelligence (History) check related to the origin of stonework, you are considered "proficient" in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.' )
  ],
  'Elf': [
    f( 'Darkvision', 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.' ),
    f( 'Keen Senses', 'You have proficiency in the Perception skill.' ),
    f( 'Fey Ancestry', 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.' ),
    f( 'Trance', 'Elves don\'t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is "trance.") While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.' )
  ],
  'Halfling': [
  f( 'Lucky', 'When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.' ),
  f( 'Brave', 'You have advantage on saving throws against being frightened.' ),
  f( 'Halfling Nimbleness', 'You can move through the space of any creature that is of a size larger than yours.' )
  ],
  'Human': [],
  'Dragonborn': [
    f( 'Breath Weapon', 'You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level. After you use your breath weapon, you can\'t use it again until you complete a short or long rest.' ),
    f( 'Damage Resistance', 'You have resistance to the damage type associated with your draconic ancestry.' )
  ],
  'Gnome': [
    f( 'Darkvision', 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.' ),
    f( 'Gnome Cunning', 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.' )
  ],
  'Half-Elf': [
    f( 'Darkvision', 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.' ),
    f( 'Fey Ancestry', 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.' ),
    f( 'Skill Versatility', 'You gain proficiency in two skills of your choice.' )
  ],
  'Half-Orc': [
    f( 'Darkvision', 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.' ),
    f( 'Menacing', 'You gain proficiency in the Intimidation skill.' ),
    f( 'Relentless Endurance', 'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can\'t use this feature again until you finish a long rest.' ),
    f( 'Savage Attacks', 'When you score a critical hit with a melee weapon attack, you can roll one of the weapons damage dice one additional time and add it to the extra damage of the critical hit.' )
  ],
  'Tiefling': [
    f( 'Darkvision', 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.' ),
    f( 'Hellish Resistance', 'You have resistance to fire damage.' ),
    f( 'Infernal Legacy', 'You know the "thaumaturgy" cantrip. Once you reach 3rd level, you can cast the "hellish rebuke" spell once per day as a 2nd-level spell. ONce you reach 5th level, you can also cast the "darkness" spell once per day. Charisma is your spellcasting ability for these spells.' )
  ]
};

var subrace_traits = {
  'Hill Dwarf': [
    tab( ABILITY.WIS, 1 ),
    tab( 'hp', 1, true )
  ],
  'Mountain Dwarf': [
    tab( ABILITY.STR, 2 ),
    tsk( 'light armor', undefined, undefined, true ),
    tsk( 'medium armor', undefined, undefined, true )
  ],
  'High Elf': [
    tab( ABILITY.INT, 1 ),
    tsk( 'longsword', undefined, undefined, true ),
    tsk( 'shortsword', undefined, undefined, true ),
    tsk( 'shortbow', undefined, undefined, true ),
    tsk( 'longbow', undefined, undefined, true ),
    tch( 'extra language', l( [L.CO, L.EL], false ) )
  ],
  'Wood Elf': [
    tab( ABILITY.WIS, 1 ),
    tsk( 'longsword', undefined, undefined, true ),
    tsk( 'shortsword', undefined, undefined, true ),
    tsk( 'shortbow', undefined, undefined, true ),
    tsk( 'longbow', undefined, undefined, true ),
    tsp( 35 )
  ],
  'Dark Elf/Drow': [
    tab( ABILITY.CHA, 1 ),
    tsk( 'rapier', undefined, undefined, true ),
    tsk( 'shortsword', undefined, undefined, true ),
    tsk( 'hand crossbow', undefined, undefined, true )
  ],
  'Lightfoot': [
    tab( ABILITY.CHA, 1 )
  ],
  'Stout': [
    tab( ABILITY.CON, 1 )
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
    tab( ABILITY.DEX, 1 )
  ],
  'Rock Gnome': [
    tab( ABILITY.CON, 1 )
  ]
};

var subrace_features = {
  'Hill Dwarf': [
    f( 'Dwarven Toughness', 'Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.' )
  ],
  'Mountain Dwarf': [],
  'High Elf': [
    f( 'Cantrip', 'You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it.' )
  ],
  'Wood Elf': [
    f( 'Mask of the Wild', 'You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.' )
  ],
  'Dark Elf/Drow': [
    f( 'Darkvision', 'You can see in dim light within 120 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.' ),
    f( 'Sunlight Sensitivity', 'You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in the direct sunlight.' ),
    f( 'Drow Magic', 'You know the "dancing lights" cantrip. When you reach 3rd level, you can cast the "faerie fire" spell once per day. When you reach 5th level, you can also cast the "darkness" spell once per day. Charisma is your spellcasting ability for these spells.' )
  ],
  'Lightfoot': [
    f( 'Naturally Stealthy', 'You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.' )
  ],
  'Stout': [
    f( 'Stout Resilience', 'You have advantage on saving throws against poison, and you have resistance against poison damage.' )
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
    f( 'Your Draconic Ancestry Breath Weapon', '5 by 30 ft. line (Dex. save)' ),
    f( 'Your Draconic Ancestry Damage Resistance', 'Acid' )
  ],
  'Blue': [
    f( 'Your Draconic Ancestry Breath Weapon', '5 by 30 ft. line (Dex. save)' ),
    f( 'Your Draconic Ancestry Damage Resistance', 'Lightning' )
  ],
  'Brass': [
    f( 'Your Draconic Ancestry Breath Weapon', '5 by 30 ft. line (Dex. save)' ),
    f( 'Your Draconic Ancestry Damage Resistance', 'Fire' )
  ],
  'Bronze': [
    f( 'Your Draconic Ancestry Breath Weapon', '5 by 30 ft. line (Dex. save)' ),
    f( 'Your Draconic Ancestry Damage Resistance', 'Lightning' )
  ],
  'Copper': [
    f( 'Your Draconic Ancestry Breath Weapon', '5 by 30 ft. line (Dex. save)' ),
    f( 'Your Draconic Ancestry Damage Resistance', 'Acid' )
  ],
  'Gold': [
    f( 'Your Draconic Ancestry Breath Weapon', '15 ft. cone (Dex. save)' ),
    f( 'Your Draconic Ancestry Damage Resistance', 'Fire' )
  ],
  'Green': [
    f( 'Your Draconic Ancestry Breath Weapon', '15 ft. cone (Con. save)' ),
    f( 'Your Draconic Ancestry Damage Resistance', 'Poison' )
  ],
  'Red': [
    f( 'Your Draconic Ancestry Breath Weapon', '15 ft. cone (Dex. save)' ),
    f( 'Your Draconic Ancestry Damage Resistance', 'Fire' )
  ],
  'Silver': [
    f( 'Your Draconic Ancestry Breath Weapon', '15 ft. cone (Con. save)' ),
    f( 'Your Draconic Ancestry Damage Resistance', 'Cold' )
  ],
  'White': [
    f( 'Your Draconic Ancestry Breath Weapon', '15 ft. cone (Con. save)' ),
    f( 'Your Draconic Ancestry Damage Resistance', 'Cold' )
  ],
  'Forest Gnome': [
    f( 'Natural Illusionist', 'You know the "minor illusion" cantrip. Intelligence is your spellcasting ability for it.' ),
    f( 'Speak with Small Beasts', 'Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts. Forest gnomes love animals and often keep squirrels, badgers, rabbits, moles, woodpeckers, and other creatures as beloved pets.' )
  ],
  'Rock Gnome': [
    f( 'Artificer\'s Lore', 'Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.' ),
    f( 'Tinker', 'You have proficiency with artisan\'s tools (tinker\'s tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device functioning), or when you use your action to dismantle it; at that time, you can reclaim the materials used to create it. You can have up to three such devices active at a time. When you create a device, choose one of the following options: "Clockwork Toy" - This toy is a clockwork animal, monster, or person, such as a frog, mouse, bird, dragon, or soldier. When placed on the ground, the toy moves 5 feet across the ground on each of your turns in a random direction. It makes noises as appropriate to the creature it represents. "Fire Starter" - The device produces a miniature flame, which you can use to light a candle, torch, or campfire. Using the device requires your action. "Music Box" - When opened, this music box plays a single song at a moderate volume. The box stops playing when it reaches the song\'s end or when it is closed.' )
  ]
};

function createDoc() {
  var doc = {
    title: 'Choose a Race',
    races: races.map( createRace )
  };

  return JSON.stringify( doc );
}

function createRace( name ) {
  var race = {
    name: name,
    subraces: subraces[name].map( createSubrace ),
    traits: race_traits[name],
    features: race_features[name]
  };

  return race;
}

function createSubrace( name ) {
  var subrace = {
    name: name,
    traits: subrace_traits[name],
    features: subrace_features[name]
  };

  return subrace;
}

console.log( createDoc() );
