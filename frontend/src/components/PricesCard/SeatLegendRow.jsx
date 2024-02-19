import PropTypes from 'prop-types';

SeatLegendRow.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

function SeatLegendRow({ color, text }) {
  return (
    <div className='flex items-center mb-3'>
      <div className={`size-5 rounded-md bg-[${color}] mr-2`}></div>
      <p className='text-[#A0A0A0] font-medium text-sm'>{text}</p>
    </div>
  );
}

export default SeatLegendRow;
