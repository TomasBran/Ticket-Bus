import { useNavigate } from 'react-router-dom';
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
  passengers,
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
      staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
      onSuccess: () => {
        redirectToTicketPage(
          navigate,
          originCity,
          destinationCity,
          date,
          returnDate,
          passengers
        );
      },
      onError: (error) => {
        return error;
      }
    }
  );
}

// export function useFetchReturnSchedules({
//   originCity,
//   destinationCity,
//   date,
//   enabled
// }) {
//   // const navigate = useNavigate();
//   // const [searchParams] = useSearchParams();

//   return useQuery(
//     ['specificSchedule', originCity, destinationCity, date],
//     () => fetchSpecificSchedules(originCity, destinationCity, date),
//     {
//       retry: false,
//       enabled: enabled,
//       refetchOnWindowFocus: false,
//       staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
//       onSuccess: () => {},
//       onError: (error) => {
//         return error;
//       }
//     }
//   );
// }

export function useFetchScheduleById({ scheduleId, enabled }) {
  return useQuery(
    ['specificScheduleById', scheduleId],
    () => fetchSpecificScheduleById(scheduleId),
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

export function useFetchSchedulesWithoutRedirect({
  originCity,
  destinationCity,
  date,
  returnDate,
  enabled
}) {
  return useQuery(
    ['specificSchedule', originCity, destinationCity, date, returnDate],
    () => fetchSpecificSchedules(originCity, destinationCity, date, returnDate),
    {
      retry: false,
      enabled: enabled,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
      onSuccess: (data) => {
        console.log(data);
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
  returnDate,
  passengers
) {
  const newParams = {
    origin: originCity,
    destination: destinationCity,
    date: date,
    returnDate: returnDate,
    passengers: passengers
  };

  const newSearch = queryString.stringify(newParams);
  navigate(`/ticket?${newSearch}`);
}
