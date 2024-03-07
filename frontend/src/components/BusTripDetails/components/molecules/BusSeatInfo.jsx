import PropTypes from 'prop-types';
import BusSeatButton from '../atoms/BusSeatButton';
import { useDispatch, useSelector } from 'react-redux';
import { setSeatActive } from '../../../../store/Seat/seatActions';
import { setCurrentSeatId } from '../../../../store/Form/formActions';

function BusSeatInfo({ SeatIcon }) {
  const dispatch = useDispatch();
  const seatData = useSelector((state) => state.seat.seatSelected);

  const handleSeatClick = (seatId, trip) => {
    // Get the current isActive state of the clicked seat
    const isActive = seatData[trip].find(
      (seat) => seat.seatId === seatId
    )?.isActive;

    // If a seat from the other trip is already selected, deselect it
    const otherTrip = trip === 'departure' ? 'return' : 'departure';

    // Get the index of the clicked seat
    const seatIndex = seatData[trip].findIndex(
      (seat) => seat.seatId === seatId
    );

    // Get the corresponding seat from the other trip
    const correspondingSeat = seatData[otherTrip][seatIndex];

    // Deselect all other seats in the same trip
    seatData[trip].forEach((seat) => {
      if (seat.seatId !== seatId) {
        dispatch(setSeatActive(trip, seat.seatId, false));
      }
    });

    // Deselect the previously selected seat from the other trip
    const previouslySelectedSeat = seatData[otherTrip].find(
      (seat) => seat.isActive
    );

    if (previouslySelectedSeat) {
      dispatch(setSeatActive(otherTrip, previouslySelectedSeat.seatId, false));
    }

    // Only allow the seat to be toggled off if there is at least one other seat selected
    if (isActive) {
      // Toggle the isActive state of the clicked seat
      dispatch(setSeatActive(trip, seatId, !isActive));
    } else {
      // Always allow the seat to be toggled on
      dispatch(setSeatActive(trip, seatId, true));
      if (correspondingSeat) {
        dispatch(setSeatActive(otherTrip, correspondingSeat.seatId, true));
      }
    }

    // If the seat is in the departure trip, set it as the current seat
    if (trip === 'departure' && !isActive) {
      dispatch(setCurrentSeatId(seatId));
    }
  };

  return (
    <div className='grid grid-cols-5 text-[#1A202C] text-base font-bold box-border'>
      <div className='col-span-1 flex items-center'>
        <img src={SeatIcon} alt='Bus Icon' />
      </div>
      <div className='col-span-4 text-end'>
        {seatData.departure.map((seat) => (
          <BusSeatButton
            key={seat.seatId}
            id={seat.seatId}
            seatNumber={seat.number}
            isActive={seat.isActive}
            onClick={() => handleSeatClick(seat.seatId, 'departure')}
          />
        ))}
        {seatData.return.map((seat) => (
          <BusSeatButton
            key={seat.seatId}
            id={seat.seatId}
            seatNumber={seat.number}
            isActive={seat.isActive}
            onClick={() => handleSeatClick(seat.seatId, 'return')}
          />
        ))}
      </div>
    </div>
  );
}

BusSeatInfo.propTypes = {
  SeatIcon: PropTypes.string.isRequired
};

export default BusSeatInfo;
