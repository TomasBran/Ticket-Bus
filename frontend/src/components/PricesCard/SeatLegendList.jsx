import SeatLegendRow from './SeatLegendRow.jsx';

function SeatLegendList() {
  return (
    <div className='mt-8'>
      <SeatLegendRow colorClass='bg-[#FFCC00]' text='Disponible' />
      <SeatLegendRow colorClass='bg-[#808393]' text='Ocupado' />
      <SeatLegendRow colorClass='bg-[#93E0BB]' text='Seleccionado' />
    </div>
  );
}

export default SeatLegendList;
