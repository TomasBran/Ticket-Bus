const getArrivalTime = (departureTime, duration) => {
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  const departure = new Date();
  const [depHours, depMinutes, depSeconds] = departureTime
    .split(':')
    .map(Number);
  departure.setHours(depHours, depMinutes, depSeconds, 0);

  // Sumar la duración
  departure.setHours(departure.getHours() + hours);
  departure.setMinutes(departure.getMinutes() + minutes);
  departure.setSeconds(departure.getSeconds() + seconds);

  // Formatea el tiempo de llegada a una cadena "HH:MM:SS"
  const arrivalTime = departure.toTimeString().split(' ')[0];

  return arrivalTime;
};

module.exports = getArrivalTime;
