module.exports = function( Handlebars ) {
  'use strict';

  String.prototype.capitalize = function() {
    if ( this.length > 0 ) {
      return this.substr(0,1).toUpperCase() + this.substr(1);
    }
    return this;
  };

  String.prototype.capitalizeWords = function() {
    if ( this.length > 0 ) {
      return this.split( ' ' ).map( function( str ) { return str.capitalize(); } ).join( ' ' );
    }
    return this;
  };

  Handlebars.registerHelper( 'choose-race-trait-should-render', function(options) {
    var type = (''+this.type).trim();
    var should_render = false;

    switch ( type ) {
      case 'ability_score_increase':
      case 'language':
      case 'speed':
      case 'choice':
      case 'skill':
        should_render = true;
        break;

      case 'appearance':
        should_render = (''+this.name) === 'size';
        break;
    }

    return should_render ? options.fn( this ) : null;
  } );

  Handlebars.registerHelper( 'choose-race-trait-type', function(options) {
    var name = (''+this.name).trim();
    var type = (''+this.type).trim();
    var val = (''+this.value).trim();

    switch ( type ) {
      case 'ability_score_increase':
        return 'Ability Score Increase: ';

      case 'appearance':
      case 'alignment':
        if ( name === 'size' ) return name.capitalize();
        return '';//'(Suggested) ' + name.split(' ').map( function( str ) { return str.capitalize(); } ).join(' ');

      case 'language':
        return 'Language: ';

      case 'speed':
      case 'choice':
        return name.capitalizeWords();

      case 'skill':
        return 'Proficiency: ';

      default:
        break;
    }

    return name;
  } );

  Handlebars.registerHelper( 'choose-race-trait-value', function(options) {
    var name = (''+this.name).trim();
    var type = (''+this.type).trim();
    var val = (''+this.value).trim();
    var per_level = ( this.hasOwnProperty( 'per_level' ) ) ? !!this.per_level : false;
    var proficient = ( this.hasOwnProperty( 'proficient' ) ) ? !!this.proficient : false;

    switch ( type ) {
      case 'ability_score_increase':
        return name.capitalize() + ' ' + (+val > 0 ? '+' + val : val);

      case 'language':
        return name.capitalizeWords();

      case 'appearance':
        return name === 'size' ? val.capitalizeWords() : '';

      case 'alignment':
        return '';

      case 'speed':
        return val + ' feet';

      case 'skill':
        return name.capitalizeWords() + (( per_level ) ? ' Per Level' : '');

      case 'choice':
        return 'Complicated rendering should go here';

      default:
        break;
    }

    return val;
  } );

};