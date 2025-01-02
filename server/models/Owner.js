// models/Owner.js
const mongoose = require('mongoose');
// const Turf = require('./Turf');

const ownerSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  turfs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Turf' }], // Reference Turf model
  createdAt: { type: Date, default: Date.now },
  // Add more fields specific to owners
}, { collection: 'owners' });

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
