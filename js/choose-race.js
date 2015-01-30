module.exports = function chooseRace() {
  'use strict';
  var $ = require( 'jquery' ),
      Handlebars = require( 'handlebars' ),
      self = this,
      data,
      featureTemplate,
      traitTemplate,
      $race,
      $description,
      $features,
      $traits,
      $chooseRaceForm,
      $submit;

  function findFeaturesForRaceNamed( name ) {
    var matchesName = createMatchesName( name );
    var matched_races = data
      .filter( function( el ) {
        var subrace_matches = el.subraces.filter( matchesName );
        return matchesName( el ) || subrace_matches.length > 0;
      } );
    var race = matched_races[0] || {};
    var featuresObj = compileFeatures( race, name );
    return featuresObj.features || [];
  }

  function findTraitsForRaceNamed( name ) {
    var matchesName = createMatchesName( name );
    var matched_races = data
      .filter( function( el ) {
        var subrace_matches = el.subraces.filter( matchesName );
        return matchesName( el ) || subrace_matches.length > 0;
      } );
    var race = matched_races[0] || {};
    var traitsObj = compileTraits( race, name );
    return traitsObj.traits || [];
  }

  function findRaceWithName( name ) {
    var featuresObj = {};
    var traitsObj = {};

    featuresObj.features = findFeaturesForRaceNamed( name );
    traitsObj.traits = findTraitsForRaceNamed( name );

    $features.html( featureTemplate( featuresObj ) );
    $traits.html( traitTemplate( traitsObj ) );

    return featuresObj.features.length > 0 && traitsObj.traits.length > 0;
  }

  function onRaceChanged() {
    $submit.removeAttr( 'disabled' );
    $submit.removeClass( 'disabled' );
    
    updateRace( $race.val() );
  }

  function updateRace( val ) {
    return findRaceWithName( val );
  }

  function createMatchesName( name ) {
    return function matchesName( el ) {
      return el.hasOwnProperty( 'name' ) && el.name === name;
    };
  }

  function compileFeatures( race, name ) {
    var matchesName = createMatchesName( name );
    var featuresObj = {};
    var features = race.features;

    function indexOfFeature( arr, feature ) {
      var contains = -1;
      var item;

      for ( var i = 0, l = arr.length; i < l; i++ ) {
        item = arr[i];

        if ( item.hasOwnProperty('name') && item.name === feature.name ) {
          contains = i;
          break;
        }
      }

      return contains;
    }

    race.subraces.forEach( function( item ) {
      if ( matchesName( item ) ) {
        features = features.concat( item.features );
      }
    } );

    //  Limit to unique features, with later ones overriding earlier matches (based on name)
    var goodFeatures = [];
    features.forEach( function( item ) {
      var idx = indexOfFeature( goodFeatures, item );
      if ( idx > -1 ) {
        goodFeatures[idx] = item;
      } else {
        goodFeatures.push( item );
      }
    } );

    featuresObj.features = goodFeatures || [];

    return featuresObj;
  }

  function compileTraits( race, name ) {
    var matchesName = createMatchesName( name );
    var traitsObj = {};
    var traits = race.traits;

    function indexOfTrait( arr, feature ) {
      var contains = -1;
      var item;

      for ( var i = 0, l = arr.length; i < l; i++ ) {
        item = arr[i];

        if ( item.hasOwnProperty('name') && item.name === feature.name ) {
          contains = i;
          break;
        }
      }

      return contains;
    }

    race.subraces.forEach( function( item ) {
      if ( matchesName( item ) ) {
        traits = traits.concat( item.traits );
      }
    } );

    //  Sort by type
    traits.sort( function( a, b ) {
      var types = ['language', 'speed', 'appearance', 'ability_score_increase', 'skill', 'choice'];
      var aval = types.indexOf( a.type );
      var bval = types.indexOf( b.type );

      if ( aval === -1 ) return 1;
      if ( bval === -1 ) return -1;

      //  0-0 = 0, 0-1 = -1 (before), 1-0 = 1 (after)
      return aval - bval;
    } );

    traitsObj.traits = traits || [];

    return traitsObj;
  }

  function onRaceSubmit( e ) {
    e.preventDefault();
    return false;
  }

  this.findFeaturesForRaceNamed = findFeaturesForRaceNamed;

  this.findTraitsForRaceNamed = findTraitsForRaceNamed;

  this.setup = function setup( newData ) {
    data = newData;
  };

  this.process = function process( ctx, next ) {
    ctx.handled = true;

    self.setup( ctx.jsonData.races );

    //  The following is only needed if using a * path for page.js
    // $( document ).one( 'page.change.choose-race', function() {
      featureTemplate = Handlebars.templates['choose-race-feature'];
      traitTemplate = Handlebars.templates['choose-race-trait'];

      $race = $( '#race' );
      $description = $( '#race-description' );
      $features = $( '#race-features' );
      $traits = $( '#race-traits' );
      $chooseRaceForm = $( '#choose-race-form' );
      $submit = $chooseRaceForm.find( 'button[type=submit]' );

      $chooseRaceForm.on( 'submit', onRaceSubmit );

      $race.on( 'change', onRaceChanged );
    // } );

    next();
  };

};