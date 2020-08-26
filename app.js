const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const app = express();
const helmet = require('helmet');
const multer = require('multer');

const bodyParser = require('body-parser')
const bikeRouter = require('./routes/bikeRoutes');

app.use(cors());
app.use(helmet());


const upload = multer({
  dest: './uploads/'
});

console.log(`Running in ${process.env.NODE_ENV} mode`)

// MIDDLEWEARS
if (process.env.NODE_ENV === 'development') {
  // enable logging only for development mode
  app.use(morgan('dev'));
} 
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