const {
  Vehicle,
  VehicleAmenity,
  Amenity,
  Seat,
  Schedule
} = require('../database/models');
const { Op } = require('sequelize');

// Formated the return of vehicles whit amenities
const formatVehicleData = (vehicle) => ({
  id: vehicle.id,
  number: vehicle.number,
  plate: vehicle.plate.toUpperCase(),
  totalSeats: vehicle.totalSeats,
  amenities: vehicle.amenities.map((amenity) => amenity.name)
});

/* // get all vehicles
const getVehicles = async () => await Vehicle.findAll(); */

// get all vehicles with amenities
const getVehiclesAmenities = async () => {
  const vehicles = await Vehicle.findAll({
    include: [
      {
        model: Amenity,
        as: 'amenities',
        required: false,
        through: {
          attributes: []
        }
      }
    ]
  });
  return vehicles.map(formatVehicleData);
};

// get vehicle by id
const getVehicleById = async (id) => await Vehicle.findByPk(id);

// get vehicle by id whit amenities
const getVehicleAmenityById = async (id) => {
  const vehicle = await Vehicle.findByPk(id, {
    include: [
      {
        model: Amenity,
        as: 'amenities',
        required: false,
        through: {
          attributes: []
        }
      }
    ]
  });
  return formatVehicleData(vehicle);
};

// get vehicle by plate
const getVehicleByPlate = async (plate) =>
  await Vehicle.findOne({ where: { plate } });

// get vehicle by plate whit amenities
const getVehicleAmenityByPlate = async (plate) => {
  const vehicle = await Vehicle.findOne({
    where: { plate: { [Op.iRegexp]: `${plate}` } },
    include: [
      {
        model: Amenity,
        as: 'amenities',
        required: false,
        through: {
          attributes: []
        }
      }
    ]
  });
  if (!vehicle) return null;
  return formatVehicleData(vehicle);
};

// create one vehicle
const createVehicle = async (newVehicle) => await Vehicle.create(newVehicle);

// create one vehicle and associate amenities
const createVehicleAmenity = async (vehicleId, amenityObjects) => {
  const vehicle = await Vehicle.findByPk(vehicleId);

  if (amenityObjects && amenityObjects.length > 0) {
    const promises = amenityObjects.map(async (amenityObject) => {
      const amenity = await Amenity.findByPk(amenityObject.id);
      await vehicle.addAmenity(amenity);
    });
    await Promise.all(promises);
  }

  // Fetch vehicle with associated amenities, including amenity names
  const createVehicle = await Vehicle.findByPk(vehicleId, {
    include: {
      model: Amenity,
      as: 'amenities',
      attributes: ['name']
    }
  });

  return formatVehicleData(createVehicle);
};

// update vehicle and amenity associated
const updateVehicleAmenity = async (vehicleId, newData, amenityIds) => {
  const vehicle = await Vehicle.findByPk(vehicleId);
  await vehicle.update(newData);
  await vehicle.setAmenities([]); // Elimina todas las asociaciones

  if (amenityIds && amenityIds.length > 0) {
    const promises = amenityIds.map(async (amenityId) => {
      const amenity = await Amenity.findByPk(amenityId);
      await vehicle.addAmenity(amenity);
    });
    await Promise.all(promises);
  }

  const updatedVehicle = await Vehicle.findByPk(vehicleId, {
    include: {
      model: Amenity,
      as: 'amenities',
      attributes: ['name']
    }
  });

  return formatVehicleData(updatedVehicle);
};

// delete vehicle and amenity by id
const deleteVehicleAmenity = async (vehicleId) => {
  const vehicle = await Vehicle.findByPk(vehicleId);
  if (vehicle) {
    await VehicleAmenity.destroy({ where: { vehicleId } });
    await Seat.destroy({ where: { vehicleId } });
    await Schedule.destroy({ where: { vehicleId } });
    await vehicle.destroy();
  }
  return;
};

module.exports = {
  getVehiclesAmenities,
  getVehicleById,
  getVehicleAmenityById,
  getVehicleByPlate,
  getVehicleAmenityByPlate,
  createVehicle,
  createVehicleAmenity,
  updateVehicleAmenity,
  deleteVehicleAmenity
};
