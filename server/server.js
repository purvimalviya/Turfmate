const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
// const mongoose = require('mongoose');
const passportConfig = require('./config/passportConfig');
const authRoutes = require('./routes/authRoutes');
const exploreRoutes = require('./routes/exploreRoutes');
const bookRoutes = require('./routes/bookRoutes');
const teamRoutes = require('./routes/teamRoutes');
const turfManagementRoutes = require('./routes/turfManagementRoutes');
const connectDB = require('./config/db');

const User = require('./models/User');
const Owner = require('./models/Owner');

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors());

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    credentials: true // Allow credentials such as cookies
}));

app.options('*', cors()); // This will handle preflight requests for all routes

// Connect to the database
connectDB();

app.use(session({
    secret: 'your_secret_key',  // Use a strong secret key in production
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,  // Set to true in production for HTTPS
        maxAge: 24 * 60 * 60 * 1000  // 1 day expiration for session cookie
    }
}));
// app.use(session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }, // Set to true in production for HTTPS
// }));
  
// Passport middleware
passportConfig(passport);  // Load Passport configuration
app.use(passport.initialize());
app.use(passport.session());
  
// Routes

app.get('/',(req,res)=>{
    res.send(req.user ? `Hello, ${req.user.displayName}` : 'Hello, Guest');
    // return res.json({message : "this is a trial"});
})

app.get('/login',(req,res)=>{
    // res.send(req.user ? `Hello, ${req.user.displayName}` : 'Hello, Guest');
    return res.json({message : "this is a trial login screen"});
})


app.use('/auth', authRoutes);
app.use('/api/explore', exploreRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/management', turfManagementRoutes);
app.use('/api/team', teamRoutes);

// app.get('/api/check-auth', async (req, res) => {
//     if (req.isAuthenticated()) {  // Assuming you're using Passport.js or similar for session handling
//         console.log(req.user);
//         res.json({ user: req.user });
//     } else {
//         res.status(401).json({ message: 'Not authenticated' });
//     }
// });

app.get('/api/check-auth', async (req, res) => {
    try {
        // Ensure the user is authenticated and req.user exists
        if (req.isAuthenticated() && req.user) {
            const user = req.user; // assuming req.user contains the authenticated user
            let userData;
            let isOwner = false; // Default to false

            // Check if the user is an Owner
            userData = await Owner.findOne({ googleId: user.googleId });

            if (userData) {
                isOwner = true;
            } else {
                // If not an owner, check if the user is a regular User
                userData = await User.findOne({ googleId: user.googleId });
                if (!userData) {
                    return res.status(404).json({ message: 'User not found' });
                }
            }
            res.json({ user: userData, isOwner });
        } else {
            res.status(401).json({ message: 'Not authenticated' });
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 5001 ;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})

//for rbac after ensueauth add another middleware to check role