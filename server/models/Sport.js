const mongoose = require('mongoose');

// Define the schema
const sportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
 }, { collection: 'sports' });

// Create the model
const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;