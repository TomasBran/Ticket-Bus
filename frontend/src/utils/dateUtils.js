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
