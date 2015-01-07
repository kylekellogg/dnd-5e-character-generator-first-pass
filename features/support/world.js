var zombie = require('zombie');

var WorldConstructor = function WorldConstructor(callback) {
  var browser = new zombie();
  var world = {
    browser: browser,
    visit: function visit( url, cb ) {
      this.browser.visit( url, cb );
    }
  };

  callback( world );
};

exports.World = WorldConstructor;
