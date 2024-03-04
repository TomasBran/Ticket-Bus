import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ContinueButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Access states from the Redux store
  const seatSelected = useSelector((state) => state.seat.seatSelected);
  const seatQuantity = useSelector((state) => state.seat.seatQuantity);

  // Check if the scheduleId is empty
  const isScheduleIdEmpty = searchParams.get('scheduleId') === '';
  const isReturnScheduleIdEmpty = searchParams.get('returnScheduleId') === '';
  const isReturnDateEmpty = searchParams.get('returnDate') === '';

  // Check if the required number of seats have been selected
  const areSeatsSelected = seatSelected.length == seatQuantity;

  // Determine whether the button should be disabled
  let isButtonDisabled;
  if (location.pathname === '/ticket/seats') {
    isButtonDisabled = !areSeatsSelected;
  } else if (location.pathname === '/ticket/summary') {
    isButtonDisabled = false;
  } else {
    if (isReturnDateEmpty) {
      // One-way trip: button is disabled if scheduleId is empty or does not exist in the URL
      isButtonDisabled = isScheduleIdEmpty || !searchParams.has('scheduleId');
    } else {
      // Two-way trip: button is disabled if either scheduleId or returnScheduleId is empty or does not exist in the URL
      isButtonDisabled =
        isScheduleIdEmpty ||
        isReturnScheduleIdEmpty ||
        !searchParams.has('scheduleId') ||
        !searchParams.has('returnScheduleId');
    }
  }

  function handleClick() {
    switch (location.pathname) {
      case '/ticket':
        if (!isScheduleIdEmpty && isReturnDateEmpty) {
          navigate(`/ticket/seats?${searchParams}`);
        } else if (!isScheduleIdEmpty && !isReturnScheduleIdEmpty) {
          navigate(`/ticket/seats?${searchParams}`);
        }
        break;
      case '/ticket/seats':
        if (areSeatsSelected) {
          navigate(`/ticket/passengers?${searchParams}`);
        }
        break;
      case '/ticket/passengers':
        navigate(`/ticket/summary?${searchParams}`);
        break;
      case '/ticket/summary':
        navigate(`/ticket/payment?${searchParams}`);
        break;
      default:
        break;
    }
  }

  return (
    <button
      className={`bg-[#D97706] px-5 rounded-[40px] h-11 flex items-center w-40 justify-center font-semibold text-white tracking-tight ${isButtonDisabled ? 'cursor-not-allowed bg-gray-600' : ''}`}
      onClick={() => handleClick()}
      disabled={isButtonDisabled}
    >
      Continuar
    </button>
  );
}

export default ContinueButton;
