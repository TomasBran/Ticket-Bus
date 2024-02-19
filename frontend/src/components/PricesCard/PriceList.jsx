import PriceRow from './PriceRow.jsx';
import SeatWithPerson from '../../assets/PricesCard/seatwithperson.svg';
import Seat from '../../assets/PricesCard/seat.svg';
import Usb from '../../assets/PricesCard/usb.svg';
import Snowflake from '../../assets/PricesCard/snowflake.svg';

function PriceList() {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th className='pb-12 font-bold text-xl'>Lista de precios</th>
        </tr>
      </thead>
      <tbody>
        <PriceRow src={SeatWithPerson} price='00.000' />
        <PriceRow src={Seat} price='00.000' />
        <PriceRow src={Usb} price='00.000' />
        <PriceRow src={Snowflake} price='00.000' />
      </tbody>
    </table>
  );
}

export default PriceList;
