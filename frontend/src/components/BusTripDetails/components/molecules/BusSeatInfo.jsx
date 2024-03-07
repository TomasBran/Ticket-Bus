import PropTypes from 'prop-types';
import BusSeatButton from '../atoms/BusSeatButton';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentSeatId } from '../../../../store/Form/formActions';

function BusSeatInfo({ SeatIcon, seatData }) {
  const dispatch = useDispatch();
  const sortedSeatData = [...seatData].sort(
    (a, b) => a.seatNumber - b.seatNumber
  );
  const [info, setInfo] = useState(sortedSeatData);

  const handleSeatClick = (seatId) => {
    const updatedSeatData = info.map((seat) => {
      if (seat.seatId === seatId) {
        dispatch(setCurrentSeatId(seatId)); // Dispatch the action here
        return { ...seat, isActive: true }; // Actualizar el estado de isActive
      } else {
        return { ...seat, isActive: false }; // Desactivar otros asientos
      }
    });
    setInfo(updatedSeatData);
  };

  useEffect(() => {
    setInfo(sortedSeatData);
  }, [seatData]);

  return (
    <div className='grid grid-cols-5 text-[#1A202C] text-base font-bold box-border'>
      <div className='col-span-1 flex items-center'>
        <img src={SeatIcon} alt='Bus Icon' />
      </div>
      <div className='col-span-4 text-end'>
        {info.map((seat) => (
          <BusSeatButton
            key={seat.seatNumber}
            id={seat.seatId}
            seatNumber={seat.seatNumber}
            isActive={seat.isActive}
            onClick={() => handleSeatClick(seat.seatId)}
          />
        ))}
      </div>
    </div>
  );
}

BusSeatInfo.propTypes = {
  SeatIcon: PropTypes.string.isRequired,
  seatData: PropTypes.arrayOf(
    PropTypes.shape({
      seatNumber: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired
    })
  ).isRequired
};

export default BusSeatInfo;
