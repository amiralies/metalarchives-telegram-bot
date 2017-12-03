const mongoose = require('mongoose');

const User = mongoose.model('User');

const normalizeLogoUrl = (logoUrl) => {
  const n = logoUrl.indexOf('?');
  logoUrl = logoUrl.substring(0, n !== -1 ? n : logoUrl.length);
  return logoUrl;
};

const incUserRequests = ({ id }) =>
  User.update({ id }, { $inc: { total_requests: 1 } }).exec();

module.exports = { normalizeLogoUrl, incUserRequests };
