const mongoose = require('mongoose');

const User = mongoose.model('User');

const registerHandler = (ctx, next) => {
  if (ctx.session.registered === true) {
    return next();
  }
  const user = new User({ id: ctx.from.id });
  user.save().then(() => {
    ctx.session.registered = true;
  }).catch((err) => {
    if (err.code === 11000) {
      ctx.session.registered = true;
    } else {
      ctx.session.registered = false;
      console.error(err);
    }
  });
  return next();
};

module.exports = registerHandler;
