import BackButton from '../BackButton';
import ContinueButton from '../ContinueButton';
import { useFetchSchedulesWithoutRedirect } from '../../hooks/useSchedules';
import { formatDate } from '../../utils/dateUtils';
import { useQueryParams } from '../../hooks/useQueryParams';
import ScheduleList from './ScheduleList';
import { useInitializeStateFromUrl } from '../../hooks/useInitializeStateFromUrl';
import MapRoute from '../MapRoute/MapRoute';
import { useMemo } from 'react';

export default function ChooseTravel() {
  useInitializeStateFromUrl(false);

  // reads from URL Params to make the fetch, this is a way of
  // retaining the information through refreshes in a way that
  // doesn't use redux or localStorage for server side things, which avoids data duplication and issues with sync
  const queryParams = useQueryParams();
  console.log(queryParams.origin);

  // Fetch the departure schedules
  const {
    data: departureSchedules,
    error: errorDepartureSchedules,
    isLoading: isLoadingDepartureSchedules
  } = useFetchSchedulesWithoutRedirect({
    originCity: queryParams.origin,
    destinationCity: queryParams.destination,
    date: queryParams.date,
    returnDate: queryParams.returnDate,
    enabled: true
  });

  // Fetch the return schedules if a return date is specified
  const isReturnDateEmpty = queryParams.searchParams.get('returnDate') === '';
  const {
    data: returnSchedules,
    error: errorReturnSchedules,
    isLoading: isLoadingReturnSchedules
  } = useFetchSchedulesWithoutRedirect({
    originCity: queryParams.destination,
    destinationCity: queryParams.origin,
    date: queryParams.returnDate,
    // If ReturnDate is empty then don't fetch ReturnSchedules
    enabled: !isReturnDateEmpty
  });

  // stop re-rendering of mapbox
  const origin = useMemo(() => {
    if (departureSchedules && departureSchedules.length > 0) {
      return [
        departureSchedules[0].route.originTerminal.lon,
        departureSchedules[0].route.originTerminal.lat
      ];
    }
    return null;
  }, [departureSchedules]);

  const destination = useMemo(() => {
    if (departureSchedules && departureSchedules.length > 0) {
      return [
        departureSchedules[0].route.destinationTerminal.lon,
        departureSchedules[0].route.destinationTerminal.lat
      ];
    }
    return null;
  }, [departureSchedules]);

  // formatting
  const formattedDate = formatDate(queryParams.date);
  let formattedReturnDate;
  if (!isReturnDateEmpty) {
    formattedReturnDate = formatDate(queryParams.returnDate);
  }

  // TODO: make real loading modals/placeholders
  if (isLoadingDepartureSchedules) {
    return <div>Loading...</div>;
  }

  if (isLoadingReturnSchedules) {
    return <div>Loading...</div>;
  }

  if (errorDepartureSchedules) {
    return <div>Error: {errorDepartureSchedules.message}</div>;
  }

  return (
    <div className='bg-background-light flex-grow w-full relative'>
      <div className='h-full mx-auto lg:max-w-screen-xl p-4 overflow-hidden'>
        <div className='flex items-center justify-between gap-12  md:flex-row flex-col md:mx-0 mx-2 mt-6'>
          <div className=' w-full md:w-3/5'>
            <ScheduleList
              title='Elige tu viaje de ida'
              origin={queryParams.origin}
              destination={queryParams.destination}
              formattedDate={formattedDate}
              schedules={departureSchedules}
              isReturn={false}
              isLoading={isLoadingDepartureSchedules}
              error={errorDepartureSchedules}
            />

            <ScheduleList
              title='Elige tu viaje de vuelta'
              origin={queryParams.destination}
              destination={queryParams.origin}
              formattedDate={formattedReturnDate}
              schedules={returnSchedules}
              isReturn={true}
              isLoading={isLoadingReturnSchedules}
              error={errorReturnSchedules}
            />

            <div className='flex justify-between mt-5'>
              <BackButton />
              <ContinueButton text='Continuar' />
            </div>
          </div>
          <div className='lg:w-2/5 w-full'>
            {/* Actualizar para obtener las coordenadas del store segun la ruta seleccionada [latitud, longitud] */}
            <MapRoute origin={origin} destination={destination} />
          </div>
          {/* departureSchedules[0].route.originTerminal.lat, departureSchedules[0].route.originTerminal.lon  */}
          {/* departureSchedules[0].route.destinationTerminal.lat, departureSchedules[0].route.destinationTerminal.lon  */}
        </div>
      </div>
    </div>
  );
}
