const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const TollPlaza = require('../models/TollPlazaSch'); // Your user model

// ... your other routes like /login are here ...

// =================================================================
// 1. REUSABLE AUTHENTICATION MIDDLEWARE
// =================================================================
const requireAuth = (req, res, next) => {
  // Check for the httpOnly cookie that was set on login
  const token = req.cookies.tollLogin;

  // If a token exists, verify it
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      // If there's an error (e.g., token is invalid or expired)
      if (err) {
        console.log("Token verification failed:", err.message);
        // Send an Unauthorized status. The frontend will catch this.
        return res.status(401).json({ error: 'Token is not valid' });
      } else {
        // If the token is valid, the decoded payload is available.
        // We can attach the user's ID to the request object for later use.
        req.userId = decodedToken.id;
        // Proceed to the next step (the actual route handler)
        next();
      }
    });
  } else {
    // If no token exists at all
    console.log("No token found, user is not authenticated.");
    return res.status(401).json({ error: 'Not authorized, no token' });
  }
};


// =================================================================
// 2. THE /verify ROUTE ITSELF
// =================================================================
// We use the 'requireAuth' middleware as a gatekeeper.
// The code inside this route will ONLY run if requireAuth calls `next()`.
router.get('/verify', requireAuth, async (req, res) => {
  try {
    // At this point, we know the user is authenticated.
    // The user's ID was attached to the request object by the middleware.
    // We can now fetch the user's data from the database.
    // IMPORTANT: Use `.select('-password')` to exclude the hashed password from the response.
    const user = await TollPlaza.findById(req.userId).select('-password');

    if (!user) {
      // This is a rare edge case where the token is valid but the user was deleted.
      return res.status(404).json({ error: 'User associated with token not found' });
    }

    // Send a 200 OK status with the user's non-sensitive data.
    // The frontend can use this to update its state (e.g., "Welcome, [username]").
    res.status(200).json({ user });

  } catch (err) {
    console.error("Error fetching user in /verify route:", err);
    res.status(500).json({ error: 'Server error while verifying user' });
  }
});


module.exports = router;