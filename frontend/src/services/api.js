export const API_LOCALHOST_URL = 'http://localhost:3000/api/v1';
export const API_DEPLOY_URL =
  'https://ticket-bus-api-dev.up.railway.app/api/v1';
export const API_DEPLOY_WS = 'wss://ticket-bus-api-dev.up.railway.app/ws/v1';
export const WEBSOCKET_LOCALHOST_URL = 'ws://localhost:3000/ws/v1';
export const REGISTER_URL = `${API_DEPLOY_URL}/auth/register`;
export const LOGIN_URL = `${API_DEPLOY_URL}/auth/login`;
export const ROUTES_URL = `${API_DEPLOY_URL}/routes`;
export const SCHEDULES_URL = `${API_LOCALHOST_URL}/schedules`;
export const TERMINALS_URL = `${API_DEPLOY_URL}/terminals`;
export const CITIES_URL = `${API_LOCALHOST_URL}/cities`;
export const WEBSOCKET_URL = `${WEBSOCKET_LOCALHOST_URL}/seats/schedule`;
