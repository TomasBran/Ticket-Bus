// services/Routes.js

import { ROUTES_URL } from './api';

export async function fetchRoutes() {
  const response = await fetch(ROUTES_URL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not fetch routes');
  }

  return data;
}

export async function createRoute(newRouteData) {
  const apiUrl = ROUTES_URL;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newRouteData)
  });

  if (!response.ok) {
    throw new Error('Could not create route');
  }

  return response.json();
}
