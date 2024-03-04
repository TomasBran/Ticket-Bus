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
import { getScheduleTimeDetails } from '../utils/timeUtils.js';

function SeatSelection() {
  const seatQuantity = useSelector((state) => state.seat.seatQuantity);
  const queryParams = useQueryParams();
  const {
    data: departureSchedule,
    error: errorDepartureSchedule,
    isLoading: isLoadingDepartureSchedule
  } = useFetchScheduleById({
    scheduleId: queryParams.scheduleId,
    enabled: true
  });
  const isReturnDateEmpty = queryParams.searchParams.get('returnDate') === '';
  const {
    data: returnSchedule,
    error: errorReturnSchedule,
    isLoading: isLoadingReturnSchedule
  } = useFetchScheduleById({
    scheduleId: queryParams.returnScheduleId,
    enabled: !isReturnDateEmpty
  });

  if (isLoadingDepartureSchedule || isLoadingReturnSchedule) {
    return <div>Loading...</div>;
  }

  if (errorDepartureSchedule || errorReturnSchedule) {
    return <div>Error</div>;
  }

  let departureTimeDetails = departureSchedule
    ? getScheduleTimeDetails(departureSchedule, queryParams.date)
    : null;
  let formattedPriceDeparture = departureSchedule
    ? parseFloat(departureSchedule.route.price).toString()
    : null;

  let calculatedArrivalTimeDeparture = null;
  if (
    departureSchedule &&
    departureSchedule.departureTime &&
    departureSchedule.route.duration
  ) {
    calculatedArrivalTimeDeparture = calculateArrivalTime(
      departureSchedule.departureTime,
      departureSchedule.route.duration
    );
  }

  let returnTimeDetails = returnSchedule
    ? getScheduleTimeDetails(returnSchedule, queryParams.date)
    : null;
  let formattedPriceReturn = returnSchedule
    ? parseFloat(returnSchedule.route.price).toString()
    : null;

  let calculatedArrivalTimeReturn = null;
  if (
    returnSchedule &&
    returnSchedule.departureTime &&
    returnSchedule.route.duration
  ) {
    calculatedArrivalTimeReturn = calculateArrivalTime(
      returnSchedule.departureTime,
      returnSchedule.route.duration
    );
  }

  console.log(calculatedArrivalTimeReturn);
  console.log(calculatedArrivalTimeDeparture);
  return (
    <main className='flex px-10 justify-between pt-8 max-w-[1440px] mx-auto flex-col md:flex-row items-center'>
      <div className='md:flex flex-col justify-between items-center hidden'>
        {departureSchedule && calculatedArrivalTimeDeparture && (
          <Itinerary
            departureTime={departureTimeDetails.formattedDepartureTime}
            origin={queryParams.destination}
            arrivalTime={calculatedArrivalTimeDeparture}
            destination={queryParams.origin}
            typeOfTravel={'Viaje de Ida'}
            price={formattedPriceDeparture}
            duration={departureSchedule.route.duration}
            departureDay={departureTimeDetails.departureDate}
            arrivalDay={departureTimeDetails.arrivalDate}
          />
        )}
        {returnSchedule && calculatedArrivalTimeReturn && (
          <Itinerary
            departureTime={returnTimeDetails.formattedDepartureTime}
            origin={queryParams.destination}
            arrivalTime={calculatedArrivalTimeReturn}
            destination={queryParams.origin}
            typeOfTravel={'Viaje de Regreso'}
            price={formattedPriceReturn}
            duration={departureSchedule.route.duration}
            departureDay={returnTimeDetails.departureDate}
            arrivalDay={returnTimeDetails.arrivalDate}
          />
        )}
        <div className='mt-6'>
          <BackButton />
        </div>
      </div>
      <Seats tickets={seatQuantity} />
      <div className='flex flex-col justify-between items-center'>
        <PricesCard />
        <div className='md:hidden mt-2'>
          <Schedule
            id={departureSchedule.id}
            departureTime={departureSchedule.departureTime}
            arrivalTime={calculatedArrivalTimeDeparture}
            origin={queryParams.origin}
            destination={queryParams.destination}
            price={formattedPriceDeparture}
            duration={departureSchedule.route.duration}
          />
        </div>
        <div className='hidden md:block mt-6'>
          <ContinueButton text='Continuar' />
        </div>
      </div>
      <div className='flex justify-between mt-5 w-full md:hidden'>
        <BackButton />
        <ContinueButton text='Continuar' />
      </div>
    </main>
  );
}
export default SeatSelection;
