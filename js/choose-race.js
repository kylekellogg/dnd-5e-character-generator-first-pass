module.exports = function(ctx, next) {
  'use strict';
  console.log( 'choose race page' );
  ctx.handled = true;
  // ctx.save();

  var $ = require( 'jquery' );
  var Handlebars = require( 'handlebars' );
  var helpers = require( './template.helpers.js' )( Handlebars );
  var templates = require( './templates.js' );

  $.getJSON( '/data/races.json', function onDataLoaded( data ) {
      console.log( 'loaded', data );
      $( 'main' ).html( Handlebars.templates.race( data ) );
    } )
    .done( function onDataDone() {
      console.log( 'getJSON done' );
    } )
    .fail( function onDataFail() {
      console.log( 'getJSON fail' );
    } )
    .always( next );
};