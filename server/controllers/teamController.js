const TeamRequirement = require('../models/TeamRequirement');
const mongoose = require('mongoose');

// let teamRequirements = []; // This is a mock database for now

// POST route for creating team requirements
// const teamReq = async (req, res) => {
//     const newRequirement = req.body;
//     teamRequirements.push(newRequirement); // Store new requirement
//     res.json(newRequirement);
// };

const teamReq = async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const userId = req.user._id;  // Extract the userId from the authenticated session
        // const { description, skillLevel, teamSize, emptySpots, sport, city } = req.body;
        const { description, skillLevel, teamSize, emptySpots, sport, city, date } = req.body;

        const newRequirement = new TeamRequirement({
            description,
            skillLevel,
            teamSize,
            emptySpots,
            sport,
            city,
            date,  // Include the new date field here
            posterId: userId  // Automatically set the posterId to the authenticated user's ID
        });

        await newRequirement.save();
        res.json(newRequirement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save team requirement' });
    }
};

// GET route for fetching all team requirements
// const fetchReq = async (req, res) => {
//     res.json(teamRequirements);
// };
const fetchReq = async (req, res) => {
    try {
        // Fetch all team requirements from the database
        const teamRequirements = await TeamRequirement.find().populate('posterId', 'displayName email');  // Optional: populate to include poster details
        res.json(teamRequirements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch team requirements' });
    }
};


// const myReq = async (req, res) => {
//     try {
//         const userId = req.user._id; // Assuming req.user is set by your auth middleware
//         const requirements = await TeamRequirement.find({ posterId: userId }); // Filter by posterId
//         res.json(requirements);
//     } catch (error) {
//         console.error('Failed to fetch user requirements:', error);
//         res.status(500).json({ error: 'Failed to fetch requirements' });
//     }
// };
const myReq = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user is set by your auth middleware
        const requirements = await TeamRequirement.find({ posterId: userId })
            .populate('requesters', 'displayName email') // Populate requesters with their display name and email
            .populate('posterId', 'displayName email'); // Optional: populate to include poster details if needed

        res.json(requirements);
    } catch (error) {
        console.error('Failed to fetch user requirements:', error);
        res.status(500).json({ error: 'Failed to fetch requirements' });
    }
};


// app.post('/api/team/join/:requirementId', ensureAuthenticated, async (req, res) => {
    const join = async (req, res) => {
        const requirementId = req.params.requirementId;
        const userId = new mongoose.Types.ObjectId(req.user._id); // Use 'new' to create ObjectId
    
        try {
            // Find the requirement by ID
            const requirement = await TeamRequirement.findById(requirementId);
            if (!requirement) {
                return res.status(404).json({ message: 'Requirement not found' });
            }
    
            // Check if the user has already requested to join
            const hasRequested = requirement.requesters.some(requesterId => requesterId.equals(userId));
    
            if (hasRequested) {
                return res.status(400).json({ message: 'You have already sent a join request' });
            }
    
            // Add user ID to requesters
            requirement.requesters.push(userId); // Push the userId directly
            await requirement.save();
    
            return res.status(200).json({ message: 'Join request sent successfully!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
    
module.exports = {
    teamReq, fetchReq, myReq, join
}
