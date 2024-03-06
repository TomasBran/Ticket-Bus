import { TERMINALS_URL } from './api';

export async function fetchTerminals() {
  const response = await fetch(TERMINALS_URL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Could not fetch Terminals');
  }

  return data;
}

export async function createTerminal(newTerminalData) {
  const apiUrl = TERMINALS_URL;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTerminalData)
  });

  if (!response.ok) {
    throw new Error('Could not create route');
  }

  return response.json();
}
