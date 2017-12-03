const mongoose = require('mongoose');

const User = mongoose.model('User');
const Band = mongoose.model('Band');

const normalizeLogoUrl = (logoUrl) => {
  const n = logoUrl.indexOf('?');
  logoUrl = logoUrl.substring(0, n !== -1 ? n : logoUrl.length);
  return logoUrl;
};

const incUserRequests = ({ id }) =>
  User.findOneAndUpdate({ id }, { $inc: { total_requests: 1 } }).exec();

const incBandRequests = (band) => {
  const { id } = band;
  Band
    .findOneAndUpdate({ id }, { $inc: { total_requests: 1 }, $set: { last_request: Date.now() } })
    .then((res) => {
      if (!res) {
        const bandToSave = new Band(band);
        bandToSave.save();
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { normalizeLogoUrl, incUserRequests, incBandRequests };
