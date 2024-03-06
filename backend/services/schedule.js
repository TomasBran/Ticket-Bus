
const { Schedule } = require('../database/models');
const {
  Route,
  Vehicle,
  Amenity,
  Terminal,
  City
} = require('../database/models');
const { getDayName } = require('../helpers/getDayName');
const getArrivalTime = require('../helpers/getArrivalTime');

// Obtener todos los horarios
const getAll = async () => {
  return await Schedule.findAll({ include: { all: true, nested: false } });
};

// Obtener un horario por su id
const getById = async (id) => {
  const schedule = await Schedule.findByPk(id, {
    include: [
      {
        model: Route,
        as: 'route',
        include: [
          {
            model: Terminal,
            as: 'originTerminal',
            attributes: { exclude: ['cityId'] },
            include: { model: City, as: 'city' }
          },
          {
            model: Terminal,
            as: 'destinationTerminal',
            attributes: { exclude: ['cityId'] },
            include: { model: City, as: 'city' }
          }
        ],
        attributes: { exclude: ['originId', 'destinationId'] }
      },
      {
        model: Vehicle,
        as: 'vehicles',
        attributes: { exclude: ['routeId', 'vehicleId'] },
        exclude: ['routeId', 'vehicleId'],
        include: {
          model: Amenity,
          as: 'amenities',
          attributes: { include: ['name'] }
        }
      }
    ]
  });

  if (schedule) {
    const scheduleJSON = schedule.toJSON();

    scheduleJSON.arrivalTime = getArrivalTime(
      schedule.departureTime,
      schedule.route.duration
    );

    if (
      scheduleJSON.vehicles &&
      Array.isArray(scheduleJSON.vehicles.amenities)
    ) {
      scheduleJSON.vehicles.amenities = scheduleJSON.vehicles.amenities.map(
        (amenity) => amenity.name
      );
    } else if (scheduleJSON.vehicles) {
      // Si 'vehicles' es un objeto y no un array, asumimos que cada horario tiene un solo vehículo
      scheduleJSON.vehicles.amenities = scheduleJSON.vehicles.amenities.map(
        (amenity) => amenity.name
      );
    }

    return scheduleJSON; // Devuelve el objeto JSON modificado, no la instancia de Sequelize
  }

  return schedule;
};

// Obtener un horario según origen-destino
const getAvailableSchedules = async (
  originCityName,
  destinationCityName,
  date
) => {
  // Convert date string to a Date object
  const searchDate = new Date(date);
  // Determine the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = searchDate.getDay();
  // Get the terminals for origin city.
  const originTerminals = await Terminal.findAll({
    include: [
      {
        model: City,
        as: 'city',
        where: {
          // Filter by origin and destination terminals
          name: originCityName
        }
      }
    ]
  });
  // get the terminals for destination city
  const destinationTerminals = await Terminal.findAll({
    include: [
      {
        model: City,
        as: 'city',
        where: {
          // Filter by origin and destination terminals
          name: destinationCityName
        }
      }
    ]
  });

  // Get all routes with origin and destination terminal IDs
  const routes = await Route.findAll({
    where: {
      originId: originTerminals.map((term) => term.id),
      destinationId: destinationTerminals.map((term) => term.id)
    }
  });

  // Extract route IDs from the found routes
  const routeIds = routes.map((route) => route.id);

  // Get schedules for the extracted route IDs and given day of the week
  const schedules = await Schedule.findAll({
    include: [
      {
        model: Route,
        as: 'route',
        include: [
          {
            model: Terminal,
            as: 'originTerminal',
            attributes: { exclude: ['cityId'] },
            include: { model: City, as: 'city' }
          },
          {
            model: Terminal,
            as: 'destinationTerminal',
            attributes: { exclude: ['cityId'] },
            include: { model: City, as: 'city' }
          }
        ],
        attributes: { exclude: ['originId', 'destinationId'] }
      },
      {
        model: Vehicle,
        as: 'vehicles',
        attributes: { exclude: ['routeId', 'vehicleId'] },
        include: {
          model: Amenity,
          as: 'amenities',
          attributes: { include: ['name'] }
        }
      }
    ],
    where: {
      routeId: routeIds,
      day: getDayName(dayOfWeek)
    }
  });
  schedules.forEach((schedule) => {
    schedule.setDataValue(
      'arrivalTime',
      getArrivalTime(schedule.departureTime, schedule.route.duration)
    );
  });

  const processedSchedules = schedules.map((schedule) => {
    const scheduleJSON = schedule.toJSON();
    if (scheduleJSON.vehicles && scheduleJSON.vehicles.amenities) {
      // Transforma los amenities a un array de nombres
      scheduleJSON.vehicles.amenities = scheduleJSON.vehicles.amenities.map(
        (amenity) => amenity.name
      );
    }
    return scheduleJSON;
  });

  return processedSchedules;
};

// Crear un horario
const create = async (schedule) => {
  return await Schedule.create(schedule);
};

// Actualizar un horario
const update = async (id, schedule) => {
  return await Schedule.update(schedule, {
    where: { id },
    returning: true,
    plain: true
  });
};

// Eliminar un horario
const remove = async (id) => {
  return await Schedule.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  getAvailableSchedules,
  create,
  update,
  remove
};
