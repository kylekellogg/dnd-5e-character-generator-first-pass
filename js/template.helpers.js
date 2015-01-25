module.exports = function( Handlebars ) {
  'use strict';

  String.prototype.capitalize = function() {
    if ( this.length > 0 ) {
      return this.substr(0,1).toUpperCase() + this.substr(1);
    }
    return this;
  };

  Handlebars.registerHelper( 'choose-race-trait-type', function(options) {
    var name = (''+this.name).trim();
    var type = (''+this.type).trim();
    var val = (''+this.value).trim();

    switch ( type ) {
      case 'ability_score_increase':
        return 'Ability Score Increase - ' + name.capitalize();

      case 'appearance':
      case 'alignment':
        return '(Suggested) ' + name.split(' ').map( function( str ) { return str.capitalize(); } ).join(' ');

      case 'language':
        return 'Language: ' + name.split(' ').map( function( str ) { return str.capitalize(); } ).join(' ');

      case 'speed':
      case 'skill':
      case 'choice':
        return name.split(' ').map( function( str ) { return str.capitalize(); } ).join(' ');

      default:
        break;
    }

    return name;
  } );
};