import {
  calculateArrivalTime,
  calculateTravelDates,
  formatTime
} from './dateUtils';

export function getScheduleTimeDetails(schedule, date) {
  if (!schedule || !schedule.route) {
    return null;
  }

  const departureTime = schedule.departureTime;
  const duration = schedule.route.duration;

  const calculatedArrivalTime = calculateArrivalTime(departureTime, duration);
  const travelDates = calculateTravelDates(date, departureTime, duration);

  return {
    formattedDepartureTime: formatTime(departureTime),
    departureDate: travelDates.departureDate,
    arrivalDate: travelDates.arrivalDate,
    calculatedArrivalTime
  };
}
