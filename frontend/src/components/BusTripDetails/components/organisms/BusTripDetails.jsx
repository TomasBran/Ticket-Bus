import ArrowRightSVG from '../../../../assets/TravelHeader/Arrow Right.svg';
import BusIcon from '../../../../assets/BusTripDetails/Bus.svg';
import SeatIcon from '../../../../assets/BusTripDetails/Seat.svg';
import TripDetailsHeader from '../atoms/TripDetailsHeader';
import HorizontalLabelPair from '../atoms/HorizontalLabelPair';
import LocationArrowRow from '../molecules/LocationArrowRow';
import TimeRange from '../atoms/TimeRange';
import Divider from '../atoms/Divider';
import BusPrice from '../atoms/BusPrice';
import BusSeatInfo from '../molecules/BusSeatInfo';
import ServiceLabel from '../atoms/ServiceLabel';
import BackButton from '../atoms/BackButton';
import ContinueButton from '../atoms/ContinueButton';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryParams } from '../../../../hooks/useQueryParams';
import { useFetchScheduleById } from '../../../../hooks/useSchedules';
import { getScheduleTimeDetails } from '../../../../utils/timeUtils';

function BusTripDetails() {
  const seatData = useSelector((state) => state.seat.seatSelected);
  const currentSeatId = useSelector((state) => state.form.currentSeatId);
  const queryParams = useQueryParams();
  const {
    data: departureSchedules,
    error: errorDepartureSchedules,
    isLoading: isLoadingDepartureSchedules
  } = useFetchScheduleById({
    scheduleId: queryParams.scheduleId,
    enabled: true
  });

  // Fetch the return schedule by ID if the returnDate in URL is not empty
  // const isReturnDateEmpty = queryParams.searchParams.get('returnDate') === '';
  // const {
  //   data: returnSchedules,
  //   error: errorReturnSchedules,
  //   isLoading: isLoadingReturnSchedules
  // } = useFetchScheduleById({
  //   scheduleId: queryParams.returnScheduleId,
  //   // If ReturnDate is empty then don't fetch ReturnSchedules
  //   enabled: !isReturnDateEmpty
  // });

  //formatting
  const departureTimeDetails = getScheduleTimeDetails(
    departureSchedules,
    queryParams.date
  );
  // const returnTimeDetails = isReturnDateEmpty
  //   ? null
  //   : getScheduleTimeDetails(returnSchedules, queryParams.returnDate);

  const formattedPrice = parseFloat(departureSchedules.route.price).toString();

  // const seatData = [
  //   { seatNumber: 10, isActive: true },
  //   { seatNumber: 9, isActive: false },
  //   { seatNumber: 7, isActive: false },
  //   { seatNumber: 8, isActive: false }
  // ];

  console.log(currentSeatId);
  // Filtrar el array seatData para obtener solo la cantidad deseada según seatQuantity
  const formattedSeatData = seatData.map((seat) => ({
    seatId: seat.seatId,
    seatNumber: seat.number,
    isActive: seat.seatId === currentSeatId
  }));

  const location = useLocation();

  useEffect(() => {
    const ajustarAlturaYMargen = () => {
      const container = document.getElementById('container');
      if (!container) return;

      const testingHeight = container.offsetHeight;
      const bottomPosition = testingHeight - 58;

      // Seleccionar todos los elementos con la clase ".bottom-md"
      const bottomMdElements = document.querySelectorAll('.bottom-md');
      bottomMdElements.forEach((bottomMdElement) => {
        bottomMdElement.style.bottom = `${bottomPosition}px`;
      });
    };

    // Llama a la función de ajuste cuando cambia la ubicación de la página
    ajustarAlturaYMargen();
  }, [location]);

  // TODO: make real loading modals/placeholders
  if (isLoadingDepartureSchedules) {
    return <div>Loading...</div>;
  }

  if (errorDepartureSchedules) {
    return <div>Error: {errorDepartureSchedules}</div>;
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='mb-3 md:h-16'></div>
      <div>
        <div className='bg-ethereal-frost sm:bg-[#DEE5ED] rounded-md p-3 flex flex-col'>
          <TripDetailsHeader title='Viaje de Ida' />

          <HorizontalLabelPair leftLabel='Salida' rightLabel='Llegada' />
          <div className='grid grid-cols-3'>
            <div className='col-span-3'>
              <LocationArrowRow
                startLocation={queryParams.origin}
                endLocation={queryParams.destination}
                arrowImage={ArrowRightSVG}
              />
            </div>
          </div>

          <HorizontalLabelPair
            leftLabel={departureTimeDetails.departureDate}
            rightLabel={departureTimeDetails.arrivalDate}
          />

          <TimeRange
            startTime={departureTimeDetails.formattedDepartureTime}
            endTime={departureTimeDetails.calculatedArrivalTime}
          />
          <Divider />

          <BusPrice BusIcon={BusIcon} price={formattedPrice} />
        </div>
        <div className='bg-[#DEE5ED] rounded-md p-3 flex flex-col mt-2'>
          <BusSeatInfo SeatIcon={SeatIcon} seatData={formattedSeatData} />

          <Divider />

          <ServiceLabel text='Servicio CAMA' />
        </div>
      </div>
      <div
        className='bg-transparent rounded-md p-3 flex-1 mt-2 bg-black'
        id='container'
      >
        <div className='h-full flex sm:flex-col flex-row items-center md:justify-center justify-between flex-wrap'>
          <BackButton to='/ticket/seats' />

          <ContinueButton to='/ticket/summary' label='Continuar' />
        </div>
      </div>
    </div>
  );
}

export default BusTripDetails;
