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

  // Check if the required number of seats have been selected
  const areSeatsSelected = seatSelected.length == seatQuantity;

  // Determine whether the button should be disabled
  const isButtonDisabled =
    location.pathname === '/ticket/seats'
      ? !areSeatsSelected
      : location.pathname === '/ticket/summary'
        ? false
        : isScheduleIdEmpty;

  function handleClick() {
    switch (location.pathname) {
      case '/ticket':
        if (!isScheduleIdEmpty) {
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
