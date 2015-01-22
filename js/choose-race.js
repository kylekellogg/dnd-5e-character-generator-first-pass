module.exports = function(ctx, next) {
  'use strict';
  var $ = require( 'jquery' ),
      Handlebars = require( 'handlebars' ),
      featureTemplate,
      $race,
      $description;

  ctx.handled = true;
  // ctx.save();

  function onRaceChanged() {
    updateRace( $race.val() );
  }

  function updateRace( val ) {
    console.log( val );
    findRaceWithName( val );
  }

  function createMatchesName( name ) {
    return function matchesName( el ) {
      return el.hasOwnProperty( 'name' ) && el.name === name;
    };
  }

  function findRaceWithName( name ) {
    var matchesName = createMatchesName( name );
    var matched_races = ctx.jsonData.races
      .filter( function( el ) {
        var subrace_matches = el.subraces.filter( matchesName );
        console.log( 'testing', el, 'has subrace matches', subrace_matches );
        return matchesName( el ) || subrace_matches.length > 0;
      } );
    var race = matched_races[0] || {};
    console.log( race );
    var featuresObj = compileFeatures( race, name );

    $description.html( featureTemplate( featuresObj ) );
  }

  function compileFeatures( race, name ) {
    var matchesName = createMatchesName( name );
    var featuresObj = {};
    var features = race.features;

    race.subraces.forEach( function( item ) {
      if ( matchesName( item ) ) {
        features = features.concat( item.features );
      }
    } );

    //  Limit to unique keys

    featuresObj.features = features || [];

    return featuresObj;
  }

  $( document ).one( 'page.change', function() {
    featureTemplate = Handlebars.templates['choose-race-feature'];

    $race = $( '#race' );
    $description = $( '#race-description' );

    $race.on( 'change', onRaceChanged );
  } );

  next();
};