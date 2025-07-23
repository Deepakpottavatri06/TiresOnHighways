const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const auth = require('../middleware/tollAuth');

// ^ CORS 
// router.use(cors({
//     origin: 'https://tiresonhighways.vercel.app',
//     credentials: true,
// }));

router.use(cookieParser());


// ! Logout Route
router.get('/logout', auth, (req, res) => {
    res.cookie('tollLogin', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    path: '/',
    maxAge: 1, // Instantly expire the cookie
    partitioned: true,
  });
  res.status(200).send("Logged out successfully");
});
module.exports = router;