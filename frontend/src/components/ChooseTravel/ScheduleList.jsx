import PropTypes from 'prop-types';
import Schedule from './Schedule';
import bus from '../../assets/bus-icon.svg';
import arrow from '../../assets/arrow.svg';
import { calculateArrivalTime } from '../../utils/dateUtils';

function ScheduleList({
  title,
  origin,
  destination,
  formattedDate,
  schedules,
  isReturn,
  isLoading,
  error
}) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!schedules) {
    return <div>No schedules available</div>;
  }

  return (
    <div>
      <div className='flex my-7'>
        <img src={bus} alt='' className='mr-5' />
        <div>
          <h2 className='font-bold text-xl tracking-tight'>{title}</h2>
          <p className='flex gap-4 justify-center text-[#486284] font-medium'>
            {origin} <img src={arrow} alt='' /> {destination}
          </p>
        </div>
      </div>

      <div>
        <p className='font-semibold text-xl mb-4'>{formattedDate}</p>
        {schedules.map((schedule, index) => {
          console.log(schedule);
          const calculatedArrivalTime = calculateArrivalTime(
            schedule.departureTime,
            schedule.route.duration
          );
          return (
            <Schedule
              key={index}
              id={schedule.id}
              departureTime={schedule.departureTime}
              arrivalTime={calculatedArrivalTime}
              origin={origin}
              destination={destination}
              price={schedule.route.price}
              duration={schedule.route.duration}
              isReturn={isReturn}
            />
          );
        })}
      </div>
    </div>
  );
}

ScheduleList.propTypes = {
  title: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  formattedDate: PropTypes.string.isRequired,
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      departureTime: PropTypes.string.isRequired,
      route: PropTypes.shape({
        duration: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired
      }).isRequired
    })
  ).isRequired,
  isReturn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string
  })
};

export default ScheduleList;
