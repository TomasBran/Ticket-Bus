import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  enableCheckoutPage,
  enablePassengersPage,
  enablePaymentPage,
  enableSeatPage,
  enableSummaryPage,
  resetPages
} from '../store/EnabledPages/enabledPagesActions';
import PropTypes from 'prop-types';

ContinueButton.propTypes = {
  text: PropTypes.string.isRequired
};

function ContinueButton({ text }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  // Access states from the Redux store
  const seatSelected = useSelector((state) => state.seat.seatSelected);
  const seatQuantity = useSelector((state) => state.seat.seatQuantity);
  const creditCardFormFilled = useSelector(
    (state) => state.form.creditCardForm.formFilled
  );
  const passengerFormFilled = useSelector(
    (state) => state.form.passengerForm.formFilled
  );

  const paymentMethod = useSelector((state) => state.form.paymentMethod);
  const acceptedTos = useSelector((state) => state.form.acceptedTos);

  // Check if the scheduleId is empty
  const isScheduleIdEmpty = searchParams.get('scheduleId') === '';
  const isReturnScheduleIdEmpty = searchParams.get('returnScheduleId') === '';
  const isReturnDateEmpty = searchParams.get('returnDate') === '';

  // Check if the required number of seats have been selected
  const areSeatsSelected = seatSelected.length == seatQuantity;

  // Determine whether the button should be disabled
  let isButtonDisabled;

  // Check if the button should be disabled depending on the route
  switch (location.pathname) {
    case '/ticket/seats':
      isButtonDisabled = !areSeatsSelected;
      break;
    case '/ticket/summary':
      isButtonDisabled = !passengerFormFilled || !paymentMethod || !acceptedTos;
      break;
    case '/ticket/payment':
      isButtonDisabled = !(creditCardFormFilled && passengerFormFilled);
      break;
    default:
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
      break;
  }

  // Redirect to different pages depending on the route
  function handleClick() {
    switch (location.pathname) {
      case '/ticket':
        if (!isScheduleIdEmpty && isReturnDateEmpty) {
          dispatch(enableSeatPage());
          navigate(`/ticket/seats?${searchParams}`);
        } else if (!isScheduleIdEmpty && !isReturnScheduleIdEmpty) {
          dispatch(enableSeatPage());
          navigate(`/ticket/seats?${searchParams}`);
        }
        break;
      case '/ticket/seats':
        if (areSeatsSelected) {
          dispatch(enablePassengersPage());
          navigate(`/ticket/passengers?${searchParams}`);
        }
        break;
      case '/ticket/passengers':
        dispatch(enableSummaryPage());
        navigate(`/ticket/summary?${searchParams}`);
        break;
      case '/ticket/summary':
        dispatch(enablePaymentPage());
        navigate(`/ticket/payment?${searchParams}`);
        break;
      case '/ticket/payment':
        dispatch(enableCheckoutPage());
        dispatch(resetPages());
        navigate(`/ticket/checkout?${searchParams}`);
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
      {text}
    </button>
  );
}

export default ContinueButton;
