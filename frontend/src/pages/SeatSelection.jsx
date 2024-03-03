import Itinerary from '../components/Itinerary/Itinerary.jsx';
import Seats from '../components/Seats/Seats.jsx';
import PricesCard from '../components/PricesCard/PricesCard.jsx';
import BackButton from '../components/BackButton.jsx';
import ContinueButton from '../components/ContinueButton.jsx';
import { useSelector } from 'react-redux';
import Schedule from '../components/ChooseTravel/Schedule.jsx';
import { useFetchScheduleById } from '../hooks/useSchedules.js';
import { useQueryParams } from '../hooks/useQueryParams.js';
import { calculateArrivalTime } from '../utils/dateUtils.js';

function SeatSelection() {
  const seatQuantity = useSelector((state) => state.seat.seatQuantity);

  const queryParams = useQueryParams();

  const { data, isLoading, error } = useFetchScheduleById(
    queryParams.origin,
    queryParams.destination,
    queryParams.date,
    queryParams.scheduleId
  );

  if (data) {
    //formatting and calcs
    const calculatedArrivalTime = calculateArrivalTime(
      data.departureTime,
      data.route.duration
    );
    const formattedPrice = parseFloat(data.route.price).toString();

    return (
      <main className='flex px-10 justify-between pt-8 max-w-[1440px] mx-auto flex-col md:flex-row items-center'>
        <div className='md:flex flex-col justify-between items-center  hidden '>
          <Itinerary travelSelected={data} />
          <div className='mt-6'>
            <BackButton />
          </div>
        </div>
        <Seats tickets={seatQuantity} />
        <div className='flex flex-col justify-between items-center '>
          <PricesCard />
          <div className='md:hidden mt-2 '>
            <Schedule
              id={data.id}
              departureTime={data.departureTime}
              arrivalTime={calculatedArrivalTime}
              origin={queryParams.origin}
              destination={queryParams.destination}
              price={formattedPrice}
              duration={data.route.duration}
            />
          </div>

          <div className='hidden md:block mt-6'>
            <ContinueButton />
          </div>
        </div>
        <div className='flex justify-between mt-5 w-full  md:hidden'>
          <BackButton />
          <ContinueButton />
        </div>
      </main>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }
}

export default SeatSelection;
