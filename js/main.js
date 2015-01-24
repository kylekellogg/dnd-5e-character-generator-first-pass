(function() {
  'use strict';

  var $ = require( 'jquery' );
  var page = require( 'page' );
  var index = require( './index.js' );
  var ChooseRace = require( './choose-race.js' );
  var clss = require( './choose-class.js' );
  var abilities = require( './determine-abilities.js' );
  var describe = require( './describe-character.js' );
  var equipment = require( './choose-equipment.js' );
  // var notfound = require( './notfound.js' );
  var Handlebars = require( 'handlebars' );
  var helpers = require( './template.helpers.js' )( Handlebars );
  var templates = require( './templates.js' );
  var bootstrap = require( 'bootstrap' );

  var race = new ChooseRace();

  var $document = $( document );

  $document.ready( function onReady() {

    var $main = $( 'main' );

    function retrieveTemplate(ctx, next) {
      var reqPage = ctx.pathname.substr(1),
          safePage = reqPage === "" ? "index" : reqPage,
          template = Handlebars.templates[safePage];
      $.getJSON( 'data/' + safePage + '.json' )
        .done( function onDataDone( data ) {
          ctx.jsonData = data;

          //  Apply template
          $main.html( template( data ) )
            .removeAttr( 'class' )
            .addClass( safePage );

          document.title = data.title || 'Character Generator for D&D 5e';

          $document.trigger( 'page.change.' + safePage );
        } )
        .fail( function onDataFail() {
          ctx.jsonData = {};
          $main.empty();
        } )
        .always( function onDataAlways() {
          ctx.save();
          next();
        } );
    }

    page( '/', retrieveTemplate, index );
    page( '/choose-race', retrieveTemplate, race.process );
    page( '/choose-class', retrieveTemplate, clss );
    page( '/determine-abilities', retrieveTemplate, abilities );
    page( '/describe-character', retrieveTemplate, describe );
    page( '/choose-equipment', retrieveTemplate, equipment );
    // page( '*', retrieveTemplate, notfound );
    page( {
      hashbang: true
    } );

  } );
})();
