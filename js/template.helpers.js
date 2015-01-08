module.exports = function( Handlebars ) {
  'use strict';

  Handlebars.registerHelper( 'race-formatID', function(options) {
    console.log( 'got', this, 'will return', (''+this.name).trim().toLowerCase().replace( /\s/g, '_' ) );
    return (''+this.name).trim().toLowerCase().replace( /\s/g, '_' );
  } );
};