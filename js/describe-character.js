module.exports = function(ctx, next) {
  console.log( 'describe character page' );
  ctx.handled = true;
  // ctx.save();
  
  next();
};