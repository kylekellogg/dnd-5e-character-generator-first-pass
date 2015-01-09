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
  var notfound = require( './notfound.js' );
  var Handlebars = require( 'handlebars' );
  var helpers = require( './template.helpers.js' )( Handlebars );
  var templates = require( './templates.js' );
  var $document = $( document );

  $document.ready( function onReady() {

    var $main = $( 'main' );

    function retrieveTemplate(ctx, next) {
      var reqPage = ctx.pathname.substr(1),
          safePage = reqPage === "" ? "index" : reqPage,
          template = Handlebars.templates[safePage];
      $.getJSON(
          'data/' + safePage + '.json',
          function onDataLoaded( data ) {
            //  Apply template
            $main.html( template( data ) )
              .removeAttr( 'class' )
              .addClass( safePage );

            document.title = data.title || 'Character Generator for D&D 5e';
          }
        )
        .done( function onDataDone() {
          //  JSON done loading
        } )
        .fail( function onDataFail() {
          //  JSON failed loading
          $main.empty();
        } )
        .always( next );
    }

    page( '/', retrieveTemplate, index );
    page( '/choose-race', retrieveTemplate, race );
    page( '/choose-class', retrieveTemplate, clss );
    page( '/determine-abilities', retrieveTemplate, abilities );
    page( '/describe-character', retrieveTemplate, describe );
    page( '/choose-equipment', retrieveTemplate, equipment );
    page( '*', retrieveTemplate, notfound );
    page( {
      hashbang: true
    } );

  } );
})();
