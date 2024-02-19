import green from '../../assets/arrow-green.svg';
import PropTypes from 'prop-types';

export default function Schedule({ departure, arrival, origin, destination }) {
  return (
    <div className='bg-[#93E0BB] flex  py-8 px-4 rounded-lg mb-4 pr-12 justify-between w-full flex-col md:flex-row relative'>
      <div className='flex gap-12 mb-8 md:mb-0 '>
        <div className='gap-2 flex flex-col'>
          <p className='font-medium text-lg'>{departure}</p>
          <p className='text-sm font-normal'> {origin}</p>
        </div>

        <div className='flex flex-col items-center gap-1'>
          <p className='font-normal text-xs'>4 hrs 45min</p>
          <img src={green} alt='' />
        </div>

        <div className='gap-2 flex flex-col'>
          <p className='font-medium text-lg'>{arrival}</p>
          <p className='text-sm font-normal'>{destination} </p>
        </div>
      </div>

      <div className='bg-emerald-500 px-5 py-0 rounded-[10px] h-11 flex items-center w-40 justify-center md:static absolute bottom-2 right-2 '>
        <p> $00.000-</p>
      </div>
    </div>
  );
}

Schedule.propTypes = {
  departure: PropTypes.string.isRequired,
  arrival: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired
};
