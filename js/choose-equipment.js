module.exports = function(ctx, next) {
  console.log( 'choose equipment page' );
  ctx.handled = true;
  // ctx.save();
  
  next();
};