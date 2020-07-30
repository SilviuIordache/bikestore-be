const express = require('express');
const bikeController = require('./../controllers/bikeController');

const router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router
  .route('/')
  .get(bikeController.getAllBikes)
  .post(bikeController.createBike);

router
  .route('/:id')
  .get(bikeController.getBike)
  .patch(bikeController.updateBike)
  .delete(bikeController.deleteBike);


module.exports = router;