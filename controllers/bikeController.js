const Bike = require('../models/bikeModel.js')

exports.getAllBikes = async (req, res) => {
 try {
   const bikes = await Bike.find();
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
   const newBike = await Bike.create(req.body);
   res.status(201).json({
     status: 'success',
     data: {
       bike: newBike,
       file: req.file
     }
   });
 } catch (err) {
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