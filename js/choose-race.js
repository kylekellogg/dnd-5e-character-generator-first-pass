module.exports = function(ctx, next) {
  'use strict';
  var $ = require( 'jquery' );

  ctx.handled = true;
  // ctx.save();

  //  Page specific
  next();
};