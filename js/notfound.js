module.exports = function(ctx, next) {
  console.log( 'page not found' );
  ctx.handled = true;
  // ctx.save();

  next();
};