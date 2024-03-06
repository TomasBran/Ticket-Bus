import Bus from '../../assets/Itinerary/bus.svg';
import Arrow from '../../assets/Itinerary/arrow.svg';
import ItinerarySchedule from './ItinerarySchedule.jsx';
import PropTypes from 'prop-types';

Itinerary.propTypes = {
  departureTime: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  arrivalTime: PropTypes.string.isRequired,
  typeOfTravel: PropTypes.string.isRequired,
  arrivalDay: PropTypes.string.isRequired,
  departureDay: PropTypes.string.isRequired
};

function Itinerary({
  departureTime,
  origin,
  arrivalTime,
  destination,
  typeOfTravel,
  price,
  arrivalDay,
  departureDay
}) {
  return (
    <div className='text-center mt-24'>
      <section className='bg-[#DEE5ED] h-[401px] max-w-80 rounded-[10px] px-4 pt-5 pb-8 mx-auto'>
        <h1 className='font-bold text-xl tracking-tight mb-9 text-[#1A202C]'>
          {typeOfTravel || 'TEST-CAMBIAR'}
        </h1>
        <div className='flex justify-between font-medium text-[#486284] text-[15px] opacity-90 tracking-tight mb-[10px]'>
          <h2>Salida</h2> <h2>Llegada</h2>
        </div>
        <div className='flex justify-between font-medium text-xl tracking-tight items-center text-[#1A202C] mb-3'>
          <p>{origin}</p>
          <img src={Arrow} className='size-5 mx-2' alt='Flecha'></img>
          <p>{destination}</p>
        </div>
        <ItinerarySchedule
          departureDay={departureDay}
          arrivalDay={arrivalDay}
          arrivalHour={arrivalTime}
          departingHour={departureTime}
        />
        <img src={Bus} className='mx-auto mt-7 mb-14' alt='Icono de Autobus' />
        <div className='pb-8'>
          <h1 className='font-bold text-xl text-[#1A202C] text-center'>
            ${price}
          </h1>
        </div>
      </section>
    </div>
  );
}

export default Itinerary;
