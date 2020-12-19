const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bikeSchema = new Schema({
 brand: { 
   type: String, 
   required: [true, 'A bike must have a brand']
 },
 model: {
   type: String,
   required: [true, 'A bike must have a model']
 },
 stock: {
   type: Number,
   default: 0
 },
 price: {
   type: Number,
   required: [true, 'A bike must have a price']
 },
 imageUrl: {
   type: String
 }
}, { versionKey: false });

const Bike = mongoose.model('Bike', bikeSchema);
module.exports = Bike;