const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  id: { type: Number, reqired: true, unique: true },
  join_date: { type: Date, reqired: true, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);

