(function() {
  'use strict';

  var $ = require( 'jquery' );
  var page = require( 'page' );
  var index = require( './index.js' );
  var race = require( './choose-race.js' );
  var clss = require( './choose-class.js' );
  var abilities = require( './determine-abilities.js' );
  var describe = require( './describe-character.js' );
  var equipment = require( './choose-equipment.js' );
  // var notfound = require( './notfound.js' );

  $( document ).ready( function onReady() {

    page( '/', index );
    page( '/choose-race', race );
    page( '/choose-class', clss );
    page( '/determine-abilities', abilities );
    page( '/describe-character', describe );
    page( '/choose-equipment', equipment );
    // page( '*', notfound );
    page( {
      hashbang: true
    } );

  } );
})();
