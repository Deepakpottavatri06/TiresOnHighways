const express = require('express');
const router = express.Router();
const multer = require('multer');
const TollPlaza = require('../models/TollPlazaSch');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');


// ^ CORS 
// router.use(cors({
//     origin: 'https://tiresonhighways.vercel.app',
//     credentials: true,
//   }));

router.use(cookieParser());

// & Multer config for TollUpload
const TollUp = multer.memoryStorage();
const Tollupload = multer({ storage: TollUp, limits: { fieldSize: 25 * 1024 * 1024 } })

// & JWT
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 1000 });
}

// ! Login Route
router.post('/login', Tollupload.any(), async (req, res) => {
  const { toll, password } = req.body;
  try {
    const user = await TollPlaza.findOne({ username: toll });
    console.log(user);
    if (user) {
      try {
        const passMatch = await bcrypt.compare(password, user.password);
        if (passMatch) {
          console.log("Password Matched");
          try {
            const token = createToken(user._id);
            // console.log(token);
            res.cookie('tollLogin', token, {
              httpOnly: true,   // For access via JS (optional, for debugging)
              secure: true,      // Required for cross-origin cookies in production
              sameSite: 'None',  // Required for cross-origin cookies
              path: '/',            // Makes the cookie available across your entire site
              maxAge: 60 * 60 * 1000,
            });
            // res.cookie('tollLogin', token, { domain: `${req.hostname}`, maxAge: 60 * 60 * 1000 });
            // sameSite: 'None'  -> for CORS purposes and controlling the cookie to be sent only to the same origin
            // secure : true -> is not recommended for development purposes as we can't access a cookie using document.cookie in the client side 
            // path: '/' -> to make the cookie available to all the routes
            // domain: `http://${req.hostname}:3000`} -> to make the cookie available to all the subdomains
            console.log("Success");
            res.send("Success");
          } catch (err) {
            console.log(err);
          }
        }
        else {
          console.log("Not Allowed");
          res.send("Not Allowed");
        }
      }
      catch (err) {
        console.log(err);
      }
    }
  }
  catch (err) {
    console.log(err);
  }
});
module.exports = router;