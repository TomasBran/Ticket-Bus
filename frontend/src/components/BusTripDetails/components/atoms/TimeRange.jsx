import PropTypes from 'prop-types';

function TimeRange({ startTime, endTime }) {
  return (
    <div className='flex justify-between items-center text-[#1A202C] text-xl font-semibold box-border mb-2 tracking-tight'>
      <p>{startTime}</p>
      <p>{endTime}</p>
    </div>
  );
}

TimeRange.propTypes = {
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired
};

export default TimeRange;
