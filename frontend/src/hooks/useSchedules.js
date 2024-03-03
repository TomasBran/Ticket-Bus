import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  fetchSpecificSchedules,
  fetchSpecificScheduleById
} from '../services/schedules.js';
import queryString from 'query-string';

export function useFetchSchedules(originCity, destinationCity, date, enabled) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return useQuery(
    ['specificSchedule', originCity, destinationCity, date],
    () => fetchSpecificSchedules(originCity, destinationCity, date),
    {
      retry: false,
      enabled: enabled,
      refetchOnWindowFocus: false,
      onSuccess: () => {
        // Create an object with the new search parameters
        const newParams = {
          origin: originCity,
          destination: destinationCity,
          date: date,
          scheduleId: searchParams.has('scheduleId')
            ? searchParams.get('scheduleId') // Use get method to retrieve the value
            : ''
        };

        // Stringify the params object back into a query string
        const newSearch = queryString.stringify(newParams);

        // Navigate to "/ticket" when the query is successful
        navigate(`/ticket?${newSearch}`);
      },
      onError: (error) => {
        return error;
      }
    }
  );
}

export function useFetchScheduleById(
  originCity,
  destinationCity,
  date,
  scheduleId,
  enabled
) {
  const [, setSearchParams] = useSearchParams();

  return useQuery(
    ['specificScheduleById', originCity, destinationCity, date, scheduleId],
    () =>
      fetchSpecificScheduleById(originCity, destinationCity, date, scheduleId),
    {
      retry: false,
      enabled: enabled,
      refetchOnWindowFocus: false,
      onSuccess: () => {
        // Parse the current search params into an object
        const params = queryString.parse(window.location.search);

        // Update the search params in the URL
        setSearchParams(params);
      },
      onError: (error) => {
        return error;
      }
    }
  );
}
