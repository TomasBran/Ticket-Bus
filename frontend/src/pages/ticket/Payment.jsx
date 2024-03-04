import ArrowRightSVG from '../../assets/TravelHeader/Arrow Right.svg';
import BackButton from '../../components/BackButton.jsx';
import CreditCardForm from '../../components/CreditCardForm/CreditCardForm.jsx';
import TripDetailsCard from '../../components/TripDetailsCard.jsx';
import Timer from '../../components/Timer/Timer.jsx';
import ContinueButton from '../../components/ContinueButton.jsx';
import { useQueryParams } from '../../hooks/useQueryParams.js';
import { getScheduleTimeDetails } from '../../utils/timeUtils.js';
import { useFetchScheduleById } from '../../hooks/useSchedules';

function Payment() {
  const queryParams = useQueryParams();

  // Fetch the departure schedule by ID
  const {
    data: departureSchedules,
    error: errorDepartureSchedules,
    isLoading: isLoadingDepartureSchedules
  } = useFetchScheduleById({
    scheduleId: queryParams.scheduleId,
    enabled: true
  });

  // Fetch the return schedule by ID if the returnDate in URL is not empty
  const isReturnDateEmpty = queryParams.searchParams.get('returnDate') === '';
  const {
    data: returnSchedules,
    error: errorReturnSchedules,
    isLoading: isLoadingReturnSchedules
  } = useFetchScheduleById({
    scheduleId: queryParams.returnScheduleId,
    // If ReturnDate is empty then don't fetch ReturnSchedules
    enabled: !isReturnDateEmpty
  });

  //formatting
  const departureTimeDetails = getScheduleTimeDetails(
    departureSchedules,
    queryParams.date
  );
  const returnTimeDetails = isReturnDateEmpty
    ? null
    : getScheduleTimeDetails(returnSchedules, queryParams.returnDate);

  // TODO: make real loading modals/placeholders
  if (isLoadingDepartureSchedules || isLoadingReturnSchedules) {
    return <div>Loading...</div>;
  }

  if (errorDepartureSchedules || errorReturnSchedules) {
    return <div>Error: {errorDepartureSchedules || errorReturnSchedules}</div>;
  }

  return (
    <main className='bg-[#EFF0F0] flex-grow w-full relative'>
      <div className='h-full mx-auto lg:max-w-screen-xl p-4 overflow-hidden'>
        <div className='grid lg:grid-cols-4 md:grid-cols-5 sm:grid-cols-5 grid-cols-1 h-full lg:gap-4 gap-2 mx-auto relative'>
          {/* Columna 1 */}
          <div className='lg:col-span-1 md:col-span-2 sm:col-span-2 col-span-1 relative order-2 sm:order-1'>
            {departureSchedules && (
              <TripDetailsCard
                title='Viaje de Ida'
                startLocation={queryParams.origin}
                endLocation={queryParams.destination}
                arrowImage={ArrowRightSVG}
                departureDate={departureTimeDetails.departureDate}
                arrivalDate={departureTimeDetails.arrivalDate}
                startTime={departureTimeDetails.formattedDepartureTime}
                endTime={departureTimeDetails.calculatedArrivalTime}
              />
            )}
            {returnSchedules && (
              <TripDetailsCard
                title='Viaje de Regreso'
                startLocation={queryParams.destination}
                endLocation={queryParams.origin}
                arrowImage={ArrowRightSVG}
                departureDate={returnTimeDetails.departureDate}
                arrivalDate={returnTimeDetails.arrivalDate}
                startTime={returnTimeDetails.formattedDepartureTime}
                endTime={returnTimeDetails.calculatedArrivalTime}
              />
            )}
            <div className='flex md:justify-center'>
              <BackButton />
            </div>
          </div>

          {/* Columna 2 */}
          <div className='lg:col-span-2 md:col-span-2 sm:col-span-3 col-span-1 relative order-1 md:order-2'>
            <CreditCardForm />
          </div>

          {/* Columna 3 */}
          <div className='md:col-span-1 sm:col-span-1 col-span-1 relative order-last'>
            <Timer />
            <ContinueButton text='Pagar' />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Payment;
