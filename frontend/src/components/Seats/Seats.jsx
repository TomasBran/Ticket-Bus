import { useEffect, useState } from 'react';
import driver from '../../assets/Seats/driver.svg';
import wc from '../../assets/Seats/wc.svg';
import PropTypes from 'prop-types';
import Toast from './Toast';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryParams } from '../../hooks/useQueryParams';
import useWebSocket from 'react-use-websocket';
import { WEBSOCKET_URL } from '../../services/api';

const SectionA_SeatsId = [
  1, 2, 5, 6, 9, 10, 11, 12, 13, 14, 17, 18, 21, 22, 25, 26, 29, 30, 33, 34, 37,
  38
];

const SectionB_SeatsId = [3, 4, 7, 8];

const SectionC_SeatsId = [
  15, 16, 19, 20, 23, 24, 27, 28, 31, 32, 35, 36, 39, 40
];

const SectionD_SeatsId = [41, 42, 44, 45, 47, 48, 50, 51];

const SectionE_SeatsId = [43, 46, 49, 52];

const Seats = (props) => {
  const dispatch = useDispatch();
  const seatSelected = useSelector((state) => state.seat.seatSelected); // Read from Redux store

  const [seats, setSeats] = useState([]);
  const [floor, setFloor] = useState('first');
  const [showToast, setShowToast] = useState(false);
  const { tickets = 1 } = props;

  const queryParams = useQueryParams();
  const scheduleId = queryParams.scheduleId;
  const date = queryParams.date;

  const socketUrl = `${WEBSOCKET_URL}?scheduleId=${scheduleId}&date=${date}`;

  const { lastMessage, sendMessage } = useWebSocket(socketUrl);

  console.log(lastMessage);

  // Create a map from the seats array for efficient lookup
  const seatsMap = new Map(seats.map((seat) => [seat.number, seat]));

  // Function to create a section
  const createSection = (sectionSeatsId) => {
    return sectionSeatsId.map((seatNumber) => {
      const seat = seatsMap.get(seatNumber);
      if (seat) {
        // If the seat is in the JSON data, use it
        return seat;
      } else {
        // If the seat is not in the JSON data, add it as 'locked'
        return {
          number: seatNumber,
          id: seatNumber, // Use seatNumber as id for simplicity
          status: 'locked'
        };
      }
    });
  };

  // Create sections
  const sectionA = createSection(SectionA_SeatsId);
  const sectionB = createSection(SectionB_SeatsId);
  const sectionC = createSection(SectionC_SeatsId);
  const sectionD = createSection(SectionD_SeatsId);
  const sectionE = createSection(SectionE_SeatsId);

  const initializeSeats = (seatsData) => {
    const newArray = seatsData.map((seatData) => {
      const isSelected = seatSelected.some(
        (seat) => seat.number === seatData.number
      );
      return {
        number: seatData.number,
        seatId: seatData.id,
        status: isSelected ? 'selected' : seatData.status
      };
    });

    setSeats(newArray);
  };

  // useEffect(() => {
  //   // Assume fetchSeatsData is a function that fetches data from the endpoint
  //   const seatsData = json.body.seats;
  //   initializeSeats(seatsData);
  // }, []);

  useEffect(() => {
    if (lastMessage !== null) {
      const seatsData = JSON.parse(lastMessage.data).body.seats;
      initializeSeats(seatsData);
    }
  }, [lastMessage]);

  const toggleFloor = (floor) => {
    setFloor(floor === 1 ? 'first' : 'second');
  };

  const toggleSeat = (number) => {
    const currentSeat = seats.find((seat) => seat.number === number);

    if (currentSeat.status === 'locked') {
      return;
    }

    const selectedSeats = seats.filter(
      (seat) => seat.status === 'selected'
    ).length;

    if (selectedSeats >= tickets && currentSeat.status !== 'selected') {
      if (showToast) {
        return;
      }
      setShowToast(true);
      return;
    }

    // Construct the message
    const message = {
      scheduleId: queryParams.scheduleId,
      date: queryParams.date,
      seatId: currentSeat.seatId,
      type: 'lock' //always lock, might change depending on back changes
    };

    // Send the message
    sendMessage(JSON.stringify(message));

    setSeats((prevState) => {
      const newState = prevState.map((seat) => {
        if (seat.number === number) {
          const newStatus = seat.status === 'free' ? 'selected' : 'free';
          return {
            ...seat,
            status: newStatus
          };
        }
        return seat;
      });

      // Dispatch action based on the new state
      const newSeat = newState.find((seat) => seat.number === number);
      if (newSeat.status === 'selected') {
        dispatch({
          type: 'ADD_SEAT_SELECTED',
          payload: {
            seatId: newSeat.seatId,
            number: newSeat.number
          }
        });
      } else if (newSeat.status === 'free') {
        dispatch({
          type: 'REMOVE_SEAT_SELECTED',
          payload: {
            seatId: newSeat.seatId,
            number: newSeat.number
          }
        });
      }

      return newState;
    });
  };

  return (
    <div className='flex flex-col items-center w-full max-w-[350px] justify-start m-2'>
      <p className='text-3xl font-semibold'>Elige tu asiento</p>
      <div className='flex justify-center gap-6 w-full m-4'>
        <button
          className={`rounded font-semibold transition active:scale-95 px-9 py-3 ${floor === 'first' ? 'bg-green-500 hover:bg-green-400 active:bg-green-300' : 'bg-gray-300 hover:bg-gray-200 active:bg-gray-100'}`}
          onClick={() => toggleFloor(1)}
        >
          Nivel 1
        </button>
        <button
          className={`rounded font-semibold transition active:scale-95 px-9 py-3 ${floor === 'second' ? 'bg-green-500 hover:bg-green-400 active:bg-green-300' : 'bg-gray-300 hover:bg-gray-200 active:bg-gray-100'}`}
          onClick={() => toggleFloor(2)}
        >
          Nivel 2
        </button>
      </div>
      <p className='mb-4 font-medium text-gray-400 text-sm'>
        PLANTA {floor === 'first' ? 'BAJA' : 'ALTA'}
      </p>

      {floor === 'first' && (
        <div className='w-full flex justify-center items-center flex-col'>
          <div className='w-5/6 flex flex-col justify-start mb-6 px-3 gap-6 '>
            <img src={driver} alt='driver_logo' className='w-10' />
            <img src={wc} alt='wc_logo' className='w-10' />
          </div>
          <div className='flex w-5/6 items-center justify-between'>
            <div className='grid grid-cols-2 grid-rows-2 gap-4 w-full justify-items-center'>
              {sectionD.map((seat) => (
                <div
                  key={seat.number}
                  className={`flex justify-center items-center w-10 h-10 rounded-lg transition ${
                    seat.status === 'locked'
                      ? 'bg-gray-400 cursor-default text-gray-300 '
                      : seat.status === 'free'
                        ? 'bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-200 cursor-pointer text-white'
                        : 'bg-orange-500 hover:bg-orange-400 active:bg-orange-300 cursor-pointer text-white'
                  }`}
                  onClick={() => toggleSeat(seat.number)}
                >
                  {String(seat.number).padStart(2, '0')}
                </div>
              ))}
            </div>
            <div className='grid grid-cols-1 grid-rows-4 gap-4 w-full justify-items-end'>
              {sectionE.map((seat) => (
                <div
                  key={seat.number}
                  className={`flex justify-center items-center w-10 h-10 rounded-lg transition ${
                    seat.status === 'locked'
                      ? 'bg-gray-400 cursor-default text-gray-300 '
                      : seat.status === 'free'
                        ? 'bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-200 cursor-pointer text-white'
                        : 'bg-orange-500 hover:bg-orange-400 active:bg-orange-300 cursor-pointer text-white'
                  }`}
                  onClick={() => toggleSeat(seat.number)}
                >
                  {String(seat.number).padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {floor === 'second' && (
        <div className='w-full flex justify-center gap-10'>
          <div className='grid grid-cols-2 grid-rows-8 gap-4 w-3/6 justify-items-center'>
            {sectionA.map((seat) => (
              <div
                key={seat.number}
                className={`flex justify-center items-center w-10 h-10 rounded-lg transition ${
                  seat.status === 'locked'
                    ? 'bg-gray-400 cursor-default text-gray-300 '
                    : seat.status === 'free'
                      ? 'bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-200 cursor-pointer text-white'
                      : 'bg-orange-500 hover:bg-orange-400 active:bg-orange-300 cursor-pointer text-white'
                }`}
                onClick={() => toggleSeat(seat.number)}
              >
                {String(seat.number).padStart(2, '0')}
              </div>
            ))}
          </div>
          <div className='flex flex-col w-3/6 items-center justify-between'>
            <div className='grid grid-cols-2 grid-rows-2 gap-4 w-full justify-items-center'>
              {sectionB.map((seat) => (
                <div
                  key={seat.number}
                  className={`flex justify-center items-center w-10 h-10 rounded-lg transition ${
                    seat.status === 'locked'
                      ? 'bg-gray-400 cursor-default text-gray-300 '
                      : seat.status === 'free'
                        ? 'bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-200 cursor-pointer text-white'
                        : 'bg-orange-500 hover:bg-orange-400 active:bg-orange-300 cursor-pointer text-white'
                  }`}
                  onClick={() => toggleSeat(seat.number)}
                >
                  {String(seat.number).padStart(2, '0')}
                </div>
              ))}
            </div>
            <div className='grid grid-cols-2 grid-rows-4 gap-4 w-full justify-items-center'>
              {sectionC.map((seat) => (
                <div
                  key={seat.number}
                  className={`flex justify-center items-center w-10 h-10 rounded-lg transition ${
                    seat.status === 'locked'
                      ? 'bg-gray-400 cursor-default text-gray-300 '
                      : seat.status === 'free'
                        ? 'bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-200 cursor-pointer text-white'
                        : 'bg-orange-500 hover:bg-orange-400 active:bg-orange-300 cursor-pointer text-white'
                  }`}
                  onClick={() => toggleSeat(seat.number)}
                >
                  {String(seat.number).padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Toast showToast={showToast} setShowToast={setShowToast} type='warning'>
        <span>
          {tickets === 1
            ? 'Ya seleccionaste tu asiento'
            : `Ya seleccionaste tus ${tickets} asientos`}
        </span>
      </Toast>
    </div>
  );
};

Seats.propTypes = {
  tickets: PropTypes.number.isRequired
};

export default Seats;
