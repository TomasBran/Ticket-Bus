import { BusTripDetails } from '../../components/BusTripDetails';
import { PassengerForm } from '../../components/PassengerForm';
import ContinueButton from '../../components/PassengerForm/components/atoms/ContinueButton';
import PassengersClub from '../../components/PassengersClub/PassengersClub';
import { PromoRegister } from '../../components/PromoRegister';
import SignUpSection from '../../components/PromoRegister/components/molecules/SignUpSection';

function TripReservation() {
  const auth = false; // Si inicio sesión

  const queryParams = location.search;

  return (
    <div className='sm:bg-background-light bg-[#F1F1F1] flex-grow w-full relative'>
      <div className='h-full mx-auto lg:max-w-screen-xl p-4 overflow-hidden'>
        <div className='grid lg:grid-cols-4 md:grid-cols-5 sm:grid-cols-5 grid-cols-1 h-full lg:gap-4 gap-2 mx-auto relative'>
          {/* Columna 1 */}
          <div className='lg:col-span-1 md:col-span-2 sm:col-span-2 col-span-1 relative order-2 sm:order-1'>
            <BusTripDetails />
            <div className='hidden sm:block absolute bottom-1/3 left-1/2 transform -translate-x-1/2 bottom-md'></div>
          </div>

          {/* Columna 2 */}
          <div className='lg:col-span-2 md:col-span-2 sm:col-span-2 col-span-1 relative order-1 md:order-2 bg-background-light '>
            <PassengerForm auth={auth} />
            <div className='hidden sm:block absolute bottom-1/3 left-1/2 transform -translate-x-1/2 bottom-md'>
              <ContinueButton
                label='Continuar'
                to={`/ticket/summary${queryParams}`}
                disabled={false}
              />
            </div>
          </div>

          {/* Columna 3 */}

          <div className='md:col-span-1 sm:col-span-1 col-span-1 relative order-last'>
            {!auth ? (
              <>
                {/* Contenido si no Inicio Sesión*/}
                <PromoRegister />
                <div className='hidden sm:block absolute bottom-1/3 left-1/2 transform -translate-x-1/2 bottom-md'>
                  <SignUpSection
                    title='Regístrate ahora y ahorra tiempo en cada compra'
                    buttonText='Registrarme'
                    buttonHref='/register'
                  />
                </div>
              </>
            ) : (
              <PassengersClub accumulatedKm={3800} additionalKm={600} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripReservation;
