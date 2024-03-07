import PropTypes from 'prop-types';

export const FrequencyButton = ({
  days = [
    { day: 'Lu', frequent: true },
    { day: 'Ma', frequent: false },
    { day: 'Mi', frequent: true },
    { day: 'Ju', frequent: false },
    { day: 'Vi', frequent: true },
    { day: 'Sa', frequent: false },
    { day: 'Do', frequent: true }
  ]
}) => {
  return (
    <div className='bg-white border-2 border-[#C4C4C4] rounded-md md:w-96 h-[56px]'>
      <div className='relative'>
        <label
          htmlFor='inputField'
          className='absolute top-0 left-2 -mt-3 bg-white px-1 leading-3 font-bold text-xs'
        >
          Frecuencia
        </label>
        <div className='flex justify-center items-center gap-2'>
          {days.map((dayObj) => (
            <button
              key={dayObj.day}
              id='inputField'
              type='button'
              className={`w-10 h-10 rounded-lg m-1  text-white ${
                dayObj.frequent ? 'bg-[#FF5F00] ' : 'bg-[#68D79680]'
              }`}
            >
              {dayObj.day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

FrequencyButton.propTypes = {
  days: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      frequent: PropTypes.bool.isRequired
    })
  ).isRequired
};
