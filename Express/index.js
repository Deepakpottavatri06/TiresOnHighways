const express = require('express');
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
const guestDetails = require('./routes/guestDetails.js');
const guestUpload = require('./routes/guestUpload.js'); 
const tollCheckRecords = require('./routes/tollCheckRecords.js');
const tollLogin = require('./routes/tollLogin.js');
const tollLogout = require('./routes/tollLogout.js');
const tollUpload = require('./routes/tollUpload.js');
const tollChRcImages = require('./routes/tollChRcImages.js');
const statistics = require('./routes/statistics.js')
const app = express();
const dotenv = require('dotenv');
dotenv.config();
// ^ defining port
const port = 4000;

// ^ CORS 
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Use environment variable or default to localhost
  credentials: true,
}));
// app.use(cors({
//   origin: 'http://localhost:3000', // OR use process.env.FRONTEND_URL
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));
// app.use(cors());

// & MongoDB connection
// console.log(process.env.MONGODB_URI);

mongoose.connect( `${process.env.MONGODB_URI}`)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// ^ Express config for parsing request body as JSON
app.use(express.urlencoded({ extended: true }));  
app.use(router);

router.get('/', (req, res) => {
  res.send('Hello TiresOnHighways Express ;)');
});
router.get('/guestDet' ,guestDetails);
router.post('/guestUp', guestUpload);
router.get('/checkRecords', tollCheckRecords);
router.post('/login', tollLogin);
router.get('/logout', tollLogout);
router.post('/tollupload', tollUpload);
router.get('/getIm', tollChRcImages);
router.get('/stats', statistics);

// ^ Server listening on port 4000
app.listen(port, () => console.log(`Server is listening on port ${port}`));