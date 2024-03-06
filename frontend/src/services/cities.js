import { CITIES_URL } from './api.js';

export async function fetchCities() {
  const response = await fetch(CITIES_URL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  const cities = data.body.cities.map((city) => city.name);
  return cities;
}
