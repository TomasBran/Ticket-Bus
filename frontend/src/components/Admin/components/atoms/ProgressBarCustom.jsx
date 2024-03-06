import PropTypes from 'prop-types';

function ProgressBarCustom({ value, maxValue }) {
  return (
    <div className='w-full bg-[#F5F6F8] h-6 overflow-hidden'>
      <div
        className={`bg-[#68D796] h-full`}
        style={{
          width: `${(value / maxValue) * 100}%`
        }}
      ></div>
    </div>
  );
}

ProgressBarCustom.propTypes = {
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired
};

export default ProgressBarCustom;
