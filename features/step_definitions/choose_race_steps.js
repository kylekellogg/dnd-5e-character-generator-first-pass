module.exports = function chooseRaceSteps() {
  'use strict';

  this.World = require("../support/world.js").World;

  var $ = require('jquery');
  var Race = require( '../../js/choose-race.js' );
  var base = 'http://loc.al/';
  var data = require( '../../data/choose-race.json' );

  this.Given( /^I am on "([^"]*)"$/, function( page, callback ) {
    if ( page.length > 0 ) {
      this.visit( base + '#!' + page, callback );
    } else {
      this.visit( base, callback );
    }
  } );

  this.Then( /^the title should be "([^"]*)"$/, function( text, callback ) {
    if ( this.browser.document.title === text ) {
      callback();
    } else {
      callback.fail( 'Expected to find ' + text + ' as <title> content, but found ' + this.browser.document.title + ' instead' );
    }
  } );

  this.When(/^I have selected "([^"]*)"$/, function ( text, callback) {
    var win = this.browser.window; $(win);
    var $el = win.$( 'option:contains(' + text + ')' ),
        $select = $el.parents( 'select' );

    if ( $el.length > 0 && $select.length > 0 ) {
      win.$( 'option:selected' ).removeAttr( 'selected' );
      $el.attr( 'selected', 'selected' );
      $select.val( text );
      $select.trigger( 'change' );

      callback();
    } else {
      callback.fail( 'Could not find an element (' + el + ') with text ' + text );
    }
  });

  this.Then(/^I should have the following features: '(.*)'$/, function ( jsonStr, callback ) {
    var win = this.browser.window; $(win);
    var json = JSON.parse( jsonStr );
    var doesNotMatch = false;
    var features = [];
    var race = new Race();
    var i;
    var l;

    function markNotProcessed( obj ) {
      var cloneObj = obj;
      cloneObj.processed = false;
      return cloneObj;
    }

    for ( i = 0, l = json.length; i < l; i++ ) {
      json[i] = markNotProcessed( json[i] );
    }
    
    race.setup( data.races );
    features = race.findFeaturesForRaceNamed( win.$( 'option:selected' ).val() );
    
    for ( i = 0, l = features.length; i < l; i++ ) {
      features[i] = markNotProcessed( features[i] );
    }

    if ( json.length !== features.length ) {
      callback.fail( 'Expected features and real features do not have the same number of items (' + json.length + ' vs ' + features.length + ')' );
      return;
    }

    function findForName( arr, name ) {
      var filtered = arr.filter( function(el) {
        var hasSameName = el.hasOwnProperty('name') && el.name === name;
        var hasNotProcessed = el.hasOwnProperty('processed') && !el.processed;
        return hasSameName && hasNotProcessed;
      } );

      if ( filtered.length === 0 ) {
        return arr[0] || {};
      }

      return filtered[0];
    }

    for ( i = 0, l = json.length; i < l; i++ ) {
      var expected = json[i];
      var feature = findForName( features, expected.name );

      if ( expected.name !== feature.name || expected.value !== feature.value ) {
        doesNotMatch = true;
      } else {
        expected.processed = true;
        feature.processed = true;
      }
    }

    if ( doesNotMatch ) {
      callback.fail( 'Expected features and real features do not match' );
    } else {
      callback();
    }
  });

};
