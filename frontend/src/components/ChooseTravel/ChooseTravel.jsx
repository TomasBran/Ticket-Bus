import BackButton from '../BackButton';
import ContinueButton from '../ContinueButton';
import {
  useFetchReturnSchedules,
  useFetchSchedules
} from '../../hooks/useSchedules';
import { formatDate } from '../../utils/dateUtils';
import { useQueryParams } from '../../hooks/useQueryParams';
import ScheduleList from './ScheduleList';

export default function ChooseTravel() {
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
  } = useFetchSchedules({
    originCity: queryParams.origin,
    destinationCity: queryParams.destination,
    date: queryParams.date,
    returnDate: queryParams.returnDate, // Add this line
    enabled: true
  });

  const isReturnDateEmpty = queryParams.searchParams.get('returnDate') === '';
  console.log(isReturnDateEmpty);

  // Fetch the return schedules if a return date is specified
  const {
    data: returnSchedules,
    error: errorReturnSchedules,
    isLoading: isLoadingReturnSchedules
  } = useFetchReturnSchedules({
    originCity: queryParams.destination,
    destinationCity: queryParams.origin,
    date: queryParams.returnDate,
    // If ReturnDate is empty then don't fetch ReturnSchedules
    enabled: !isReturnDateEmpty
  });

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
    <div className='flex items-center justify-evenly lg:flex-row flex-col md:mx-0 mx-2 mt-6'>
      <div className='lg:w-2/5 w-full'>
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
          <ContinueButton />
        </div>
      </div>
      <div className='lg:w-2/5 w-full'>
        <img
          className='lg:block hidden w-[497px] h-96'
          src='https://s3-alpha-sig.figma.com/img/6d53/1eb5/fa7d270debbd2fcce88a2c006bcb78b2?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lLft49JTHBw3aiCBlNZ8obZBtDJ694GkU56xxQ5zqdTDGkID0q8ImY8C5HyfXWxnGFOtCrWbW8iCVchyYTtN8akI4QbwKwoU1yUAKpNzXfboHRVOhD2JJFyfmzEhoU3mOT0f20o-Iq8QDX-4eFexFYL1Shmkv6sNM03Codv1PN4AkpT-IOg9gAB7P55KQ~tw5jS7PzIHdfpLOacitdhkPKAku60jMQuVZ1rJLmRzMeHOh~KnG2aWt~J6vwSB1GIUf-JfgIaWnXUi9P4Dnh7JC8HYpLYvA9Snk4wVZZDGlUcH1UNWkdyF7o1X3ixmrqpI8WlcGug8IZfq6IZtvA6GSA__'
          alt=''
        />
      </div>
    </div>
  );
}
