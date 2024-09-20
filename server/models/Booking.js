const mongoose = require('mongoose');

const bookingRecordSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  sport: { type: String },
  price: { type: Number, required: true },
});

const bookingSchema = new mongoose.Schema({
  turfId: { type: mongoose.Schema.Types.ObjectId, ref: 'Turf', required: true },
  bookingRecords: [bookingRecordSchema],
}, { collection: 'bookings' });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
