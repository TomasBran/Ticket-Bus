import SeatLegendRow from './SeatLegendRow.jsx';
import usb from '../../assets/PricesCard/usb.svg';
import snowflake from '../../assets/PricesCard/snowflake.svg';

function SeatLegendList() {
  return (
    <div className='mt-12'>
      <SeatLegendRow colorClass='bg-[#FFCC00]' text='Disponible' />
      <SeatLegendRow colorClass='bg-[#808393]' text='Ocupado' />
      <SeatLegendRow colorClass='bg-[#93E0BB]' text='Seleccionado' />
      <div className='flex mt-9'>
        <img src={usb} className='mr-8' /> <img src={snowflake} />
      </div>
    </div>
  );
}

export default SeatLegendList;
