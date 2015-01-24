module.exports = function chooseRace() {
  'use strict';
  var $ = require( 'jquery' ),
      Handlebars = require( 'handlebars' ),
      self = this,
      data,
      featureTemplate,
      $race,
      $description;

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

  function findRaceWithName( name ) {
    var featuresObj = {};
    featuresObj.features = findFeaturesForRaceNamed( name );

    $description.html( featureTemplate( featuresObj ) );
    return featuresObj.features.length > 0;
  }

  function onRaceChanged() {
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

  this.findFeaturesForRaceNamed = findFeaturesForRaceNamed;

  this.setup = function setup( newData ) {
    data = newData;
  };

  this.process = function process( ctx, next ) {
    ctx.handled = true;

    self.setup( ctx.jsonData.races );

    //  The following is only needed if using a * path for page.js
    // $( document ).one( 'page.change.choose-race', function() {
      featureTemplate = Handlebars.templates['choose-race-feature'];

      $race = $( '#race' );
      $description = $( '#race-description' );

      $race.on( 'change', onRaceChanged );
    // } );

    next();
  };

};