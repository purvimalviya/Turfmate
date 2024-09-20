// const mongoose = require('mongoose');

// const turfSchema = new mongoose.Schema({});

// const Turf = mongoose.model('turf', turfSchema);

// module.exports = Turf;

const mongoose = require('mongoose');

const turfSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  allsports: { type: [String] },
  location: {
    address: { type: String },
    latitude: { type: Number },
    longitude: { type: Number }
  },
  features: {
    lighting: { type: Boolean },
    parking: { type: Boolean },
    restrooms: { type: Boolean }
  },
  rating: { type: Number },
  contact_info: {
    phone: { type: String },
    email: { type: String }
  },
  images: { type: [String] },  // Array of image URLs
  availability: [{
    date: { type: String },  // Date in ISO format or as string
    day: { type: String },   // Day of the week
    timeSlot: { type: String },  // Time slot
    status: { type: String },  // Status e.g., 'Booked'
    blocked: { type: Boolean }  // Whether the slot is blocked
  }],
  city: { type: String },
  price_per_sport: {
    Soccer: { type: Number },
    Football: { type: Number }
  },
  grounds: [{
    ground_name: { type: String },
    size: { type: String },
    sports: { type: [String] }  // Array of sports
  }],
  slots: {
    Monday: { type: [String] },  // Array of time slots for each day
    Tuesday: { type: [String] },
    Wednesday: { type: [String] },
    Thursday: { type: [String] },
    Friday: { type: [String] },
    Saturday: { type: [String] },
    Sunday: { type: [String] }
  }
}, { collection: 'turves' });
// });

const Turf = mongoose.model('Turf', turfSchema);

module.exports = Turf;
