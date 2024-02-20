import PriceRow from './PriceRow.jsx';
import Seat from '../../assets/PricesCard/seat.svg';

function PriceList() {
  return (
    <table className='table'>
      <thead>
        <tr className='flex flex-col'>
          <th className='pb-1 font-bold text-xl text-[#1A202C] tracking-tight'>
            Lista de precios
          </th>
          <th className='pb-7 text-[#A0A0A0] font-medium text-sm'>SEMI CAMA</th>
        </tr>
      </thead>
      <tbody>
        <PriceRow src={Seat} price={8000} />
      </tbody>
    </table>
  );
}

export default PriceList;
