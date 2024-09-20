const Turf = require('../models/Turf');
const Booking = require('../models/Booking');

const addNewTurf = async (req, res) => {
    // try {
    //     const turfData = req.body; // Get turf data from request body
    
    //     // Create a new turf entry
    //     const newTurf = new Turf(turfData);
    //     await newTurf.save();
    
    //     return res.status(201).json({ message: 'Turf added successfully', turf: newTurf });
    //   } catch (error) {
    //     console.error('Error adding turf:', error);
    //     return res.status(500).json({ message: 'Server Error' });
    //   }

    const {
        name, description, allsports, location, features, rating,
        contact_info, images, availability, city, price_per_sport,
        grounds, slots
    } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    else{
        const existingTurf = await Turf.findOne({ name });

        if (existingTurf) {
            return res.status(400).json({ message: 'Turf with this name already exists' });
        }
    }

    try {
        const newTurf = new Turf({
            name,
            description,
            allsports,
            location,
            features,
            rating,
            contact_info,
            images,
            availability,
            city,
            price_per_sport,
            grounds,
            slots
        });

        const savedTurf = await newTurf.save();
        return res.json({ message: 'Turf added successfully', turf: savedTurf });
    } catch (error) {
        console.error('Error adding turf:', error);
        return res.status(500).json({ message: 'Error adding turf' });
    }

}

// const editTurf = async (req, res) => {
//     const {turfId} = req.query;

//     const turf = await Turf.findById(turfId);
//     if(!turf){
//         return res.status(404).json({message : "turf doesnt exist"});
//     }

//     here the changes
//     return res.json({ message: 'Turf updated successfully' });
// }

const viewBookings = async (req, res) => {
    // const {turfId} = req.body;
    const {turfId} = req.query;

    const turfBookings = await Booking.findOne({ turfId });
    if(!turfBookings){
        return res.status(404).json({message : "No matching turf booking records found"});
    }

    return res.json(turfBookings.bookingRecords);
}

const viewAvailabilities = async (req, res) => {
    // const {turfId} = req.body;
    const {turfId} = req.query;

    const turf = await Turf.findById(turfId);
    if(!turf){
        return res.status(404).json({message : "Turf not found"});
    }

    // Generate an array of 14 days starting from today
    //right now only 3 days i'm taking
    const maxdays = 3;
    const timeSlots = [
        '1000-1100', '1100-1200', '1200-1300', '1300-1400',
        '1400-1500', '1500-1600', '1600-1700', '1700-1800'
    ]; // Time slots from 10 AM to 6 PM

    const availabilityData = {};
    const startDate = new Date();
    console.log(startDate);

    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(startDate.getTime() + istOffset);
    console.log(istDate);

    for (let i = 0; i < maxdays; i++) {
        const date = new Date(startDate);
        const localDate = new Date(istDate);
        // console.log(date,"debug1");

        date.setDate(startDate.getDate() + i);
        localDate.setDate(istDate.getDate() + i);
        // console.log(date,"debug2");

        const day = date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Kolkata' });
        // console.log(day);
        const dateString = localDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        // console.log(dateString)

        // Initialize the date entry in the result object
        availabilityData[dateString] = {
            day: day,
            slots: timeSlots.map(timeSlot => {
                // Check availability for each time slot
                const avail = turf.availability.find(a => a.date === dateString && a.timeSlot === timeSlot);
                const status = avail ? avail.status : 'Available';
                return {
                    timeSlot: timeSlot,
                    status: status
                };
            })
        };
    }

    res.json(availabilityData); // Send the nested object with dates and time slots
}

module.exports = {
    addNewTurf,
    viewBookings,
    viewAvailabilities,
}