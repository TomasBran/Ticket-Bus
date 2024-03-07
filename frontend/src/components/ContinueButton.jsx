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
import { setIsSelectingReturnSeats } from '../store/Seat/seatActions';

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
  const isSelectingReturnSeats = useSelector(
    (state) => state.seat.isSelectingReturnSeats
  );
  const creditCardFormFilled = useSelector(
    (state) => state.form.creditCardForm.formFilled
  );
  const buyerFormFilled = useSelector(
    (state) => state.form.buyerForm.formFilled
  );
  // TODO: temp
  // const passengerForm = useSelector((state) => state.form.passengerForm);

  const paymentMethod = useSelector((state) => state.form.paymentMethod);
  const acceptedTos = useSelector((state) => state.form.acceptedTos);

  // Check if the scheduleId is empty
  const isScheduleIdEmpty = searchParams.get('scheduleId') === '';
  const isReturnScheduleIdEmpty = searchParams.get('returnScheduleId') === '';
  const isReturnDateEmpty = searchParams.get('returnDate') === '';

  // TODO: temp
  // const areAllFormsFilled = passengerForm.every((form) => form.formFilled);

  // Check if the required number of seats have been selected
  const areDepartureSeatsSelected =
    seatSelected.departure.length == seatQuantity;
  const areReturnSeatsSelected =
    isReturnDateEmpty || seatSelected.return.length == seatQuantity;
  const areSeatsSelected = areDepartureSeatsSelected && areReturnSeatsSelected;
  console.log(areDepartureSeatsSelected);
  console.log(areReturnSeatsSelected);
  console.log(areSeatsSelected);
  console.log('isReturnDateEmpty', isReturnDateEmpty);

  // Determine whether the button should be disabled
  let isButtonDisabled;

  // Check if the button should be disabled depending on the route
  switch (location.pathname) {
    case '/ticket/seats':
      if (isReturnDateEmpty) {
        console.log('returnDate is Empty');
        isButtonDisabled = !areDepartureSeatsSelected;
      } else if (!isReturnDateEmpty && !isReturnScheduleIdEmpty) {
        console.log('returnDate not empty');
      }
      break;
    case '/ticket/summary':
      isButtonDisabled = !buyerFormFilled || !paymentMethod || !acceptedTos;
      break;
    case '/ticket/payment':
      // TODO: removed allFormsFilled due to time constraints
      isButtonDisabled = !(creditCardFormFilled && buyerFormFilled);
      break;
    default:
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
        // one way flow
        if (!isSelectingReturnSeats && isReturnDateEmpty) {
          dispatch(enablePassengersPage());
          navigate(`/ticket/passengers?${searchParams}`);
          // two way flow
        } else if (!isSelectingReturnSeats && !isReturnDateEmpty) {
          dispatch(setIsSelectingReturnSeats(true));
        } else if (isSelectingReturnSeats) {
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
      className={`bg-[#D97706] px-5 rounded-[40px] h-11 flex items-center w-40 justify-center font-semibold text-white tracking-tight mx-auto ${isButtonDisabled ? 'cursor-not-allowed bg-gray-600' : ''}`}
      onClick={() => handleClick()}
      disabled={isButtonDisabled}
    >
      {text}
    </button>
  );
}

export default ContinueButton;
