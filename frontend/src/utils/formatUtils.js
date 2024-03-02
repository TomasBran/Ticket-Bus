export function formatTime(timeString) {
  // Split the time string into hours, minutes, and seconds
  const [hours, minutes] = timeString.split(':');

  // Return the formatted time
  return `${hours}:${minutes}`;
}
