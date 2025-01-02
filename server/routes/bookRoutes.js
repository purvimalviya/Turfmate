const express = require('express');
const {bookTurfAvail} = require('../controllers/bookController.js');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const router = express.Router();

//previously /book in exploreRoutes
router.post('/', ensureAuthenticated, bookTurfAvail);

module.exports = router;