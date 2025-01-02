const User = require('../models/User');
const Owner = require('../models/Owner');

// Handle Google authentication callback
exports.googleCallback = async (req, accessToken, refreshToken, profile, done) => {
  try {
    // let user = await User.findOne({ googleId: profile.id });

    // if (user) {
    //   // User exists, proceed with login
    //   return done(null, user);
    // } else {
    //   // Create a new user
    //   const newUser = new User({
    //     googleId: profile.id,
    //     displayName: profile.displayName,
    //     email: profile.emails[0].value,
    //   });

    //   await newUser.save();
    //   return done(null, newUser);
    // }
    const state = req.query.state ? JSON.parse(req.query.state) : {};
    const isOwner = state.isOwner; // Extract whether the user is an owner
    // const { isOwner } = profile; // Add a flag from the front-end to determine owner or player
    console.log(isOwner);
    if (isOwner) {
      console.log("BHAIIIISAAAAAAB OWNER")
      let owner = await Owner.findOne({ googleId: profile.id });

      if (owner) {
        return done(null, owner);
      } else {
        const newOwner = new Owner({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
        });
        await newOwner.save();
        return done(null, newOwner);
      }
    } else {
      console.log("BHAIIIISAAAAAAB PLAYER")
      let player = await User.findOne({ googleId: profile.id });

      if (player) {
        return done(null, player);
      } else {
        const newPlayer = new User({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
        });
        await newPlayer.save();
        return done(null, newPlayer);
      }
    }
  } catch (error) {
    return done(error, null);
  }
};

// Logout
// exports.logout = (req, res) => {
//   req.logout(() => {
//     res.redirect('/');
//   });
// };

// Logout
exports.logout = (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed', error: err });
      }
  
      // Clear session data
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: 'Session destruction failed', error: err });
        }
  
        // Redirect to the home page or login page
        console.log("sess destroyed, logout")
        res.redirect('/');
      });
    });
  };
  
