export const createMessage = (scheduleId, date, seatId, type) => {
  return JSON.stringify({
    scheduleId: scheduleId,
    date: date,
    seatId: seatId,
    type: type
  });
};
