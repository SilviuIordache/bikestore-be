const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const app = express();
const helmet = require('helmet');
const multer = require('multer');
const path = require('path');

const bodyParser = require('body-parser')
const bikeRouter = require('./routes/bikeRoutes');

// MIDDLEWEARS
if (process.env.NODE_ENV === 'development') {
  // enable logging only for development mode
  app.use(morgan('dev'));
} 

// enable cross origin resource sharing
app.use(cors());

// enable security features
app.use(helmet());

// serve static folder from the server
app.use('/static', express.static(path.join(__dirname, 'images' )))

console.log(`Running in ${process.env.NODE_ENV} mode`)

// file upload middlewear
const upload = multer({ dest: './uploads/'});
app.use(upload.single('file'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


// ROUTES
app.use('/api/v1/bikes', bikeRouter);


module.exports = app;