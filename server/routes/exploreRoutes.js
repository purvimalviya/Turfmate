const express = require('express');
const {getTurfs, getTurfDet, getTurfAvails, bookTurfAvail, getCitiesAndSports} = require('../controllers/exploreController.js');

const router = express.Router();

// http://localhost:5000/api/explore/?name=&city=&sport=
router.get('/', getTurfs);

router.get('/citiesandsports', getCitiesAndSports);

// http://localhost:5000/api/explore/book?turfName=turfq&date=2024-08-26&timeSlot=1200-1300
// router.get('/book', bookTurfAvail);

router.get('/:name/avail', getTurfAvails);

router.get('/:name', getTurfDet);

module.exports = router;



// ########## FOR TESTING PURPOSE #############
// router.get('/test', (req, res) => {
//     res.send("Test endpoint");
// });
