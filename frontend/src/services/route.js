import { ROUTES_URL } from './api';

export async function fetchRoutes() {
  const response = await fetch(ROUTES_URL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  console.log(data.body);

  // Return the routes
  return data.body.routes;
}
