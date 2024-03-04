const {
  Ticket,
  BlockedSeat,
  Seat,
  Schedule,
  Vehicle
} = require('../database/models');

const getSeatsByScheduleId = async (id, date) => {
  const purchasedSeats = await Ticket.findAll({
    where: {
      scheduleId: id,
      departureDate: new Date(date)
    }
  });

  let purchasedSeatsIds = [];

  if (purchasedSeats) {
    purchasedSeatsIds = purchasedSeats.map((s) => s.seatId);
  }

  const blockedSeats = await BlockedSeat.findAll({
    where: {
      scheduleId: id,
      date: new Date(date)
    }
  });

  let blockedSeatsIds = [];

  if (blockedSeats) {
    blockedSeatsIds = blockedSeats.map((s) => s.seatId);
  }

  const lockedSeats = [...purchasedSeatsIds, ...blockedSeatsIds];

  const { vehicleId } = await Schedule.findOne({
    where: {
      id
    },
    attributes: ['vehicleId']
  });

  const seats = await Seat.findAll({
    include: [
      {
        model: Vehicle,
        as: 'vehicle',
        where: {
          id: vehicleId
        }
      }
    ]
  });

  const availableSeats = seats.map((s) => {
    if (lockedSeats.includes(s.id)) {
      return {
        number: s.number,
        id: s.id,
        status: 'locked'
      };
    } else {
      return {
        number: s.number,
        id: s.id,
        status: 'free'
      };
    }
  });

  return availableSeats;
};

const toggleSeatState = async (seatId, scheduleId, date) => {
  const checkSeatExists = await BlockedSeat.findOne({
    where: {
      seatId
    }
  });

  if (checkSeatExists) {
    await BlockedSeat.destroy({
      where: {
        seatId
      }
    });
  } else {
    await BlockedSeat.create({
      seatId,
      scheduleId,
      date
    });
    console.log('Seat locked');
    setTimeout(async () => {
      await BlockedSeat.destroy({
        where: {
          seatId
        }
      });
      console.log('Seat unlocked');
    }, 20 * 1000);
    //TODO Añadir 5 minutos al setTimeout
  }
};

module.exports = {
  getSeatsByScheduleId,
  toggleSeatState
};
