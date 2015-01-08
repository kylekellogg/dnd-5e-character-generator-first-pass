module.exports = function chooseRaceSteps() {
  this.World = require("../support/world.js").World;

  this.Given( /^I am on the homepage$/, function( callback ) {
    this.visit( 'http://localhost:3000/', callback );
  } );

  this.When( /^the page has loaded$/, function( callback ) {
    try {
      this.browser.assert.success();
      callback();
    } catch ( e ) {
      callback.fail( 'Expected page to load successfully' );
    }
  } );

  this.Then( /^the title should be "([^"]*)"$/, function( text, callback ) {
    try {
      this.browser.assert.text( 'title', text );
      callback();
    } catch ( e ) {
      callback.fail( 'Expected to find ' + text + ' as <title> content' );
    }
  } );
};
