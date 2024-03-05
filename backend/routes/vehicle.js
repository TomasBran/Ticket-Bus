const express = require('express');

const {
  //   getVehicles,
  getVehiclesAmenities,
  //   getVehicleById,
  getVehicleAmenityById,
  //   getVehicleByPlate,
  getVehicleAmenityByPlate,
  //   createVehicle,
  createVehicleAmenity,
  //   updateVehicle,
  updateVehicleAmenity,
  //   deleteVehicle,
  deleteVehicleAmenity
} = require('../controllers/vehicle');

const router = express.Router();

// GET all vehicles whit amenities
router.get('/', getVehiclesAmenities);

// GET vehicle and amenites by id
router.get('/:id', getVehicleAmenityById);

// GET vehicle and amenites by plate
router.get('/plate/:plate', getVehicleAmenityByPlate);

// POST new vehicle and amenites
router.post('/', createVehicleAmenity);

// PUT vehicle and amenites
router.put('/:id', updateVehicleAmenity);

// DELETE vehicle and association
router.delete('/:id', deleteVehicleAmenity);

module.exports = router;
