const mongoose = require('mongoose');

const BandSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  genre: { type: String, required: true },
  country: { type: String, required: true },
  location: { type: String, required: true },
  themes: { type: String, required: true },
  status: { type: String, required: true },
  label: { type: String, required: true },
  formYear: { type: String, required: true },
  yearsActive: { type: String, required: true },
  total_requests: { type: Number, required: true, default: 1 },
  last_request: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Band', BandSchema);

