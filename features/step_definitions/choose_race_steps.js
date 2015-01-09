module.exports = function chooseRaceSteps() {
  'use strict';

  var assert = require( 'assert' );
  var $ = require('jquery');

  this.World = require("../support/world.js").World;

  this.Given( /^I am on "([^"]*)"$/, function( page, callback ) {
    var base = 'http://loc.al/';

    if ( page.length > 0 ) {
      this.visit( base + '#!' + page, callback );
    } else {
      this.visit( base, callback );
    }
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
      assert.equal( this.browser.document.title, text );
      callback();
    } catch ( e ) {
      callback.fail( 'Expected to find ' + text + ' as <title> content, but found ' + this.browser.document.title + ' instead' );
    }
  } );

  this.When(/^I have clicked "([^"]*)" with text "([^"]*)"$/, function ( el, text, callback) {
    try {
      var win = this.browser.window;
      $(win);
      var $el = win.$( el + ':contains(' + text + ')' );

      if ( $el.length > 0 ) {
        assert.equal( $el.text(), text );
        $el.click();
        callback();
      } else {
        callback.fail( 'Could not find an element (' + el + ') with text ' + text );
      }
    } catch ( e ) {
      callback.fail( 'Expected to find element ' + el + ' with text content ' + text );
    }
  });

  this.Then(/^I should see "([^"]*)" in "([^"]*)"$/, function ( text, el, callback) {
    try {
      var win = this.browser.window;
      $(win);
      var $el = win.$( el + ':contains(' + text + ')' );

      if ( $el.length > 0 ) {
        assert.equal( $el.text(), text );
        callback();
      } else {
        callback.fail( 'Could not find any elements to match ' + el );
      }
    } catch ( e ) {
      callback.fail( 'Expected to find element ' + el + ' with text content ' + text );
    }
  });
};
