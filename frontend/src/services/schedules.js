import { SCHEDULES_URL } from './api.js';

export async function fetchSpecificSchedules(
  originCity,
  destinationCity,
  date
) {
  const url = new URL(SCHEDULES_URL);
  url.searchParams.append('originCity', originCity);
  url.searchParams.append('destinationCity', destinationCity);
  url.searchParams.append('date', date);

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.body;
}

export async function fetchSpecificScheduleById(
  originCity,
  destinationCity,
  date,
  scheduleId
) {
  const url = new URL(`${SCHEDULES_URL}/id/${scheduleId}`);
  url.searchParams.append('originCity', originCity);
  url.searchParams.append('destinationCity', destinationCity);
  url.searchParams.append('date', date);

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.body;
}
