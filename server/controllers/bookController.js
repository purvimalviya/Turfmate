const Turf = require('../models/Turf');
const Booking = require('../models/Booking');


const bookTurfAvail = async (req, res) => {
    try {
      const { turfId, clientName, date, timeSlot, sport, price } = req.body;
      
      // Find the turf by id
      const turf = await Turf.findById(turfId);

      if (!turf) {
        return res.status(404).json({ message: 'Turf not found' });
      }

      const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });

      if (!turf.slots[day] || !turf.slots[day].includes(timeSlot)) {
        return res.status(400).json({ message: 'Invalid slot time' });
      }
      
      // Check if the slot is already booked
      const existingBooking = turf.availability.find(a => a.date === date && a.timeSlot === timeSlot);
      if (existingBooking && existingBooking.status === 'Booked') {
        return res.status(400).json({ message: 'Slot already booked' });
      }
      
      // Add new booking to availability
      turf.availability.push({
        date,
        day,
        timeSlot,
        status: 'Booked',
        blocked: false
      });
    
      await turf.save();
      console.log("Slot Booked");
// here do something to rollback if error occurs while booking further

        let booking = await Booking.findOne({ turfId });
        if (!booking) {
            booking = new Booking({ turfId, bookingRecords: [] });
        }

        // Check if the time slot is already booked in owner's booking collection
        const existingConfirmBooking = booking.bookingRecords.find(
            record => record.date.toISOString() === new Date(date).toISOString() && record.timeSlot === timeSlot
        );
        if (existingConfirmBooking) {
            return res.status(400).json({ message: 'Slot already booked & confirmed' });
        }

        // Add the booking record to the bookingRecords array
        booking.bookingRecords.push({
            clientName,
            date,
            timeSlot,
            sport,
            price,
        });

        // Save the updated booking document
        await booking.save();
      

        console.log("Booking Successful");
        res.json({ message: 'Slot booked & confirmed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };


module.exports = {
    bookTurfAvail,
}