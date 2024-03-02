import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { fetchSpecificSchedules } from '../services/schedules.js';
import { useDispatch } from 'react-redux';
import { setQueryParams } from '../store/QueryParams/queryParamsActions.js';

export function useFetchSchedules(originCity, destinationCity, date, enabled) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return useQuery(
    ['specificSchedule', originCity, destinationCity, date],
    () => fetchSpecificSchedules(originCity, destinationCity, date),
    {
      retry: false,
      enabled: enabled,
      onSuccess: () => {
        // Navigate to "/ticket" when the query is successful
        dispatch(
          setQueryParams({
            origin: originCity,
            destination: destinationCity,
            date
          })
        );
        navigate(
          `/ticket?origin=${originCity}&destination=${destinationCity}&date=${date}`
        );
      },
      onError: (error) => {
        return error;
      }
    }
  );
}

// TODO: idea is to use a fetch by ID here for a certain schedule, but gotta have an endpoint avaliable
export function useFetchScheduleTemp(
  originCity,
  destinationCity,
  date,
  enabled
) {
  const dispatch = useDispatch();

  return useQuery(
    ['specificSchedule', originCity, destinationCity, date],
    () => fetchSpecificSchedules(originCity, destinationCity, date),
    {
      retry: false,
      enabled: enabled,
      onSuccess: () => {
        dispatch(
          setQueryParams({
            origin: originCity,
            destination: destinationCity,
            date
          })
        );
      },
      onError: (error) => {
        return error;
      }
    }
  );
}
