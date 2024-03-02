import Itinerary from '../components/Itinerary/Itinerary.jsx';
import Seats from '../components/Seats/Seats.jsx';
import PricesCard from '../components/PricesCard/PricesCard.jsx';
import BackButton from '../components/BackButton.jsx';
import ContinueButton from '../components/ContinueButton.jsx';
import { useSelector } from 'react-redux';
import Schedule from '../components/ChooseTravel/Schedule.jsx';
import { useLocation } from 'react-router-dom';
import { useFetchScheduleTemp } from '../hooks/useSchedules.js';

function SeatSelection() {
  const seatQuantity = useSelector((state) => state.seat.seatQuantity);
  const travelSelected = useSelector((state) => state.travel.travelSelected);
  console.log('esto es travelSelected:', travelSelected.price);
  const location = useLocation();

  // reads from searchParams to make the fetch, this is a way of
  // retaining the information through refreshes in a way that
  // doesn't use redux or localStorage for server side things, which avoids data duplication and issues with sync

  let queryParams = new URLSearchParams(location.search);
  queryParams = {
    origin: queryParams.get('origin'),
    destination: queryParams.get('destination'),
    date: queryParams.get('date')
  };

  // temporally gonna use redux as seats endpoint or information is not available yet
  // also need a schedules/id endpoint to fetch the schedule information
  useFetchScheduleTemp(
    travelSelected.origin,
    travelSelected.destination,
    queryParams.date
  );

  return (
    <main className='flex px-10 justify-between pt-8 max-w-[1440px] mx-auto flex-col md:flex-row items-center'>
      <div className='md:flex flex-col justify-between items-center  hidden '>
        <Itinerary travelSelected={travelSelected} />
        <div className='mt-6'>
          <BackButton />
        </div>
      </div>
      <Seats tickets={seatQuantity} />
      <div className='flex flex-col justify-between items-center '>
        <PricesCard />
        <div className='md:hidden mt-2 '>
          <Schedule
            departure={travelSelected.departure}
            arrival={travelSelected.arrival}
            origin={travelSelected.origin}
            destination={travelSelected.destination}
            price={travelSelected.price}
          />
        </div>

        <div className='hidden md:block mt-6'>
          <ContinueButton />
        </div>
      </div>
      <div className='flex justify-between mt-5 w-full  md:hidden'>
        <BackButton />
        <ContinueButton />
      </div>
    </main>
  );
}

export default SeatSelection;
