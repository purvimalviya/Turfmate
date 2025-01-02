const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamRequirementSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  skillLevel: {
    type: String,
    required: true
  },
  teamSize: {
    type: Number,
    required: true
  },
  emptySpots: {
    type: Number,
    required: true
  },
  sport: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  date: {
    type: Date, // New date field
    required: true
  },
  posterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  requesters: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  }
}, { collection: 'teamRequirements' });

module.exports = mongoose.model('TeamRequirement', teamRequirementSchema);
