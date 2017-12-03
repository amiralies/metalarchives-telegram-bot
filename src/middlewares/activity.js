const mongoose = require('mongoose');

const User = mongoose.model('User');

const activityHandler = ({ from }, next) => {
  User.update({ id: from.id }, { $set: { last_activity: Date.now() } }).exec();
  return next();
};

module.exports = activityHandler;
