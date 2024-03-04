// Función para obtener la fecha actual en formato YYYY-MM-DD

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${day}`;
};

export const getUpcomingYears = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => {
    const year = currentYear + i;
    return { value: year.toString(), option: year.toString() };
  });
  return years;
};

export const formatDate = (dateString) => {
  // Split the date string into year, month, and day
  const [year, month, day] = dateString.split('-');
  // Create a new Date object without time
  const date = new Date(year, month - 1, day);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  // Use 'es-ES' locale and options to format the date
  let formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);

  // Capitalize the first letter of the formatted date
  formattedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return formattedDate;
};

export function formatTime(timeString) {
  // Split the time string into hours, minutes, and seconds
  const [hours, minutes] = timeString.split(':');

  // Return the formatted time
  return `${hours}:${minutes}`;
}

export function calculateArrivalTime(departureTime, duration) {
  // Convert departureTime and duration to seconds
  const [departureHours, departureMinutes] = departureTime
    .split(':')
    .map(Number);
  const [durationHours, durationMinutes] = duration.split(':').map(Number);
  const departureSeconds = departureHours * 3600 + departureMinutes * 60;
  const durationSeconds = durationHours * 3600 + durationMinutes * 60;

  // Calculate arrivalSeconds by adding durationSeconds to departureSeconds
  let arrivalSeconds = departureSeconds + durationSeconds;

  // If arrivalSeconds is greater than the number of seconds in a day, subtract the number of seconds in a day
  if (arrivalSeconds >= 86400) {
    arrivalSeconds -= 86400;
  }

  // Convert arrivalSeconds back to a time string
  const arrivalHours = Math.floor(arrivalSeconds / 3600);
  const arrivalMinutes = Math.floor((arrivalSeconds % 3600) / 60);
  const arrivalTime = `${arrivalHours.toString().padStart(2, '0')}:${arrivalMinutes.toString().padStart(2, '0')}`;

  return arrivalTime;
}

export function formatDuration(duration) {
  // Split the duration string into hours, minutes, and seconds
  const [hours, minutes] = duration.split(':');

  // Return the formatted duration
  return `${parseInt(hours)} hrs ${parseInt(minutes)} min`;
}

export function calculateTravelDates(
  departureDateString,
  departureTimeString,
  duration
) {
  // Create a new Date object for the departure date
  const [departureYear, departureMonth, departureDay] =
    departureDateString.split('-');
  const departureDate = new Date(
    departureYear,
    departureMonth - 1,
    departureDay
  );

  // Calculate the arrival time
  const arrivalTimeString = calculateArrivalTime(departureTimeString, duration);

  // If the arrival time is earlier than the departure time, add one day to the departure date
  if (arrivalTimeString < departureTimeString) {
    departureDate.setDate(departureDate.getDate() + 1);
  }

  // Format the departure and arrival dates
  const formattedDepartureDate = formatSpanishDate(departureDateString);
  const formattedArrivalDate = formatSpanishDate(
    departureDate.toISOString().split('T')[0]
  );

  return {
    departureDate: formattedDepartureDate,
    arrivalDate: formattedArrivalDate
  };
}

function formatSpanishDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  let formattedDate = date.toLocaleDateString('es-ES', options);

  // Split the string into an array ['weekday', 'day', 'de', 'month']
  let dateParts = formattedDate.split(' ');

  // Cut the first three letters of the weekday and month, and capitalize them
  dateParts[0] =
    dateParts[0].slice(0, 3).charAt(0).toUpperCase() + dateParts[0].slice(1, 3);
  dateParts[3] =
    dateParts[3].slice(0, 3).charAt(0).toUpperCase() + dateParts[3].slice(1, 3);

  // Join the parts back together into a string
  formattedDate = dateParts.join(' ');

  return formattedDate;
}
