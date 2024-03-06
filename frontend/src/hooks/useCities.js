import { useQuery } from 'react-query';
import { fetchCities } from '../services/cities';

export function useCities(setCityOptions, setErrorMessage) {
  return useQuery('cities', fetchCities, {
    onSuccess: (data) => {
      setCityOptions(data);
    },
    onError: (error) => {
      setErrorMessage(error);
    }
  });
}
