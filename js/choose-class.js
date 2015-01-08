module.exports = function(ctx, next) {
  console.log( 'choose class page' );
  ctx.handled = true;
  // ctx.save();
  
  next();
};