const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const Owner = require('../models/Owner');
const authController = require('../controllers/authController');

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: '1037161032707-9bkd07mdg8j21s7qrofmls6n2olbo2se.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:5000/auth/google/callback',
    passReqToCallback: true // This enables the req object to be passed to the callback
  },
  (req, accessToken, refreshToken, profile, done) => {
    // Call your googleCallback function
    authController.googleCallback(req, accessToken, refreshToken, profile, done);
  }));
  //   clientID: '1037161032707-9bkd07mdg8j21s7qrofmls6n2olbo2se.apps.googleusercontent.com',
  //   clientSecret: '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',
  //   callbackURL: 'http://localhost:5000/auth/google/callback',
  // }, authController.googleCallback));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
        let user = await Owner.findById(id); // First check for Owner
        if (!user) {
          user = await User.findById(id); // Then check for User
        }
        done(null, user);
      // const user = await User.findById(id);
      // done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
