import { useQuery } from 'react-query';
import { fetchRoutes } from '../services/route.js';

export function useRoutes(setRoutes, setError) {
  return useQuery('routes', fetchRoutes, {
    onSuccess: (data) => {
      setRoutes(data);
    },
    onError: (error) => {
      setError(error.message);
    }
  });
}
