import PropTypes from 'prop-types';
import TableCell from '../atoms/TableCell';
import ProgressBarCustom from '../atoms/ProgressBarCustom';
import ButtonArrowRight from '../atoms/ButtonArrowRight';

function TableRow({ row, nSeats }) {
  return (
    <tr className='bg-white text-[#212F5C] font-normal text-sm' key={row.id}>
      <td className='border-t-2 border-b-2 border-l-2 border-[#EBF1FF] py-2'>
        <div className='px-4'>{row.origen}</div>
      </td>
      <TableCell text={row.destino} borderColor='#EBF1FF' />
      <TableCell text={row.fecha} borderColor='#EBF1FF' />
      <TableCell text={row.hora_salida} borderColor='#EBF1FF' />
      <TableCell text={row.hora_llegada} borderColor='#EBF1FF' />

      <td className='border-t-2 border-b-2 border-[#EBF1FF] py-2'>
        <div className='px-4 flex items-center justify-between'>
          <p className='text-sm w-4 mr-2'>{row.asientos_libres}</p>
          <ProgressBarCustom value={row.asientos_libres} maxValue={nSeats} />
        </div>
      </td>

      <TableCell text={row.id_vehiculo} borderColor='#EBF1FF' />

      <td className='border-t-2 border-b-2 border-r-2 border-[#EBF1FF] py-2'>
        <div className='px-4'>
          <ButtonArrowRight />
        </div>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  row: PropTypes.object.isRequired,
  nSeats: PropTypes.number.isRequired
};

export default TableRow;
