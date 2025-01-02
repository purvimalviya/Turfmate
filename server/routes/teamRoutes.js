const express = require('express');
const {teamReq, fetchReq, myReq, join} = require('../controllers/teamController.js');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const router = express.Router();

// let teamRequirements = []; // This is a mock database for now

// POST route for creating team requirements
router.post('/requirement', ensureAuthenticated, teamReq);
// router.post('/requirement', teamReq);

// GET route for fetching all team requirements
router.get('/', fetchReq );

router.get('/user-requirements', ensureAuthenticated, myReq);

// app.post('/api/team/join/:requirementId', ensureAuthenticated, async (req, res) => {
router.post('/join/:requirementId', ensureAuthenticated, join);



module.exports = router;