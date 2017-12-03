const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  join_date: { type: Date, required: true, default: Date.now },
  is_bot: { type: Boolean, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: false },
  name: { type: String, required: true },
  username: { type: String, required: false },
  language_code: { type: String, required: false },
  last_activity: { type: Date, required: true, default: Date.now },
  total_requests: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model('User', UserSchema);

