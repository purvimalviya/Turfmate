const express = require('express');
const {bookTurfAvail} = require('../controllers/bookController.js');

const router = express.Router();

//previously /book in exploreRoutes
router.post('/', bookTurfAvail);

module.exports = router;