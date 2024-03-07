import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import LeftButton from '../atoms/LeftButton';
import RightButton from '../atoms/RightButton';
import PassengerNumber from '../atoms/PassengerNumber';
import PassengerDropdownButton from '../molecules/PassengerDropdownButton';
import {
  nukePassengerForm,
  setCurrentSeatId
} from '../../../../store/Form/formActions';
import { useDispatch, useSelector } from 'react-redux';

function FormNavigation({ passenger, onClick, isAuth }) {
  const seatSelected = useSelector(
    (state) => state.seat.seatSelected.departure
  );
  const [currentPassenger, setCurrentPassenger] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    setCurrentPassenger(1);
  }, [passenger]);
  // Handle click to move to the next passenger
  const handleRightClick = () => {
    setCurrentPassenger((prevPassenger) => {
      const nextPassenger = (prevPassenger % passenger) + 1;
      const sortedSeats = [...seatSelected].sort((a, b) => a.number - b.number);
      const nextSeatId = sortedSeats[nextPassenger - 1].seatId;
      dispatch(setCurrentSeatId(nextSeatId));
      dispatch(nukePassengerForm());
      return nextPassenger;
    });
  };
  // Handle click to move to the previous passenger
  const handleLeftClick = () => {
    setCurrentPassenger((prevPassenger) => {
      if (prevPassenger > 1) {
        const nextPassenger = ((prevPassenger - 2 + passenger) % passenger) + 1;
        const sortedSeats = [...seatSelected].sort(
          (a, b) => a.number - b.number
        );
        // Check if nextPassenger - 1 is within the bounds of the array
        if (nextPassenger - 1 >= 0 && nextPassenger - 1 < sortedSeats.length) {
          const prevSeatId = sortedSeats[nextPassenger - 1].seatId;
          dispatch(setCurrentSeatId(prevSeatId));
        }
        return nextPassenger;
      }
      return prevPassenger; // Return the current passenger number if it's already 1
    });
  };
  return (
    <div
      className={`flex justify-between items-center bg-meadow-green text-white p-2 rounded shadow relative z-30`}
    >
      {passenger > 1 && <LeftButton onClick={handleLeftClick} />}
      <PassengerNumber currentPassenger={currentPassenger} />
      {!isAuth ? (
        <RightButton onClick={handleRightClick} />
      ) : (
        <PassengerDropdownButton onChange={onClick} />
      )}
    </div>
  );
}
FormNavigation.propTypes = {
  passenger: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
};

export default FormNavigation;
