module.exports = function(ctx, next) {
  console.log( 'determine abilities page' );
  ctx.handled = true;
  // ctx.save();
  
  next();
};