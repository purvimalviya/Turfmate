const Turf = require('../models/Turf');
const City = require('../models/City');
const Sport = require('../models/Sport');

const getCitiesAndSports = async (req, res) => {
    try {
        const cities = await City.find();

        const sports = await Sport.find();

        const cityNames = cities.map(city => city.name);
        const sportNames = sports.map(sport => sport.name);

        console.log(cityNames);
        console.log(sportNames);

        res.json({ cityNames, sportNames });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server Error' });
    }
};

const getTurfs = async (req, res) => {
    try {
        const { city, sport, name } = req.query;

        let query = {};

        if (city) {
            query.city = city;
            // query.city = { $regex: city, $options: 'i' };
        }

        if (sport) {
            query.allsports = sport;
            // query.allsports = { $regex: sport, $options: 'i' };
        }

        if (name) {
            // Case-insensitive search for the name
            query.name = { $regex: name, $options: 'i' };
        }

        const turfs = await Turf.find(query);
        res.json(turfs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};



const getTurfDet = async(req, res) => {
    try{
        const name = req.params.name;
        const turf = await Turf.findOne({"name" : name});
        res.json(turf);
    }
    catch(error){
        res.status(500).json({message:'Server Error'})
    }
}


const getTurfAvails = async (req, res) => {
    try {
        const name = req.params.name;
        const turf = await Turf.findOne({ name: name });

        if (!turf) {
            return res.status(404).json({ message: 'Turf not found' });
        }

        // Generate an array of 14 days starting from today
        //right now only 3 days i'm taking
        const maxdays = 7;
        // const timeSlots = [
        //     '1000-1100', '1100-1200', '1200-1300', '1300-1400',
        //     '1400-1500', '1500-1600', '1600-1700', '1700-1800'
        // ]; // Time slots from 10 AM to 6 PM
        const availabilityData = {};

        const startDate = new Date();
        console.log(startDate);

        const istOffset = 5.5 * 60 * 60 * 1000;
        const istDate = new Date(startDate.getTime() + istOffset);
        console.log(istDate);


        for (let i = 0; i < maxdays; i++) {
            const date = new Date(startDate);
            const localDate = new Date(istDate);
            // console.log(date);

            localDate.setDate(istDate.getDate() + i);
            date.setDate(startDate.getDate() + i);
            // console.log(date);

            const day = date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Kolkata' });
            const timeSlots = turf.slots[day] || [];
            console.log(timeSlots);

            const dateString = localDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

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
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server Error' });
    }
};


// const bookTurfAvail = async (req, res) => {
//     try {
//       const { turfName, date, timeSlot } = req.query;
      
//       // Find the turf by name
//       const turf = await Turf.findOne({ name: turfName });

//       if (!turf) {
//         return res.status(404).json({ message: 'Turf not found' });
//       }

//       // Check if the slot is valid
//       const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
//       if (!turf.slots[day] || !turf.slots[day].includes(timeSlot)) {
//         return res.status(400).json({ message: 'Invalid slot time' });
//       }
  
//       // Check if the slot is already booked
//       const existingBooking = turf.availability.find(a => a.date === date && a.timeSlot === timeSlot);
//       if (existingBooking && existingBooking.status === 'Booked') {
//         return res.status(400).json({ message: 'Slot already booked' });
//       }
  
//       // Add new booking to availability
//       turf.availability.push({
//         date,
//         day,
//         timeSlot,
//         status: 'Booked',
//         blocked: false
//       });
  
//       await turf.save();
      
//       res.json({ message: 'Slot booked successfully' });
//     } catch (error) {
//       res.status(500).json({ message: 'Server Error' });
//     }
//   };
  



module.exports = {
    getTurfs,
    getTurfDet,
    getTurfAvails,
    getCitiesAndSports
    // bookTurfAvail,
}


// const getTurfs = async(req, res) => {
//     try{
//         const turfs = await Turf.find({});
//         res.json(turfs);
//         // res.json([
//         //     {title : 'Emperial Lawn', price : 2000},
//         //     {title : 'Rockway', price : 1500 }
//         // ]);
//     }
//     catch(error){
//         res.status(500).json({message:'Server Error'})
//     }
// }