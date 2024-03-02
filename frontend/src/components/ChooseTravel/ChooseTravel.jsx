import bus from '../../assets/bus-icon.svg';
import arrow from '../../assets/arrow.svg';
import Schedule from './Schedule';
import BackButton from '../BackButton';
import ContinueButton from '../ContinueButton';
import { useFetchSchedules } from '../../hooks/useSchedules';
import { formatDate } from '../../utils/dateUtils';
import { formatTime } from '../../utils/formatUtils';
import { useLocation } from 'react-router-dom';

export default function ChooseTravel() {
  const location = useLocation();

  // reads from searchParams to make the fetch, this is a way of
  // retaining the information through refreshes in a way that
  // doesn't use redux or localStorage for server side things, which avoids data duplication and issues with sync

  let queryParams = new URLSearchParams(location.search);
  queryParams = {
    origin: queryParams.get('origin'),
    destination: queryParams.get('destination'),
    date: queryParams.get('date')
  };

  const {
    data: schedules,
    error: errorSchedule,
    isLoading: isLoadingSchedule
  } = useFetchSchedules(
    queryParams.origin,
    queryParams.destination,
    queryParams.date
  );

  // format to look like design
  console.log(queryParams);
  const formattedDate = formatDate(queryParams.date);

  if (isLoadingSchedule) {
    return <div>Loading...</div>;
  }

  if (errorSchedule) {
    return <div>Error: {errorSchedule.message}</div>;
  }

  return (
    <div className='flex items-center justify-evenly lg:flex-row flex-col md:mx-0 mx-2 mt-6'>
      <div className='lg:w-2/5 w-full'>
        <div className='flex my-7'>
          <img src={bus} alt='' className='mr-5' />
          <div>
            <h2 className='font-bold text-xl tracking-tight'>
              Elige tu viaje de ida
            </h2>
            <p className='flex gap-4 justify-center text-[#486284] font-medium'>
              {queryParams.origin} <img src={arrow} alt='' />{' '}
              {queryParams.destination}
            </p>
          </div>
        </div>

        <div>
          <p className='font-semibold text-xl mb-4'>{formattedDate}</p>
          {schedules.map((schedule, index) => {
            const formattedDepartureTime = formatTime(schedule.departureTime);
            return (
              <Schedule
                key={index}
                id={schedule.id}
                departure={formattedDepartureTime}
                arrival={'00:00'}
                origin={queryParams.origin}
                destination={queryParams.destination}
                price={schedule.cost}
              />
            );
          })}
        </div>
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
