import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  fetchSpecificSchedules,
  fetchSpecificScheduleById
} from '../services/schedules.js';
import queryString from 'query-string';

export function useFetchSchedules({
  originCity,
  destinationCity,
  date,
  returnDate,
  enabled
}) {
  const navigate = useNavigate();
  return useQuery(
    ['specificSchedule', originCity, destinationCity, date, returnDate],
    () => fetchSpecificSchedules(originCity, destinationCity, date, returnDate),
    {
      retry: false,
      enabled: enabled,
      refetchOnWindowFocus: false,
      onSuccess: () => {
        redirectToTicketPage(
          navigate,
          originCity,
          destinationCity,
          date,
          returnDate
        );
      },
      onError: (error) => {
        return error;
      }
    }
  );
}

export function useFetchReturnSchedules({
  originCity,
  destinationCity,
  date,
  enabled
}) {
  // const navigate = useNavigate();
  // const [searchParams] = useSearchParams();

  return useQuery(
    ['specificSchedule', originCity, destinationCity, date],
    () => fetchSpecificSchedules(originCity, destinationCity, date),
    {
      retry: false,
      enabled: enabled,
      refetchOnWindowFocus: false,
      onSuccess: () => {},
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

function redirectToTicketPage(
  navigate,
  originCity,
  destinationCity,
  date,
  returnDate
) {
  const newParams = {
    origin: originCity,
    destination: destinationCity,
    date: date,
    returnDate: returnDate
  };

  const newSearch = queryString.stringify(newParams);
  navigate(`/ticket?${newSearch}`);
}
