import Itinerary from '../../components/Itinerary/Itinerary.jsx';
import Seats from '../../components/Seats/Seats.jsx';
import PricesCard from '../../components/PricesCard/PricesCard.jsx';
import BackButton from '../../components/BackButton.jsx';
import ContinueButton from '../../components/ContinueButton.jsx';
import { useSelector } from 'react-redux';
import Schedule from '../../components/ChooseTravel/Schedule.jsx';
import { useFetchScheduleById } from '../../hooks/useSchedules.js';
import { useQueryParams } from '../../hooks/useQueryParams.js';
import { calculateArrivalTime } from '../../utils/dateUtils.js';
import { getScheduleTimeDetails } from '../../utils/timeUtils.js';
import { useInitializeStateFromUrl } from '../../hooks/useInitializeStateFromUrl.js';

function SeatSelection() {
  useInitializeStateFromUrl(true);
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
    <div className='bg-background-light flex-grow w-full relative'>
      <div className='h-full mx-auto lg:max-w-screen-xl p-4 overflow-hidden'>
        <div className='grid lg:grid-cols-4 md:grid-cols-5 sm:grid-cols-5 grid-cols-1 h-full lg:gap-4 gap-2 mx-auto relative'>
          {/* Columna 1 */}
          <div className='lg:col-span-1 hidden md:block md:col-span-2 sm:col-span-2 col-span-1 relative order-2 sm:order-1'>
            {departureSchedule && calculatedArrivalTimeDeparture && (
              <Itinerary
                departureTime={departureTimeDetails.formattedDepartureTime}
                origin={queryParams.origin}
                arrivalTime={calculatedArrivalTimeDeparture}
                destination={queryParams.destination}
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
            <div className='hidden sm:block absolute mt-5 left-1/2 transform -translate-x-1/2 bottom-md'>
              <BackButton />
            </div>
          </div>

          {/* Columna 2 */}
          <div className='lg:col-span-2 md:col-span-2 sm:col-span-2 mx-auto col-span-1 relative order-1 md:order-2'>
            <Seats tickets={seatQuantity} />
          </div>

          {/* Columna 3 */}
          <div className='md:col-span-1 sm:col-span-1 col-span-1 relative order-last'>
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

            <div className='hidden sm:block absolute mt-5 left-1/2 transform -translate-x-1/2 bottom-md'>
              <ContinueButton text='Continuar' />
            </div>

            <div className='flex justify-between mt-5 w-full md:hidden'>
              <BackButton />
              <ContinueButton text='Continuar' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SeatSelection;
