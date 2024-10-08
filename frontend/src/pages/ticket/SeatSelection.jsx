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
  const isSelectingReturnSeats = useSelector(
    (state) => state.seat.isSelectingReturnSeats
  );
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

  const currentSchedule = isSelectingReturnSeats
    ? returnSchedule
    : departureSchedule;
  const currentTimeDetails = isSelectingReturnSeats
    ? returnTimeDetails
    : departureTimeDetails;
  const calculatedArrivalTime = isSelectingReturnSeats
    ? calculatedArrivalTimeReturn
    : calculatedArrivalTimeDeparture;
  const formattedPrice = isSelectingReturnSeats
    ? formattedPriceReturn
    : formattedPriceDeparture;

  console.log(calculatedArrivalTimeReturn);
  console.log(calculatedArrivalTimeDeparture);
  return (
    <div className='bg-background-light flex-grow w-full relative'>
      <div className='h-full mx-auto lg:max-w-screen-xl p-4 overflow-hidden'>
        <div className='grid lg:grid-cols-4 md:grid-cols-5 sm:grid-cols-5 grid-cols-1 h-full lg:gap-4 gap-2 mx-auto relative'>
          {/* Columna 1 */}
          <div className='lg:col-span-1 hidden md:block md:col-span-2 sm:col-span-2 col-span-1 relative order-2 sm:order-1'>
            {currentSchedule && calculatedArrivalTime && (
              <Itinerary
                departureTime={currentTimeDetails.formattedDepartureTime}
                origin={
                  isSelectingReturnSeats
                    ? queryParams.destination
                    : queryParams.origin
                }
                arrivalTime={calculatedArrivalTime}
                destination={
                  isSelectingReturnSeats
                    ? queryParams.origin
                    : queryParams.destination
                }
                typeOfTravel={
                  isSelectingReturnSeats ? 'Viaje de Regreso' : 'Viaje de Ida'
                }
                price={formattedPrice}
                duration={currentSchedule.route.duration}
                departureDay={currentTimeDetails.departureDate}
                arrivalDay={currentTimeDetails.arrivalDate}
              />
            )}
            <div className='hidden sm:block absolute mt-5 left-1/2 transform -translate-x-1/2 bottom-md'>
              <BackButton />
            </div>
          </div>

          {/* Columna 2 */}
          <div className='lg:col-span-2 md:col-span-2 sm:col-span-2 mx-auto col-span-1 relative order-1 md:order-2'>
            <Seats
              tickets={seatQuantity}
              scheduleId={
                isSelectingReturnSeats
                  ? queryParams.returnScheduleId
                  : queryParams.scheduleId
              }
              date={
                isSelectingReturnSeats
                  ? queryParams.returnDate
                  : queryParams.date
              }
              isSelectingReturnSeats={isSelectingReturnSeats}
            />
          </div>

          {/* Columna 3 */}
          <div className='md:col-span-1 sm:col-span-1 col-span-1 relative order-last'>
            <PricesCard />
            <div className='md:hidden mt-2'>
              <Schedule
                id={currentSchedule.id}
                departureTime={currentSchedule.departureTime}
                arrivalTime={calculatedArrivalTime}
                origin={
                  isSelectingReturnSeats
                    ? queryParams.destination
                    : queryParams.origin
                }
                destination={
                  isSelectingReturnSeats
                    ? queryParams.origin
                    : queryParams.destination
                }
                price={formattedPrice}
                duration={currentSchedule.route.duration}
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
