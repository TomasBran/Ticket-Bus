import SeatLegendRow from './SeatLegendRow.jsx';

function SeatLegendList() {
  return (
    <div className='mt-8'>
      <SeatLegendRow color='#FFCC00' text='Disponible' />
      <SeatLegendRow color='#808393' text='Ocupado' />
      <SeatLegendRow color='#93E0BB' text='Seleccionado' />
    </div>
  );
}

export default SeatLegendList;
