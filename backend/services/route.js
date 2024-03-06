const {
  Route,
  Terminal,
  Schedule,
  Vehicle,
  City
} = require('../database/models');
const getArrivalTime = require('../helpers/getArrivalTime');

// Obtener todas las rutas
const getAll = async () => {
  const routes = await Route.findAll({
    attributes: { exclude: ['originId', 'destinationId'] },
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
      },
      {
        model: Schedule,
        as: 'schedules',
        attributes: { exclude: ['routeId', 'vehicleId'] },
        include: {
          model: Vehicle,
          as: 'vehicles',
          exclude: ['routeId', 'vehicleId']
        },
        order: [['departureTime', 'ASC']]
      }
    ]
  });

  routes.forEach((route) => {
    route.schedules.forEach((schedule) => {
      schedule.setDataValue(
        'arrivalTime',
        getArrivalTime(schedule.departureTime, route.duration)
      );
    });
  });

  return routes;
};

// Obtener una ruta por su id
const getById = async (id) => {
  const route = await Route.findByPk(id, {
    attributes: { exclude: ['originId', 'destinationId'] },
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
      },
      {
        model: Schedule,
        as: 'schedules',
        attributes: { exclude: ['routeId', 'vehicleId'] },
        include: {
          model: Vehicle,
          as: 'vehicles',
          exclude: ['routeId', 'vehicleId']
        },
        order: [['departureTime', 'ASC']]
      }
    ]
  });

  if (route) {
    route.schedules.forEach((schedule) => {
      schedule.setDataValue(
        'arrivalTime',
        getArrivalTime(schedule.departureTime, route.duration)
      );
    });
  }

  return route;
};

// Crear una ruta
const create = async (route) => {
  return await Route.create(route);
};

// Actualizar una ruta
const update = async (id, route) => {
  return await Route.update(route, {
    where: { id },
    returning: true,
    plain: true
  });
};

// Eliminar una ruta
const remove = async (id) => {
  return await Route.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
