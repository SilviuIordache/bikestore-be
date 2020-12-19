const Bike = require('../models/bikeModel.js')
const fs = require('fs');
const { cloudinary }  = require('../utils/cloudinary.js');

// possibly extra and to be deleted
// const { search } = require('../server.js');

exports.getBikes = async (req, res) => {
  try {
  const searchFilter = req.query.search;
  let queryObject = {};

  if(searchFilter) {
    queryObject = { 
      'brand': { 
        '$regex': searchFilter, 
        '$options': 'i'
      } 
    }
  }
  const bikes = await Bike.find(queryObject);
  res.status(200).json({
    status: 'success',
    results: bikes.length,
    data: {
      bikes
    }
  });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getBike = async (req, res) => {
 try {
   const bike = await Bike.findById(req.params.id);
   res.status(200).json({
     status: 'success',
     data: {
       bike
     }
   });
 } catch (err) {
   res.status(404).json({
     status: 'fail',
     message: err
   });
 }
};

exports.updateBike = async (req, res) => {
 try {
   const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
     new: true,
     runValidators: true
   });

   res.status(200).json({
     status: 'success',
     data: {
       bike
     }
   });
 } catch (err) {
   res.status(404).json({
     status: 'fail',
     message: err
   });
 }
};

exports.createBike = async (req, res) => {
  try {
    //upload to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(req.file.path , { upload_preset: 'bikes_upload_preset' }); 
    // add the cloudinary image url to the request body
    req.body.imageUrl = uploadResponse.url;
    // delete original file
    fs.unlink(req.file.path, () => {});
  } catch(err) {
    res.status(422).json({err})
  }

  try {
    const newBike = await Bike.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        bike: newBike,
      }
    });
  } catch(err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
      err
    });
  }
};

exports.deleteBike = async (req, res) => {
 try {
   await Bike.findByIdAndDelete(req.params.id);
   res.status(204).json({
     status: 'success',
     data: null
   });
 } catch (err) {
   res.status(400).json({
     status: 'fail',
     message: 'Invalid data sent!'
   });
 }
};