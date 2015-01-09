module.exports = function( Handlebars ) {
  'use strict';

  Handlebars.registerHelper( 'choose-race-formatID', function(options) {
    return (''+this.name).trim().toLowerCase().replace( /\s/g, '_' );
  } );
};