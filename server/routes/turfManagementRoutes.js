const express = require('express');
const {addNewTurf, viewBookings, viewAvailabilities} = require('../controllers/turfManagementController.js');

const router = express.Router();

router.post('/add', addNewTurf);
// router.patch('/edit', editTurf);
// router.delete('/discard', discardTurf);

router.get('/bookings', viewBookings); //post if you want turfId secrecy
router.get('/availabilities', viewAvailabilities) //post if you want turfId secrecy

// router.get('/profile', editProfile);

module.exports = router;