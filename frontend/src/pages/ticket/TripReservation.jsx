import { BusTripDetails } from '../../components/BusTripDetails';
import Timer from '../../components/Timer/Timer';

function TripReservation() {
  return (
    <div className='md:bg-[#CED7E4] bg-[#F1F1F1] flex-grow w-full'>
      <div className='h-full mx-auto lg:max-w-screen-xl p-4 overflow-hidden'>
        <div className='grid md:grid-cols-4 grid-cols-1 h-full md:gap-4 gap-2 mx-auto'>
          {/* Columna 1 */}
          <div className=' col-span-1 order-2 md:order-1'>
            <BusTripDetails />
          </div>

          {/* Columna 2 */}
          <div className='bg-green-200 p-4 md:col-span-2 col-span-1 order-1 md:order-2'>
            Contenido de la Columna 2
          </div>

          {/* Columna 3 */}
          <div className='col-span-1 order-last'>
            Contenido de la Columna 3
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripReservation;
