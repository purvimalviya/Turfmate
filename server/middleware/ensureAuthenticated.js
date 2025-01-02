// middleware/ensureAuthenticated.js

// Middleware to check if user is authenticated
function ensureAuthenticated(req, res, next) {
    console.log("a")
    console.log('Rsess:', req.session);
    if (req.isAuthenticated()) {
      console.log("b")
      return next();
    }
    console.log("c")

    // if (req.isAuthenticated()) {
    //     // Check if user is owner or player based on req.user (assuming it's populated)
    //     const isOwner = req.user && req.user.turfs;  // Example: if user has turfs, they are an owner

    //     if (isOwner) {
    //         res.redirect('/owner-dashboard');  // Redirect to the owner dashboard
    //     } else {
    //         res.redirect('/player-profile');  // Redirect to the player profile
    //     }
    // } else {
    //     res.redirect('/login');
    // }

      return res.status(401).json({ message: 'Not authenticated'});
    }
  
  module.exports = ensureAuthenticated;
  