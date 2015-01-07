module.exports = function chooseRaceSteps() {
  this.World = require("../support/world.js").World;

  this.Given( /^I am on the homepage$/, function( callback ) {
    this.visit( 'http://localhost:9797/', callback );
  } );

  this.When( /^the page has loaded$/, function( callback ) {
    try {
      this.browser.assert.success();
      callback();
    } catch ( e ) {
      callback.fail( 'Expected page to load successfully' );
    }
  } );

  this.Then( /^I should see "([^"]*)"$/, function( text, callback ) {
    try {
      this.browser.assert.text( 'h1', text );
      callback();
    } catch ( e ) {
      callback.fail( 'Expected to find ' + text + ' as <h1> content' );
    }
  } );
};
