(function() {
  'use strict';

  var $ = require( 'jquery' );
  var page = require( 'page' );
  var ChooseRace = require( './choose-race.js' );
  var clss = require( './choose-class.js' );
  var abilities = require( './determine-abilities.js' );
  var describe = require( './describe-character.js' );
  var equipment = require( './choose-equipment.js' );
  // var notfound = require( './notfound.js' );
  var Handlebars = require( 'handlebars' );
  var helpers = require( './template.helpers.js' )( Handlebars );
  var templates = require( './templates.js' );
  var Character = require( './character.js' );
  var bootstrap = require( 'bootstrap' );

  var race = new ChooseRace();

  var $document = $( document );

  $document.ready( function onReady() {

    var $main = $( 'main' );

    function retrieveTemplate(ctx, next) {
      var reqPage = ctx.pathname.substr(1),
          safePage = reqPage === "" ? "choose-race" : reqPage,
          template = Handlebars.templates[safePage];

      if ( ctx.character === undefined ) {
        ctx.character = new Character();
      }

      $.getJSON( 'data/' + safePage + '.json' )
        .done( function onDataDone( data ) {
          ctx.jsonData = data;

          var tmp = template( data );

          //  Apply template
          $main.html( tmp )
            .removeAttr( 'class' )
            .addClass( safePage );

          document.title = data.title || 'Character Generator for D&D 5e';

          console.log( 'triggering', 'page.change.' + safePage );
          $document.trigger( 'page.change.' + safePage );
        } )
        .fail( function onDataFail() {
          ctx.jsonData = {};
          $main.empty();
        } )
        .always( function onDataAlways() {
          ctx.save();

          console.log( 'From main:', ctx.character );

          next();
        } );
    }

    page( '/', retrieveTemplate, race.process );
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
