const mongoose = require('mongoose');

const User = mongoose.model('User');

const registerHandler = ({ from, session }, next) => {
  if (!session || session.registered === true) {
    return next();
  }
  const name = (from.last_name) ? `${from.first_name} ${from.last_name}` : from.first_name;
  const userObj = Object.assign({}, from, { name });
  const user = new User(userObj);
  user.save().then(() => {
    session.registered = true;
  }).catch((err) => {
    if (err.code === 11000) {
      session.registered = true;
    } else {
      session.registered = false;
      console.error(err);
    }
  });
  return next();
};

module.exports = registerHandler;
