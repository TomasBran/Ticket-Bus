import PriceList from './PriceList.jsx';
import SeatLegendList from './SeatLegendList.jsx';

function PricesCard() {
  return (
    <div className='bg-[#DEE5ED] max-w-[304px] min-h-96 rounded-[30px] px-16 pt-6 pb-7 mx-auto not-daisy'>
      <PriceList />
      <SeatLegendList />
    </div>
  );
}

export default PricesCard;
