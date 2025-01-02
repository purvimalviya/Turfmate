const mongoose = require('mongoose');

// Define the schema
const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
 }, { collection: 'cities' });

// Create the model
const City = mongoose.model('City', citySchema);

module.exports = City;