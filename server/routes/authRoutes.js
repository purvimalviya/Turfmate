const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

// Google OAuth Login/Signup
// router.get('/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// router.get('/google', (req, res, next) => {
//     console.log('Google login route hit');
//     console.log('sessa:', req.session);
//     next();  // Ensure it proceeds to passport
//   }, passport.authenticate('google', { scope: ['profile', 'email'] }));
  
router.get('/google', (req, res, next) => {
  const isOwner = req.query.isOwner === 'true';
  passport.authenticate('google', {
      scope: ['profile', 'email'],
      state: JSON.stringify({ isOwner }), // Pass the owner flag
  })(req, res, next);
});

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('sessb:', req.session);
    const returnTo = '/profile';
    const frontendURL = 'http://localhost:5173';
    res.redirect(frontendURL + returnTo);
  }
);

// Check if user is logged in
router.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  });

// Logout route
router.get('/logout', authController.logout);

module.exports = router;
