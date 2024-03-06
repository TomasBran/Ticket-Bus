import './Schedule.css';
import green from '../../assets/arrow-green.svg';
import white from '../../assets/arrow-white.svg';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { formatDuration, formatTime } from '../../utils/dateUtils.js';
import { useDispatch } from 'react-redux';
import { cleanAllSeatsSelected } from '../../store/Seat/seatActions.js';
// import { useQueryParams } from '../../hooks/useQueryParams.js';
// import { createMessage } from '../../utils/websocketUtils.js';
// import useWebSocket from 'react-use-websocket';
// import { WEBSOCKET_URL } from '../../services/api.js';

export default function Schedule({
  id,
  departureTime,
  arrivalTime,
  origin,
  destination,
  price,
  duration,
  isReturn
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  // const queryParams = useQueryParams();
  const dispatch = useDispatch();

  // Get the selected seats from the Redux store
  // const selectedSeats = useSelector((state) => state.seat.seatSelected);

  // websocket stuff
  // const socketUrl = `${WEBSOCKET_URL}?scheduleId=${queryParams.scheduleId}&date=${queryParams.date}`;
  // const { sendMessage } = useWebSocket(socketUrl);

  const handleSelect = () => {
    if (isReturn) {
      // Get the current returnScheduleId from the search params
      const currentReturnScheduleId = searchParams.get('returnScheduleId');

      // Only call setSearchParams if the id has changed
      if (currentReturnScheduleId !== id.toString()) {
        // Update the returnScheduleId in the search params
        searchParams.set('returnScheduleId', id);

        // Update the search params in the URL
        setSearchParams(searchParams);
      }
    } else {
      // Get the current returnScheduleId from the search params
      const currentScheduleId = searchParams.get('scheduleId');

      // Only call setSearchParams if the id has changed
      if (currentScheduleId !== id.toString()) {
        // Update the returnScheduleId in the search params
        searchParams.set('scheduleId', id);

        // TODO: mini-bug when the user refreshes page, the selected seats remain locked,
        // will fix this later when back-end adds validation
        // When the user selects a new schedule, clear all seats and unlock them
        // selectedSeats.forEach((seat) => {
        //   const message = createMessage(
        //     queryParams.scheduleId,
        //     queryParams.date,
        //     seat.seatId,
        //     'lock'
        //   );
        //   sendMessage(JSON.stringify(message));
        // });
        dispatch(cleanAllSeatsSelected());

        // Update the search params in the URL
        setSearchParams(searchParams);
      }
    }
  };

  let isActive;

  if (isReturn) {
    // Check if the current Schedule component is active
    isActive = searchParams.get('returnScheduleId') === id.toString();
  } else {
    // Check if the current Schedule component is active
    isActive = searchParams.get('scheduleId') === id.toString();
  }

  //formatting
  const formattedDepartureTime = formatTime(departureTime);
  const formattedDuration = formatDuration(duration);
  const formattedPrice = parseFloat(price).toString();

  return (
    // TODO: button encompasando cambia los estilos, son aplicados por defecto a los elementos button
    // tengo que revisar cuales estilos exactamente se aplican y removerlos en Schedule.css
    <button className='daisy-btn-block select-button' onClick={handleSelect}>
      <div
        className={`flex py-8 px-4 rounded-lg mb-4  justify-between w-full flex-col md:flex-row relative ${isActive ? 'bg-[#93E0BB]' : 'bg-[#DEE0E4]'}`}
      >
        <div className='flex gap-12 mb-8 md:mb-0 '>
          <div className='gap-2 flex flex-col text-[#486284]'>
            <p className='font-medium text-lg '>{formattedDepartureTime}</p>
            <p className='text-sm font-normal '> {origin}</p>
          </div>

          <div className='flex flex-col items-center gap-1'>
            <p className='font-normal text-xs'>{formattedDuration}</p>
            <img src={isActive ? white : green} alt='' />
          </div>

          <div className='gap-2 flex flex-col text-[#486284]'>
            <p className='font-medium text-lg'>{arrivalTime}</p>
            <p className='text-sm font-normal'>{destination} </p>
          </div>
        </div>

        <div className='bg-emerald-500 px-5 py-0 rounded-[10px] h-11 flex items-center w-40 justify-center md:static absolute bottom-2 right-2 '>
          <p> ${formattedPrice}</p>
        </div>
      </div>
    </button>
  );
}

Schedule.propTypes = {
  id: PropTypes.number.isRequired,
  departureTime: PropTypes.string.isRequired,
  arrivalTime: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  isReturn: PropTypes.bool.isRequired
};
